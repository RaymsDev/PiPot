import { MeasureController } from './../controllers/measure.controller';
import {
  Request,
  Response,
  Router
} from "express";
import {
  IRouter
} from "../interfaces/router.interface";
import MeasureDBModel from "./../schemas/measure.schema"
import GreenhouseDBModel from "./../schemas/greenhouse.schema";

class MeasureRouter implements IRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public list(req: Request, res: Response): void {
    MeasureDBModel.find()
      .then((data) => {
        res.status(200).json({
          data
        });
      })
      .catch((error) => {
        res.status(500).json({
          error
        });
      });
  }

  public select(req: Request, res: Response): void {
    const id: string = req.params.id;
    MeasureDBModel.findById(id)
      .then(data => {
        res.status(200).json({
          data
        });
      })
      .catch(error => {
        res.status(500).json({
          error
        });
      });
  }

  public create(req: Request, res: Response): void {
      MeasureController.create(req.body)
      .then(data => {
        res.status(200).json({
          data
        });
      })
      .catch(error => {
        res.status(500).json({
          error
        });
      });
  }

  public update(req: Request, res: Response): void {
    const id: string = req.params.id;

    MeasureDBModel.findByIdAndUpdate(id, req.body)
      .then(data => {
        res.status(200).json({
          data
        });
      })
      .catch(error => {
        res.status(500).json({
          error
        });
      });
  }

  public remove(req: Request, res: Response): void {
    const id: string = req.params.id;

    MeasureDBModel.findByIdAndRemove(id)
      .then(() => {
        res.status(204).end();
      })
      .catch(error => {
        res.status(500).json({
          error
        });
      });
  }

  public routes(): void {
    this.router.get('/', this.list);
    this.router.get('/:id', this.select);
    this.router.post('/', this.create);
    this.router.put('/:id', this.update);
    this.router.delete('/:id', this.remove);
  }
}

const measureRouter = new MeasureRouter().router;

export default measureRouter;