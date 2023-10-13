#include <Wire.h>    //Communicate with I2C
#include <ESP8266WiFi.h>    //Connect NodeMCU with Wifi
#include <WiFiClient.h>    //Connection with IP Client server 
#include <PubSubClient.h>    //MQTT protocol
//<IBM Watson Connection Information>
#define ORG "hkg2cn"    //Watson user ID
#define DEVICE_TYPE "NodeMCU_2"    //Wtson device name
#define DEVICE_ID "ESP-8266-E12-F2"    //Watson device ID
#define TOKEN "g_gP93qfuvd6jujvbk"    //Device Auth Token
//<Wifi Information>
const char* ssid = "WE";    //Wifi name
const char* password = "Mst132me235711";    //Wifi Password
//<Sign up Events information>
char server[] = ORG ".messaging.internetofthings.ibmcloud.com";    //IBM Watson server
char pubTopic_1[] = "iot-2/evt/status1/fmt/json";    //Sign up events will Published
char pubTopic_2[] = "iot-2/evt/status2/fmt/json";    //~~
char pubTopic_3[] = "iot-2/evt/status3/fmt/json";    //~~
char authMethod[] = "use-token-auth";    //Device Method
char token[] = TOKEN;
char clientId[] = "d:" ORG ":" DEVICE_TYPE ":" DEVICE_ID;
//<MQTT Connection>
WiFiClient wifiClient;
PubSubClient client(server, 1883, NULL, wifiClient);
//<Install DHT11 Sensor>
#include "DHT.h"    //DHT11 sensor Library
#define DHTPIN D3    //Connect DHT11 with Digital pin
#define DHTTYPE DHT11    //Use Library
DHT dht(DHTPIN, DHTTYPE);
//<Install DS18B20 Sensor>
#include <OneWire.h>    //DS18B20 Sensor Library
#include <DallasTemperature.h>    //~~ 
const int oneWireBus = D1;    //Connect DS18B20 with Digital pin
OneWire oneWire(oneWireBus);    // Setup a oneWire instance to communicate with any OneWire devices
DallasTemperature sensors(&oneWire);    // Pass our oneWire reference to Dallas Temperature sensor
void setup() {
  Serial.begin(115200);    //Data send speed to Serial monitor
  //<Wifi Connection>
  Serial.println();
  Serial.print("Connecting to ");
  Serial.print(ssid);    //Print Wifi Network Name
  WiFi.begin(ssid, password);    //Enter SSID, Password
  while (WiFi.status() != WL_CONNECTED) {    //Try to connect with Wifi
    delay(500);    //Whit half Second
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("WiFi connected, IP address: ");
  Serial.println(WiFi.localIP());    //Print Local IP
  if (!client.connected()) {    //If Wifi connected
    Serial.print("Reconnecting client to ");
    Serial.println(server);    //Print Server
    while (!client.connect(clientId, authMethod, token)) {    //Try to connect with Device
      Serial.print(".");
      delay(500);    //Whit half Second
    }
    Serial.println("Bluemix connected");
  }
  dht.begin();    // Start the DHT11 sensor
  sensors.begin();    // Start the DS18B20 sensor
}
long lastMsg = 0;
void loop() {
    //<Set Published Time>
    client.loop();
    long now = millis();
    if (now - lastMsg > 3000) {    //Pub in 3 Secsonds
      lastMsg = now;
    //<Get a reading from the DHT11 sensor>
    int humidity = dht.readHumidity();
    int temperature = dht.readTemperature();
    //<Get a reading from the DS18B20 sensor>
    sensors.requestTemperatures();
    int Animal_Temperature = sensors.getTempCByIndex(0);
    //<Pub Weather>
    String payload_1 = "{\"d\":{\"Name\":\"" DEVICE_ID "\"";    //Pub to Device which connected
    payload_1 += ",\"Weather\":";
    payload_1 += temperature;
    payload_1 += "}}";
    Serial.print("Sending payload: ");
    Serial.println(payload_1);
    if (client.publish(pubTopic_1, (char*) payload_1.c_str())) {    //If Pub sucsess
      Serial.println("Publish ok");
    } else {
      Serial.println("Publish failed");
    }
    //<Pub Humidty>
    String payload_2 = "{\"d\":{\"Name\":\"" DEVICE_ID "\"";    //Pub to Device which connected
    payload_2 += ",\"Humidity\":";
    payload_2 += humidity;
    payload_2 += "}}";

    if (client.publish(pubTopic_2, (char*) payload_2.c_str())) {    //If Pub sucsess
      Serial.println("Publish ok");
    } else {
      Serial.println("Publish failed");
    }
    //<Pub Animal Temperature>
    String payload_3 = "{\"d\":{\"Name\":\"" DEVICE_ID "\"";    //Pub to Device which connected
    payload_3 += ",\"Animal_Temperature\":";
    payload_3 += Animal_Temperature;
    payload_3 += "}}";
    Serial.print("Sending payload: ");
    Serial.println(payload_3);
    if (client.publish(pubTopic_3, (char*) payload_3.c_str())) {    //If Pub sucsess
      Serial.println("Publish ok");
    } else {
      Serial.println("Publish failed");
    }
  }
}
