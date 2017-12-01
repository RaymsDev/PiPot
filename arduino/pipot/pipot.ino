

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
int pinDHT22 = 2;
SimpleDHT22 dht22;

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
  String temp = "";
  int err = SimpleDHTErrSuccess;
  if ((err = dht22.read2(pinDHT22, &temperature, &humidity, data)) != SimpleDHTErrSuccess) {
    Serial.print("Read DHT22 failed, err="); Serial.println(err); delay(2000);
    return;
  }

  int humidityTemperature = 0;
  Serial.print("Sample RAW Bits: ");
  
  for (int i = 31, j = 0; i >= 0 ; i--) {
    //Serial.print(data[i]);
    if (data[j] == 1) {
      humidityTemperature |= 1 << i;
      Serial.println(humidityTemperature);
    }
    j++;
  }

  Serial.println("");
  Serial.print(humidityTemperature, BIN);

  Serial.println("");

  Serial.print("Sample OK: ");
  Serial.print(int(temperature)); Serial.print(" *C, ");
  Serial.print(int(humidity)); Serial.println(" RH%");

  // DHT22 sampling rate is 0.5HZ.

  String arrayString = akeru.toHex(humidityTemperature);
  Serial.println(arrayString);
  if (akeru.sendPayload(arrayString)) {
    Serial.println("Message Sent");
  }

  // Wait for 10 minutes.
  // Note that delay(600000) will block the Arduino (bug in delay()?)
  for (int second = 0; second < 600; second++)
  {
    delay(1000);
  }
}
