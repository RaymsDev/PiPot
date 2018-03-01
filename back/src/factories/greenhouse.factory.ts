import { Greenhouse } from './../models/greenhouse.model';
import { IGreenhouseDBModel } from './../schemas/greenhouse.schema';
import { IGreenhouse } from './../interfaces/greenhouse.interface';
import { Plant } from '../models/plant.model';

export class GreenhouseFactory{

  public static fromDBModel(dBModel: IGreenhouseDBModel):IGreenhouse{
    const greenhouse = new Greenhouse();

    greenhouse.id = dBModel._id;
    greenhouse.device = dBModel.device;
    greenhouse.position = dBModel.position;
    
    const plant = new Plant();
    plant.id = dBModel.plant._id;
    plant.name = dBModel.plant.name;
    plant.waterNeed = dBModel.plant.waterNeed;
    plant.lightNeed = dBModel.plant.lightNeed;
    plant.moistureNeed = dBModel.plant.moistureNeed;
    greenhouse.plant = plant;

    return greenhouse;
  }

  public static fromDBModels(dBModels: IGreenhouseDBModel[]):IGreenhouse[]{
    const greenhouses = new Array<IGreenhouse>();

    dBModels.forEach(g=>{
      greenhouses.push(this.fromDBModel(g));
    });

    return greenhouses;
  }
}
