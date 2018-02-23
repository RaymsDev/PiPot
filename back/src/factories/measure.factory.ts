import { IMeasure } from './../interfaces/measure.interface';
import { Measure } from './../models/measure.model';
import Converter from './../utils/converter.class';
import {IMeasureDBModel} from './../schemas/measure.schema';
//mutiplier la temperature par 100
const HEX_MAP = {
  nothing: 3,
  temperature: 4,
  soilMoisture: 2,
  airMoisture: 2,
  waterLevel: 2,
  lampisOn: 1,
  doorIsOpen: 1,
  luminosity: 1,
};

const hexDataLength = 16;

class HexMeasure {
  public temperature: string;
  public airMoisture: string;
  public soilMoisture: string;
  public waterLevel: string;
  public luminosity: string;
  public lampIsOn: string;
  public doorIsOpen: string;
}

export class MeasureFactory{
  public static fromHex(hexData: string): IMeasure {
    if (hexData.length != hexDataLength) {
      console.error(`HexData not egal ${hexDataLength}`);
      return null;
    }

    let index = HEX_MAP.nothing || 0;
    const hexMeasure = new HexMeasure();
    hexMeasure.temperature = hexData.substr(index, HEX_MAP.temperature);
    index += HEX_MAP.temperature;

    hexMeasure.soilMoisture = hexData.substr(index, HEX_MAP.soilMoisture);
    index += HEX_MAP.soilMoisture;

    hexMeasure.airMoisture = hexData.substr(index, HEX_MAP.airMoisture);
    index += HEX_MAP.airMoisture;

    hexMeasure.waterLevel = hexData.substr(index, HEX_MAP.waterLevel);
    index += HEX_MAP.waterLevel;

    hexMeasure.lampIsOn = hexData.substr(index, HEX_MAP.lampisOn);
    index += HEX_MAP.lampisOn;

    hexMeasure.doorIsOpen = hexData.substr(index, HEX_MAP.doorIsOpen);
    index += HEX_MAP.doorIsOpen;

    hexMeasure.luminosity = hexData.substr(index, HEX_MAP.luminosity);
    index += HEX_MAP.luminosity;

    if (index != hexDataLength) {
      console.log(`Hex mapping failed!`);
      return null;
    }

    return this.measureFromHexMeasure(hexMeasure);

  }

  private static measureFromHexMeasure(hexMeasure: HexMeasure): IMeasure {
    const measure = new Measure();

    try {
      // Convert
      let temperatureString = Converter.Hex2Dec(hexMeasure.temperature);
      // 2350 > 23,50 °C
      let temperature = parseFloat(temperatureString) / 100;
      // Number to string
      measure.temperature = temperature + '';

      measure.airMoisture = Number.parseInt(Converter.Hex2Dec(hexMeasure.airMoisture));
      measure.soilMoisture = Number.parseInt(Converter.Hex2Dec(hexMeasure.soilMoisture));
      measure.waterLevel = Number.parseInt(Converter.Hex2Dec(hexMeasure.waterLevel));
      measure.luminosity = hexMeasure.luminosity == '1' ? true : false;
      measure.doorIsOpen = hexMeasure.doorIsOpen == '1' ? true : false;
      measure.lampIsOn = hexMeasure.lampIsOn == '1' ? true : false;

    } catch (error) {
      console.error(error);
      return null;
    }

    return measure;
  }

  public static fromDBModel(dBModel: IMeasureDBModel):IMeasure{
    const measure = new Measure();

    measure.temperature = dBModel.temperature;
    measure.airMoisture = dBModel.airMoisture;
    measure.soilMoisture = dBModel.soilMoisture;
    measure.waterLevel = dBModel.waterLevel;
    measure.luminosity = dBModel.luminosity;
    measure.lampIsOn = dBModel.lampIsOn;
    measure.doorIsOpen = dBModel.doorIsOpen;
    measure.greenhouse =dBModel.greenhouse.device;

    return measure;
  }

  public static fromDBModels(dBModels: IMeasureDBModel[]):IMeasure[]{
    const measures = new Array<IMeasure>();

    dBModels.forEach(m=>{
      measures.push(this.fromDBModel(m));
    });

    return measures;
  }
}
