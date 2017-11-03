
int PIN_water_level = 5; //analog pin
int water_level_history = 0;
char printBuffer[128];

void setup()
{
  Serial.begin(9600);
}

void loop()
{
    int water_level_value = analogRead(PIN_water_level); // get analog value

    if(((water_level_history>=water_level_value) && ((water_level_history - water_level_value) > 10)) || ((water_level_history<water_level_value) && ((water_level_value - water_level_history) > 10)))
    {
      sprintf(printBuffer,"ADC%d level is %d\n",PIN_water_level, water_level_value);
      Serial.print(printBuffer);
      water_level_history = water_level_value;
    }
}
