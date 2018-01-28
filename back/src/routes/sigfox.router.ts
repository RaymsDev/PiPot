import {
  IMeasure
} from './../interfaces/measure.inteface';
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
    const hexData = req.body.data;
    const device = req.body.device;
    const binData = Converter.Bin2Hex;

    // TODO: Map bin to Measure obj
    const measure = new Measure();

    const measureDB = new MeasureDBModel({
      temperature: measure.temperature,
      airMoisture: measure.airMoisture,
      soilMoisture: measure.soilMoisture,
      waterLevel: measure.waterLevel,
      luminosity: measure.luminosity,
      lampIsOn: measure.lampIsOn,
      doorIsOpen: measure.doorIsOpen
    });

    measureDB.save()
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

  public routes(): void {
    this.router.get("/down/:device", this.pull);
    this.router.post("/up", this.push);
  }
}

const sigFoxRouter = new SigfoxRouter().router;

export default sigFoxRouter;
