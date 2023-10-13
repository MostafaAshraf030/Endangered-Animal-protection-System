#include<Servo.h>
int ANGLE = 0;   
int PIR_EGY = 2;   
int PIR_FRA = 3;
int PIR_ITA = 4;      
int LAST_PIR_STATE_EGY = 0;  
int CURRENT_PIR_STATE_EGY = 0;
int LAST_PIR_STATE_FRA = 0;  
int CURRENT_PIR_STATE_FRA = 0;  
int LAST_PIR_STATE_ITA = 0;
int CURRENT_PIR_STATE_ITA = 0;
Servo SERVO;     
void setup() {
  SERVO.attach(5);
 pinMode(PIR_EGY, INPUT);  
  pinMode(PIR_FRA, INPUT);
   pinMode(PIR_ITA, INPUT);   
 Serial.begin(9600);
}
void loop(){
int PIR_STATE_EGY = digitalRead(PIR_EGY); 
int  PIR_STATE_FRA = digitalRead(PIR_FRA);
int   PIR_STATE_ITA = digitalRead(PIR_ITA);
   SERVO.write(0);
 if (PIR_STATE_EGY == HIGH) { 
  SERVO.write(33);           
   delay(1000);
   Serial.println("Hey I got you!!!_1");
   delay(5000);
 } 
 else if (PIR_STATE_FRA == HIGH) {  
  SERVO.write(65);         
   delay(500); 
   Serial.println("Hey I got you!!!_2");
   delay(5000);
 } 
  else if (PIR_STATE_ITA == HIGH) {   
    SERVO.write(100);        
   delay(500); 
   Serial.println("Hey I got you!!!_3");
   delay(5000);
 } 
 else {
  SERVO.write(0);
   delay(5000);
 }
} 
