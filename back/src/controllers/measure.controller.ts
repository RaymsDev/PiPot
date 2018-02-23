import { Document } from 'mongoose';

import { MeasureFactory } from './../factories/measure.factory';
import { IMeasure } from './../interfaces/measure.interface';
import GreenhouseDBModel from './../schemas/greenhouse.schema';
import MeasureDBModel, { IMeasureDBModel } from './../schemas/measure.schema';

export class MeasureController {

  public static create(measure: IMeasure): Promise < Document > {
    const temperature: string = measure.temperature;
    const airMoisture: number = measure.airMoisture;
    const soilMoisture: number = measure.soilMoisture;
    const waterLevel: number = measure.waterLevel;
    const luminosity: boolean = measure.luminosity;
    const lampIsOn: boolean = measure.lampIsOn;
    const doorIsOpen: boolean = measure.doorIsOpen;
    const greenhouseDevice: string = measure.greenhouse;

    return GreenhouseDBModel.findOne({
      device: greenhouseDevice
    }).then(data => {

      const greenhouseId = data._id;

      const measure = new MeasureDBModel({
        temperature,
        airMoisture,
        soilMoisture,
        waterLevel,
        luminosity,
        lampIsOn,
        doorIsOpen,
        "greenhouse": greenhouseId
      });

      return measure.save();
    });
  }

  public static list(): Promise < IMeasure[] > {
    const promise = new Promise < IMeasure[] > ((resolve, reject) => {

      MeasureDBModel.find()
        .populate('greenhouse', 'device')
        .sort({
          createdAt: 'desc'
        }).then((documents: IMeasureDBModel[]) => {
          const measures = MeasureFactory.fromDBModels(documents);
          resolve(measures);
        }).catch(error=>{
          reject(error);
        });
    });

    return promise;
  }

  public static select(id:string):Promise<IMeasure>{
    const promise = new Promise < IMeasure > ((resolve, reject) => {

      MeasureDBModel.findById(id)
        .populate('greenhouse', 'device')
        .then((document: IMeasureDBModel) => {
          const measure = MeasureFactory.fromDBModel(document);
          resolve(measure);
        }).catch(error=>{
          reject(error);
        });
    });

    return promise;
  }
}