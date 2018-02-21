import {
  Measure
} from './../models/measure.model';
import {
  Document
} from 'mongoose';
import {
  DataFromDevice
} from './../models/dataFromDevice.model';
import MeasureDBModel from "./../schemas/measure.schema"
import GreenhouseSchema from '../schemas/greenhouse.schema';

export class SigfoxController {
  public static create(dataFromDevice: DataFromDevice): Promise < Document > {
    const measure = Measure.fromHex(dataFromDevice.data);

    return GreenhouseSchema.findOne({
      device: dataFromDevice.device
    }).then((greenHouse:Document)=> {
      const measureDB = new MeasureDBModel({
        temperature: measure.temperature,
        airMoisture: measure.airMoisture,
        soilMoisture: measure.soilMoisture,
        waterLevel: measure.waterLevel,
        luminosity: measure.luminosity,
        lampIsOn: measure.lampIsOn,
        doorIsOpendevice: measure.doorIsOpen,
        greenhouse: greenHouse._id
      });

      return measureDB.save();
    });
  }
}