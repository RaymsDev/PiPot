import { Plant } from './plant.model';
import { IPlant } from './../interfaces/plant.interface';
import { IGreenhouse } from './../interfaces/greenhouse.interface';
import { IPosition } from '../interfaces/position.interface';
import { Position } from './position.model';

export class Greenhouse implements IGreenhouse{
  device: string;
  position: IPosition;
  plant: IPlant;

  constructor(data? : Partial<IGreenhouse>){
    if(!data){
      return;
    }

    this.device = data.device ? data.device :"";
    this.plant = new Plant(data.plant);
    this.position = new Position(data.position);
  }
}