import { IPlant } from './../interfaces/plant.interface';
import { Document } from 'mongoose';
import plantDB from './../schemas/plant.schema';

export class PlantController{
  public static create(plant: IPlant): Promise<Document>{

    const plantModel = new plantDB({
      "name":plant.name,
      "waterNeed":plant.waterNeed,
      "lightNeed":plant.lightNeed,
      "temperatureNeed":plant.temperatureNeed,
      "moistureNeed":plant.moistureNeed
    });

    return plantModel.save();
  }

  public static list(){
    return plantDB.find();
  }

  public static select(id:string){
    return plantDB.findById(id);
  }

  public static update(id:string , plant:IPlant){
    return plantDB.findByIdAndUpdate(id, plant);
  }

  public static remove(id:string){
    return plantDB.findByIdAndRemove(id);
  }
}