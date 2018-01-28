import { IPosition } from './../interfaces/position.interface';

export class Position implements IPosition {
  public name: string;
  public lattitude: string;
  public longitude: string;

  constructor(data? : Partial<IPosition>){
    if(!data){
      return;
    }

    this.name = data.name ? data.name : "";
    this.lattitude = data.lattitude ? data.lattitude : "";
    this.longitude = data.longitude ? data.longitude : "";
  }
}