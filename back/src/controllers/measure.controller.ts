import { IMeasure } from './../interfaces/measure.interface';
import MeasureDBModel from "./../schemas/measure.schema"
import GreenhouseDBModel from "./../schemas/greenhouse.schema";
import { Document } from "mongoose";

export class MeasureController{

  public static create(measure: IMeasure):Promise<Document>{
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
}
