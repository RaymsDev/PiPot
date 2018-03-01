import {
  IPlant
} from './plant.interface';
import { IPosition } from './position.interface';

export interface IGreenhouse {
  id?:string;
  device: string;
  position: IPosition;
  plant: IPlant;
}
