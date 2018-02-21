import { Measure} from '../../model/measure.model';

export const MEASURES: Measure[] = [
  {
    createdAt: new Date('2018-02-21T11:04:38.739Z'),
    temperature: '23,5',
    airMoisture: 54,
    soilMoisture: 29,
    waterLevel: 48,
    luminosity: true,
    lampIsOn: false,
    doorIsOpen: false,
    greenhouse: '2002D3'
  },

  {
    createdAt: new Date('2018-02-21T11:04:28.739Z'),
    temperature: '23,5',
    airMoisture: 78,
    soilMoisture: 99,
    waterLevel: 88,
    luminosity: true,
    lampIsOn: false,
    doorIsOpen: false,
    greenhouse: '2002D3'
  }
];
