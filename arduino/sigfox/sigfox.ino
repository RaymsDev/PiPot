/* Akeru.h - sendSingleValues.ino
 * 
 * Copyleft Snootlab 2016
 * 
 * How to send a single analog value on the Sigfox network
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

void setup() 
{    
  // initialize serial communication at 9600 bits per second:
  Serial.begin(9600);
  Serial.println("Starting...");
  
  // Check TD1208 communication
  if (!akeru.begin())
  {
    Serial.println("TD1208 KO");
    while(1);
  }
  
  //akeru.echoOn(); // uncomment this line to see AT commands
}

void loop() 
{
    char array[] = "Plop";
    String arrayString= akeru.toHex(array, sizeof(array));
    if(akeru.sendPayload(arrayString)){
      Serial.println("Message Sent");
    }

  // Wait for 10 minutes.
  // Note that delay(600000) will block the Arduino (bug in delay()?)
  for (int second = 0; second < 600; second++) 
  {
    delay(1000);
  }
}
