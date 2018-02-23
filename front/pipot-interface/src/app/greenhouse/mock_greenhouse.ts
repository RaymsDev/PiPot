import { Greenhouse} from '../../model/greenhouse.model';
import { PLANT} from './plant/mock-plant';
import {IPosition} from '../../interfaces/position.interface';
import {IPlant} from '../../interfaces/plant.interface';

export const GREENHOUSE: Greenhouse[] = [
  {
    device: '2002D3',
    position: {name: 'Toulouse', lattitude: '2345678O', longitude: '123N'},
    plant: PLANT[0]
  }
];
