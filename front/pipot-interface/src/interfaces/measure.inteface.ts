import { IGreenhouse } from './greenhouse.interface';
export interface IMeasure {
  createdAt?: Date;
  temperature?: string;
  airMoisture?: number;
  soilMoisture?: number;
  waterLevel?: number;
  luminosity?: boolean;
  lampIsOn?: boolean;
  doorIsOpen?: boolean;
  greenhouse?: string;
}
