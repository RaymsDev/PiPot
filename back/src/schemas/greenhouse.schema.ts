import { IPlantDBModel } from './plant.schema';
import {
  Schema,
  model,
  Document
} from 'mongoose';

export interface IGreenhouseDBModel extends Document {
  createdAt: Date;
  updatedAt: Date;
  device: string;
  position: {
    name: string,
    lattitude: string,
    longitude: string
  };
  plant: IPlantDBModel
}

const GreenhouseSchema: Schema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
  device: {
    type: String,
    required: true,
    unique: true
  },
  position: {
    name: {
      type: String,
      default: ""
    },
    lattitude: {
      type: String,
      default: ""
    },
    longitude: {
      type: String,
      default: ""
    }
  },
  plant: {
    type: Schema.Types.ObjectId,
    ref: "Plant"
  }
});

GreenhouseSchema.pre('update', function () {
  this.update({}, {
    $set: {
      updatedAt: new Date()
    }
  });
});


export default model('Greenhouse', GreenhouseSchema);