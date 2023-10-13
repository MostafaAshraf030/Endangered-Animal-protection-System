#include <Wire.h>    //Communicate with I2C
#include <ESP8266WiFi.h>    //Connect NodeMCU with Wifi
#include <WiFiClient.h>    //Connection with IP Client server 
#include <PubSubClient.h>    //MQTT protocol
//<IBM Watson Connection Information>
#define ORG "hkg2cn"    //Watson user ID
#define DEVICE_TYPE "NodeMCU_1"    //Wtson device name
#define DEVICE_ID "ESP-8266-E12-F1"    //Watson device ID
#define TOKEN "Wtk!a_rRmrAdO(ssaS"    //Device Auth Token
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
//<Install MAX30100 Sensor>
#include <MAX30100_PulseOximeter.h>    //MAX30100 sensor Library
PulseOximeter pox;    //Use MAX30100 Library
void onBeatDetected(){
  Serial.println("Beat Detected!");
}
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
  //<Check on MAX30100 connection & Works>
  Serial.print("Initializing pulse oximeter..");
  if (!pox.begin()) {    //If Sensor isn't sensing anythings
    Serial.println("FAILED");
    for (;;);   //Try Sensing agein
  }
  else {
    Serial.println("SUCCESS");
    digitalWrite(1, HIGH);   //If Sensor is collecting data
    pox.setOnBeatDetectedCallback(onBeatDetected);
  }
    pox.setIRLedCurrent(MAX30100_LED_CURR_24MA);    //LED of MAX30100 Sensor ON when Sensor work
}
long lastMsg = 0;
void loop() {
    pox.update();    //Get a reading from the MAX30100 sensor
    //<Set Published Time>
    client.loop();
    long now = millis();
    if (now - lastMsg > 3000) {    //Pub in 3 Secsonds
      lastMsg = now;
    //<Get a reading from the MQ135 sensor>
    float Air_Quality_Sensor = analogRead (A0);
    int Initial_Air_Quality = ((Air_Quality_Sensor/1024)*100) ; //Convert the reading to percentage
    int Air_Quality_Value = (100-Initial_Air_Quality);    //~~
    //<Pub Heart Rate>
    String payload_1 = "{\"d\":{\"Name\":\"" DEVICE_ID "\"";    //Pub to Device which connected
    payload_1 += ",\"Heart_Rate\":";
    payload_1 += pox.getHeartRate();
    payload_1 += "}}";
    Serial.print("Sending payload: ");
    Serial.println(payload_1);
    if (client.publish(pubTopic_1, (char*) payload_1.c_str())) {    //If Pub sucsess
      Serial.println("Publish ok");
    } else {
      Serial.println("Publish failed");
    }
    //<Pub SPO2>
    String payload_2 = "{\"d\":{\"Name\":\"" DEVICE_ID "\"";    //Pub to Device which connected
    payload_2 += ",\"SPO2\":";
    payload_2 += pox.getSpO2();
    payload_2 += "}}";
    Serial.print("Sending payload: ");
    Serial.println(payload_2);
    if (client.publish(pubTopic_2, (char*) payload_2.c_str())) {    //If Pub sucsess
      Serial.println("Publish ok");
    } else {
      Serial.println("Publish failed");
    }
    //<Pub Air Quality>
    String payload_3 = "{\"d\":{\"Name\":\"" DEVICE_ID "\"";    //Pub to Device which connected
    payload_3 += ",\"Air_Quality\":";
    payload_3 += Air_Quality_Value;
    payload_3 += "}}";
    Serial.print("Sending payload: ");
    Serial.println(payload_3);
    if (client.publish(pubTopic_3, (char*) payload_3.c_str())) {    //If Pub success
      Serial.println("Publish ok");
    } else {
      Serial.println("Publish failed");
    }
  }
}
