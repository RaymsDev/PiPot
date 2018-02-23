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
  plant: {
    name: string,
    waterNeed: number,
    lightNeed: number,
    temperatureNeed: string,
    moistureNeed: number,
  };
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

GreenhouseSchema.pre('update', function () {
  this.update({}, {
    $set: {
      updatedAt: new Date()
    }
  });
});


export default model('Greenhouse', GreenhouseSchema);