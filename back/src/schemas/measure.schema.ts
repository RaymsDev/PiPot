import {Schema, model} from 'mongoose';

const MeasureSchema: Schema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now
  },
  temperature : {
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
  waterLevel:{
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
  }
});

export default model('Measure', MeasureSchema);
