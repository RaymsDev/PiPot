#include <stdlib.h>
#include <string.h>
#include <Akeru.h>
#include <SimpleDHT.h>

// TD1208 Sigfox module IO definition
/*   Snootlab device | TX | RX
               Akeru | D4 | D5
               Akene | D5 | D4
            Breakout | your pick */
#define TX 5
#define RX 4

/* for DHT22,
  //      VCC: 5V or 3V
  //      GND: GND
  //      DATA: 2*/

// Sigfox instance management 
Akeru akeru(RX, TX);

//Pins Declaration

/* Digital */
int pinDHT22 = 2;

/* Analog */
int pinPhoto = 2;
int pinWaterLevel = 3;
int pinMoisture = 4;

SimpleDHT22 dht22;

// Variable de travail

//Var for Photoresistor
int photoValue;
float photoVoltage;

float moistureValue;

//Var for DHT22
float temperatureSensorValue = 0;
float humiditySensorValue = 0;
byte data[40] = {0};
int err = SimpleDHTErrSuccess;

int temperature = 0;
int humiditySol = 0;
int humidityAir = 0;
int niveauEau = 0;

bool luminosity = false;
bool positionPorte = false;
bool led = false;

char tempHexa[4];
char humiditySolHexa[4];
char humidityAirHexa[4];
char waterLevelHexa[4];


char tempFormated[16];
char humiditySolFormated[16];
char humidityAirFormated[16];
char waterLevelFormated[16];

char luminosityFormated;
char doorFormated;
char ledFormated;

char sigFoxMessage[16];
char sigFoxMessageCP[16];
char sigFoxMessageFormated[16];

char tempZero[3];

// Fonctions declaration
void addZero(char *message, char *messageFormmated, int sizeDesire);
char boolTraitement(bool state);

void setup() {
  // Init moniteur serie 
  Serial.begin(9600);
  Serial.println("Starting...");

  // Check TD1208 communication
  if (!akeru.begin())
  {
    Serial.println("TD1208 KO");
    while(1);
  }
  
  //akeru.echoOn();
}

void loop() {
  //put your main code here, to run repeatedly:

  //  Lecture des sensor
  
  
  //DHT22
  if ((err = dht22.read2(pinDHT22, &temperatureSensorValue, &humiditySensorValue, data)) != SimpleDHTErrSuccess) {
    Serial.print("Read DHT22 failed, err="); Serial.println(err); delay(2000);
    return;
  }
  temperature = int(temperatureSensorValue*100);
  humidityAir = int(humiditySensorValue);

  //Luminosity
  
  photoValue = analogRead(pinPhoto); 
  photoVoltage = photoValue * (5.0/1024.0);
  if(photoVoltage > 3.5){
    luminosity = true;
  }else{
    luminosity = false;
  }

  //0776006311a000000

  //Water Level
  niveauEau = analogRead(pinWaterLevel); // get analog value

  // moisure
  moistureValue = analogRead(pinMoisture);
  humiditySol = int(moistureValue);
  
  // Construction du message

    //Temperature traitement
    itoa(temperature,tempHexa, 16);
    //Serial.println(strlen(tempHexa));
    addZero(tempHexa, tempFormated, 4);

    //Water Level traitement
    itoa(niveauEau, waterLevelHexa, 16);
    addZero(waterLevelHexa, waterLevelFormated, 3);

    //Humidity Sol Traitement
    itoa(humiditySol, humiditySolHexa, 16);
    addZero(humiditySolHexa, humiditySolFormated, 3);

    //Humidity Air Traitement
    itoa(humidityAir, humidityAirHexa, 16);
    addZero(humidityAirHexa, humidityAirFormated, 2);


    //Luminosity Traitement
    //Serial.println(luminosityFormated);
    //strncpy(luminosityFormated, boolTraitement(luminosity), 1);
    luminosityFormated = boolTraitement(luminosity);
    //Serial.println(luminosityFormated);
    
    // Door Traitement
    doorFormated = boolTraitement(positionPorte);
    //Serial.println(boolTraitement(positionPorte));
    
    // Led traitement
    ledFormated = boolTraitement(led);
    //Serial.println(boolTraitement(led));
    

  // Resultat Type : 08ca251e49011000  
  // 062c15a340940000
  
  sprintf( sigFoxMessage, "%s%s%s%s%c%c%c%s", tempFormated, humiditySolFormated, humidityAirFormated, waterLevelFormated, ledFormated, doorFormated,luminosityFormated, "0");

  
  String arrayString = sigFoxMessage;
  if(akeru.sendPayload(arrayString)){
      Serial.println("Message Sent");
  }
    
  
  //Serial.println(sigFoxMessage);
  
  //Attente
  delay(5000);

}

void addZero(char *message, char *messageFormmated, int sizeDesire) {
  //create  string with right number of zero
  
  //Reset/Init variable
  strncpy(tempZero, "", 3);

  //Put right number of zeros
  for(int i=strlen(message); i<sizeDesire; i++){     
     sprintf( tempZero, "%s%s", tempZero, "0" );
  }
  sprintf( sigFoxMessageCP, "%s%s", tempZero, message);
  strncpy(messageFormmated, sigFoxMessageCP, 16);
}

char boolTraitement(bool state){
  if( state ){
    return '1';
  }else {
    return '0';
  }
}

