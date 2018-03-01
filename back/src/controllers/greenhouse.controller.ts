import { GreenhouseFactory } from './../factories/greenhouse.factory';
import { Greenhouse } from './../models/greenhouse.model';
import { IGreenhouse } from './../interfaces/greenhouse.interface';
import GreenhouseDB, {IGreenhouseDBModel} from './../schemas/greenhouse.schema';
import PlantDB from './../schemas/plant.schema';
import { Document } from 'mongoose';



export class GreenhouseController{
  public static create(greenhouse: IGreenhouse): Promise<Document>{
    return PlantDB.findById(greenhouse.plant.id).then(data => {

      const plantId = data._id;

      const newGreenhouse = new GreenhouseDB({
        "device": greenhouse.device,
        "position":{
          "name": greenhouse.position.name,
          "lattitude":greenhouse.position.lattitude,
          "longitude":greenhouse.position.longitude
        },
        "plant": plantId
      });

      return newGreenhouse.save();
    });
  }

  public static list(){
    const promise = new Promise < IGreenhouse[] > ((resolve, reject) => {

     GreenhouseDB.find()
        .populate('plant')
        .sort({
          createdAt: 'desc'
        }).then((documents: IGreenhouseDBModel[]) => {
          const greenhouses = GreenhouseFactory.fromDBModels(documents);
          resolve(greenhouses);
        }).catch(error=>{
          reject(error);
        });
    });

    return promise;
  }

  public static select(id:string){
    const promise = new Promise < IGreenhouse > ((resolve, reject) => {

      GreenhouseDB.findById(id)
         .populate('plant')
         .sort({
           createdAt: 'desc'
         }).then((document: IGreenhouseDBModel) => {
           const greenhouse = GreenhouseFactory.fromDBModel(document);
           resolve(greenhouse);
         }).catch(error=>{
           reject(error);
         });
     });
 
     return promise;
  }

  public static update(id:string , greenhouse:IGreenhouse){
    return GreenhouseDB.findByIdAndUpdate(id, greenhouse);
  }

  public static remove(id:string){
    return GreenhouseDB.findByIdAndRemove(id);
  }
}