import { IMeasure } from './../interfaces/measure.interface';


export class Measure implements IMeasure {
  public id?:string;
  public createdAt: Date;
  public temperature: string;
  public airMoisture: number;
  public soilMoisture: number;
  public waterLevel: number;
  public luminosity: boolean;
  public lampIsOn: boolean;
  public doorIsOpen: boolean;
  public greenhouse ? : string;

  constructor(data ? : Partial < IMeasure > ) {
    if (!data) {
      return;
    }

    this.id = data.id ? data.id : null;
    this.createdAt = data.createdAt ? data.createdAt : new Date();
    this.temperature = data.temperature ? data.temperature : "";
    this.airMoisture = data.airMoisture ? data.airMoisture : 0;
    this.soilMoisture = data.soilMoisture ? data.soilMoisture : 0;
    this.waterLevel = data.waterLevel ? data.waterLevel : 0;
    this.luminosity = data.luminosity ? data.luminosity : false
    this.lampIsOn = data.lampIsOn ? data.lampIsOn : false;
    this.doorIsOpen = data.doorIsOpen ? data.doorIsOpen : false;
    this.greenhouse = data.greenhouse;
  }
}
