import { IGreenhouseDBModel } from './greenhouse.schema';
import {
  Schema,
  model,
  Document
} from 'mongoose';

export interface IMeasureDBModel extends Document{
  createdAt:Date;
  temperature:string;
  airMoisture:number;
  soilMoisture:number;
  waterLevel: number;
  luminosity: boolean;
  lampIsOn: boolean;
  doorIsOpen: boolean;
  greenhouse: IGreenhouseDBModel;
}

const MeasureSchema: Schema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now
  },
  temperature: {
    type: String,
    default: ""
  },
  airMoisture: {
    type: Number,
    default: ""
  },
  soilMoisture: {
    type: Number,
    default: ""
  },
  waterLevel: {
    type: Number,
    default: ""
  },
  luminosity: {
    type: Boolean,
    default: false
  },
  lampIsOn: {
    type: Boolean,
    default: false
  },
  doorIsOpen: {
    type: Boolean,
    default: false
  },
  greenhouse: {
    type: Schema.Types.ObjectId,
    ref: "Greenhouse"
  }
});

export default model<IMeasureDBModel>('Measure', MeasureSchema);
