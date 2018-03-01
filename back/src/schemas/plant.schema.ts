import { Document, Schema, model } from 'mongoose';

export interface IPlantDBModel extends Document{
  createdAt:Date;
  name:string;
  waterNeed:number;
  lightNeed: number;
  temperatureNeed: string;
  moistureNeed:number;
}

const PlantSchema: Schema = new Schema({
  createdAt:{
    type:Date,
    default:Date.now
  },
  name: {
    type: String,
    default: ""
  },
  waterNeed: {
    type: Number,
    default: 0
  },
  lightNeed: {
    type: Number,
    default: 0
  },
  temperatureNeed: {
    type: String,
    default: ""
  },
  moistureNeed: {
    type: Number,
    default: 0
  },
  updatedAt: {
    type: Date,
  }
});

PlantSchema.pre('update', function () {
  this.update({}, {
    $set: {
      updatedAt: new Date()
    }
  });
});

export default model('Plant', PlantSchema);