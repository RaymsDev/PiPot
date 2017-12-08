

/* Akeru.h - sendSingleValues.ino

   Copyleft Snootlab 2016

   How to send a single analog value on the Sigfox network
*/

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

#include <SimpleDHT.h>

/* for DHT22,
  //      VCC: 5V or 3V
  //      GND: GND
  //      DATA: 2*/

/*Digital*/
int pinDHT22 = 2;
/*Analog*/
int pinPhoto = 2;
int pinWLvL = 3;
int pinMoisture = 4;
int pinServo = 5;


SimpleDHT22 dht22;

void intPositiveToBitArray(int value, int dataLength, int *arrayDest, int startIndex) {
  int index = startIndex;
  for (int i = dataLength - 1; i >= 0; i--) {
    if ((value >> i) & 1) {
      arrayDest[index] = 1;
    } else {
      arrayDest[index] = 0;
    }
    index++;
  }
  // print for debug
  Serial.print("Conversion binaire de ");
  Serial.print(value);
  Serial.print(" sur ");
  Serial.print(dataLength);
  Serial.print(" bits : ");
  for (int i = startIndex; i < startIndex + dataLength; i++) {
    if ((i + 1) % 4 == 0) {
      Serial.print(' ');
    }
    Serial.print(arrayDest[i]);
  }
  Serial.println("");
}

void floatToBitArray(float value, int *arrayDest, int startIndex, int entierLength, int decimalLength) {
  double entier, decimal;
  decimal = modf(value, &entier);
  if (value < 0) {
    // on stocke sur le premier bit le fait qu'il s'agisse d'un nb negatif
    arrayDest[startIndex] = 1;
    // on repasse sur une valeur positive pour continuer
    entier = entier * -1;
  } else {
    arrayDest[startIndex] = 0;
  }
  startIndex++;
  intPositiveToBitArray((int) entier, entierLength, arrayDest, startIndex);
  intPositiveToBitArray((int) (decimal * 100), decimalLength, arrayDest, startIndex + entierLength);
}


void setup()
{
  // initialize serial communication at 9600 bits per second:
  Serial.begin(9600);
  Serial.println("Starting...");



  // Check TD1208 communication
  if (!akeru.begin())
  {
    Serial.println("TD1208 KO");
    while (1);
  }

  //akeru.echoOn(); // uncomment this line to see AT commands
}

void loop()
{

  // start working...
  Serial.println("=================================");
  Serial.println("Sample DHT22 with RAW bits...");

  // read with raw sample data.
  // @remark We use read2 to get a float data, such as 10.1*C
  //    if user doesn't care about the accurate data, use read to get a byte data, such as 10*C.
  float temperature = 0;
  float humidity = 0;
  byte data[40] = {0};

  int err = SimpleDHTErrSuccess;
  if ((err = dht22.read2(pinDHT22, &temperature, &humidity, data)) != SimpleDHTErrSuccess) {
    Serial.print("Read DHT22 failed, err="); Serial.println(err); delay(2000);
    return;
  }

  int temperatureBin[10];
  Serial.print("Sample RAW Bits: ");

  for (int i = 0; i < 40; i++) {
    Serial.print(data[i]);
  }

  Serial.println("");
  floatToBitArray(temperature * 10, temperatureBin, 0, 6, 4);



  Serial.println("");

  Serial.print("Sample OK: ");
  Serial.print(int(temperature)); Serial.print(" *C, ");
  Serial.print(int(humidity)); Serial.println(" RH%");

  // DHT22 sampling rate is 0.5HZ.

  /*String arrayString = akeru.toHex(humidityTemperature);
    Serial.println(arrayString);
    if (akeru.sendPayload(arrayString)) {
    Serial.println("Message Sent");
    }

    // Wait for 10 minutes.
    // Note that delay(600000) will block the Arduino (bug in delay()?)
    for (int second = 0; second < 600; second++)
    {
    delay(1000);
    }*/
}
