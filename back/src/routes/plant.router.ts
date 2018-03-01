import { IPlant } from './../interfaces/plant.interface';
import { PlantController } from './../controllers/plant.controller';
import { IRouter } from './../interfaces/router.interface';
import { Router, Request, Response } from 'express';

class PlantRouter implements IRouter {
  public router: Router;

  constructor(){
    this.router = Router();
    this.routes();
  }

  public list(req: Request, res: Response):void{
    PlantController.list()
    .then((data)=>{
      res.status(200).json({data});
    })
    .catch((error)=>{
        res.status(500).json({error});
    });
  }
  public select(req: Request, res: Response): void{
    const id:string = req.params.id;
    PlantController.select(id)
    .then(data=>{
      res.status(200).json({data});
    })
    .catch(error=>{
      res.status(500).json({error});
    });
  }
  public create (req: Request, res: Response): void{
    const plant = req.body;
    PlantController.create(plant)
    .then(data=>{
      res.status(200).json({data});
  })
  .catch(error=>{
    res.status(500).json({error});
  });
  }
  public update (req: Request, res: Response): void{
    const id :string = req.params.id;
    const plant: IPlant = req.body;


    PlantController.update(id, plant)
    .then(data=>{
      res.status(200).json({data});
    })
    .catch(error=>{
      res.status(500).json({error});
    });
  }
  public remove (req: Request, res: Response): void{
    const id: string = req.params.id;

    PlantController.remove(id)
    .then(()=>{
      res.status(204).end();
    })
    .catch(error=>{
      res.status(500).json({error});
    });
  }
  public routes () :void{
    this.router.get("/", this.list);
    this.router.get("/:id", this.list);
    this.router.post("/",this.create);
    this.router.put("/:id",this.update);
    this.router.delete("/:id", this.remove);
  }
}

const plantRouter = new PlantRouter().router;

export default plantRouter;