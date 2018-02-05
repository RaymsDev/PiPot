#include <stdlib.h>
#include <string.h>
#include <Akeru.h>

// TD1208 Sigfox module IO definition
/*   Snootlab device | TX | RX
               Akeru | D4 | D5
               Akene | D5 | D4
            Breakout | your pick */
#define TX 5
#define RX 4

// Sigfox instance management 
Akeru akeru(RX, TX);


int temperature = 2250;
int humiditySol = 37;
int humidityAir = 30;
int niveauEau = 73;

bool luminosity = true;
bool positionPorte = true;
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

  // Construction du message

    //Temperature traitement
    itoa(temperature,tempHexa, 16);
    //Serial.println(strlen(tempHexa));
    addZero(tempHexa, tempFormated, 4);

    //Water Level traitement
    itoa(niveauEau, waterLevelHexa, 16);
    addZero(waterLevelHexa, waterLevelFormated, 2);

    //Humidity Sol Traitement
    itoa(humiditySol, humiditySolHexa, 16);
    addZero(humiditySolHexa, humiditySolFormated, 2);

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
  
  sprintf( sigFoxMessage, "%s%s%s%s%c%c%c%s", tempFormated, humiditySolFormated, humidityAirFormated, waterLevelFormated, ledFormated, doorFormated,luminosityFormated, "000");
  
  String arrayString = sigFoxMessage;
  if(akeru.sendPayload(arrayString)){
      Serial.println("Message Sent");
  }
  
  // Envoie du message
  
  Serial.println(sigFoxMessage);
  
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

