import { DataFromDevice } from './../models/dataFromDevice.model';
import {
  IMeasure
} from './../interfaces/measure.interface';
import {
  DownInstruction
} from './../models/downInstruction.model';
import {
  Request,
  Response,
  Router
} from 'express';
import Converter from "./../utils/converter.class";
import MeasureDBModel from "./../schemas/measure.schema"
import {
  Measure
} from './../models/measure.model';
import {
  Document
} from 'mongoose';
import { SigfoxController } from '../controllers/sigfox.controller';

class SigfoxRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public pull(req: Request, res: Response): void {
    const device = req.params.device;

    // TODO: find by device
    MeasureDBModel.findOne()
      .sort({
        "createdAt": "desc"
      })
      .then((data: Document) => {
        const downData = new DownInstruction(data.toObject());
        const hexData = downData.toHex();

        res.status(200).json({
          device: device,
          data: hexData
        });
      })
      .catch(error => {
        res.status(500).json({
          error
        });
      });
  }

  public push(req: Request, res: Response): void {
    const dataFromDevice: DataFromDevice = req.body;
    SigfoxController.create(dataFromDevice)
    .then((data:Document)=>{
      res.status(200).json({
        data
      });
    })
    .catch(error=>{
      res.status(500).json({
        error
      });
    });
  }

  public routes(): void {
    this.router.get("/down/:device", this.pull);
    this.router.post("/up", this.push);
  }
}

const sigFoxRouter = new SigfoxRouter().router;

export default sigFoxRouter;
