int photoresistor_PIN = 0;  //define a pin for Photo resistor
int lightLevelHistory =0;

void setup()
{
    Serial.begin(9600);  //Begin serial communcation
}

void loop()
{
    int lightLevel = analogRead(photoresistor_PIN);

    if(((lightLevelHistory > lightLevel )&&((lightLevelHistory - lightLevel) > 50))||((lightLevel> lightLevelHistory)&&((lightLevel - lightLevelHistory)>50)))
    {
      float voltage = lightLevel * (5.0 /1023.0);
      Serial.println(voltage);
      Serial.println(lightLevel); //Write the value of the photoresistor to the serial monitor.
      //you have  to divide the value. for example,
      //with a 10k resistor divide the value by 2, for 100k resistor divide by 4.
      lightLevelHistory = lightLevel;
    }
    delay(10); //short delay for faster response to light.
}
