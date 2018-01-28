import { Router, Request, Response } from 'express';
import { IRouter } from './../interfaces/router.interface';
import GreenhouseDBModel from '../schemas/greenhouse.schema';

class GreenhouseRouter implements IRouter{

  public router: Router;

  constructor(){
    this.router = Router();
    this.routes();
  }

  public list(req: Request, res: Response):void{
    GreenhouseDBModel.find()
    .then((data)=>{
      res.status(200).json({data});
    })
    .catch((error)=>{
        res.status(500).json({error});
    });
  }

  public select(req: Request, res: Response):void{
    const id:string = req.params.id;
    GreenhouseDBModel.findById(id)
    .then(data=>{
      res.status(200).json({data});
    })
    .catch(error=>{
      res.status(500).json({error});
    });
  }

  public create(req: Request, res: Response):void{

    const device = req.body.device;
    const position = req.body.position;
    const plant = req.body.plant;

    const greenhouse = new GreenhouseDBModel({
      device,
      position,
      plant
    });

    greenhouse.save()
    .then(data=>{
        res.status(200).json({data});
    })
    .catch(error=>{
      res.status(500).json({error});
    });
  }

  public update(req: Request, res: Response):void{
    const id :string = req.params.id;

    GreenhouseDBModel.findByIdAndUpdate(id, req.body)
    .then(data=>{
      res.status(200).json({data});
    })
    .catch(error=>{
      res.status(500).json({error});
    });
  }

  public remove(req: Request, res: Response):void{
    const id: string = req.params.id;

    GreenhouseDBModel.findByIdAndRemove(id)
    .then(()=>{
      res.status(204).end();
    })
    .catch(error=>{
      res.status(500).json({error});
    });
  }

  public routes(){
    this.router.get("/", this.list);
    this.router.get("/:id", this.list);
    this.router.post("/",this.create);
    this.router.put("/:id",this.update);
    this.router.delete("/:id", this.remove);
  };
  
}

const greenhouseRouter = new GreenhouseRouter().router;

export default greenhouseRouter;