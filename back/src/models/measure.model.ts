import {
  IMeasure
} from './../interfaces/measure.inteface';

export class Measure implements IMeasure {
  public temperature: Number;
  public airMoisture: Number;
  public soilMoisture: Number;
  public waterLevel: Number;
  public luminosity: Boolean;
  public lampIsOn: Boolean;
  public doorIsOpen: Boolean;

  constructor(data ? : Partial < IMeasure > ) {
    if (!data) {
      return;
    }

    this.temperature = data.temperature ? data.temperature : new Number();
    this.airMoisture = data.airMoisture ? data.airMoisture : new Number();
    this.soilMoisture = data.soilMoisture ? data.soilMoisture : new Number();
    this.waterLevel = data.waterLevel ? data.waterLevel : new Number();
    this.luminosity = data.luminosity ? data.luminosity : false
    this.lampIsOn = data.lampIsOn ? data.lampIsOn : false;
    this.doorIsOpen = data.doorIsOpen ? data.doorIsOpen : false;
  }
}