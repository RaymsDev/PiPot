import { IGreenhouse } from './greenhouse.interface';
export interface IMeasure{
  id?:string;
  temperature?: string;
  airMoisture?: number;
  soilMoisture?: number;
  waterLevel?:number;
  luminosity?: boolean;
  lampIsOn?: boolean;
  doorIsOpen?: boolean;
  greenhouse?:string;
}