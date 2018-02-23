import { Document } from 'mongoose';

import GreenhouseSchema from '../schemas/greenhouse.schema';
import { MeasureFactory } from './../factories/measure.factory';
import { DataFromDevice } from './../models/dataFromDevice.model';
import MeasureDBModel from './../schemas/measure.schema';

export class SigfoxController {

  public static create(dataFromDevice: DataFromDevice): Promise < Document > {
    const measure = MeasureFactory.fromHex(dataFromDevice.data);

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