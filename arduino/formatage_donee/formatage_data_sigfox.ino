
#include <stdlib.h>

int temperature = 2250;
int humiditySol = 37;
int humidityAir = 30;
bool luminosity = 1;
int positionPorte = 1;
int niveauEau = 73;
bool led = 1;

char tempHexa[4];

char humiditySolHexa[2];
char humidityAirHexa[2];

char waterLevelHexa[3];

char sigFoxMessage[16];

void setup() {
  // Init moniteur serie 
  Serial.begin(9600);
  Serial.println("Starting...");

  
}



void loop() {
  //put your main code here, to run repeatedly:

  //  Lecture des sensor

  // Construction du message
  
    //Temperature traitement
    itoa(temperature,tempHexa, 16);
  
    //Water Level traitement
    itoa(niveauEau, waterLevelHexa, 16);
  
    //Humidity Sol Traitement
    itoa(humiditySol, humiditySolHexa, 16);
  
    //Humidity Air Traitement
    itoa(humidityAir, humidityAirHexa, 16);

  //SigFox message construction
  //sigFoxMessage = tempHexa + waterLevelHexa;
  sprintf( sigFoxMessage, "%s%s", tempHexa, humiditySolHexa, humidityAirHexa,waterLevelHexa);

  // Envoie du message
  Serial.println(sigFoxMessage);
  
  //Attente
  delay(5000);
}

String addZero(char* message, int size) {
}

