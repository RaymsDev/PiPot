import {
  IPlant
} from './../interfaces/plant.interface';

export class Plant implements IPlant {
  public name: string;
  public waterNeed: number;
  public lightNeed: number;
  public temperatureNeed: string;
  public moistureNeed: number;

  constructor(data ?: Partial < IPlant > ) {
    if (!data) {
      return;
    }

    this.name = data.name ? data.name : '';
    this.waterNeed = data.waterNeed ? data.waterNeed : 0;
    this.lightNeed = data.lightNeed ? data.lightNeed : 0;
    this.temperatureNeed = data.temperatureNeed ? data.temperatureNeed : '';
    this.moistureNeed = data.moistureNeed ? data.moistureNeed : 0;
  }
}
