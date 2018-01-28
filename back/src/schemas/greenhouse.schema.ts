import {
  Schema,
  model
} from 'mongoose';

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
    required: true
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
    }
  }
});

GreenhouseSchema.pre('update', function() {
  this.update({},{ $set: { updatedAt: new Date() } });
});


export default model('Greenhouse', GreenhouseSchema);