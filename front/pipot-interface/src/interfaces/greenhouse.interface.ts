import {
  IPlant
} from './plant.interface';
import { IPosition } from './position.interface';

export interface IGreenhouse {
  device: string;
  position: IPosition;
  plant: IPlant;
}
