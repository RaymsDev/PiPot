import {
  IMeasure
} from './../interfaces/measure.interface';
import {
  IDownInstruction,
  ILampInstruction,
  IDoorInstruction,
  IPumpInstruction
} from './../interfaces/downInstruction.interface';
import Converter from "./../utils/converter.class";

const LIGHT_BIN_SIZE = 1;
const LIGHT_TIME_BIN_SIZE = 8;
const PUMP_TIME_BIN_SIZE = 16;
const DOOR_BIN_SIZE = 1;

const LIGHT_HEX_SIZE = 1;
const LIGHT_TIME_HEX_SIZE = 1;
const PUMP_TIME_HEX_SIZE = 2;
const DOOR_HEX_SIZE = 1;

const DOWN_DATA_HEX_SIZE = 1;

export class DownInstruction implements IDownInstruction {
  public lamp: ILampInstruction;
  public door: IDoorInstruction;
  public pump: IPumpInstruction;

  constructor(data ? : Partial < IMeasure > ) {
    if (!data) {
      return;
    }

    this.lamp = this.createLampInstruction(data.luminosity);
    this.door = this.createDoorInstruction(data.temperature, data.airMoisture, data.doorIsOpen);
    this.pump = this.createPumpInstruction(data.soilMoisture);
  }


  public createLampInstruction(luminosity: Boolean): ILampInstruction {
    const lampInstruction: ILampInstruction = {
      light: false,
      timeInMinutes: 0
    }

    // TODO: Implement logic
    if (!luminosity) {
      lampInstruction.light = true;
      lampInstruction.timeInMinutes = 5;
    }

    return lampInstruction;

  }

  public createDoorInstruction(temperature: string, airMoisture: number, doorIsOpen: Boolean): IDoorInstruction {
    const doorInstruction: IDoorInstruction = {
      open: false,
    };

    // TODO: Implement logic
    if (!doorIsOpen) {
      doorInstruction.open = true;
    }

    return doorInstruction;
  }

  public createPumpInstruction(soilMoisture: number): IPumpInstruction {
    const pumpInstruction: IPumpInstruction = {
      timeInMillis: 0
    };

    // TODO: Implement logic
    if (soilMoisture < 20) {
      pumpInstruction.timeInMillis = 5 * 1000;
    }

    return pumpInstruction;
  }

  // 8 bytes max
  public toHex(): string {
    let binData: string = "";

    const lampData = this.lamp.light ? "1" : "0";
    const lampTimeData = Converter.Dec2Bin(this.lamp.timeInMinutes);
    const pumpTimeData = Converter.Dec2Bin(this.pump.timeInMillis);
    const doorData = this.door.open ? "1" : "0";

    binData += this.exploitAllByte(lampData + doorData, LIGHT_HEX_SIZE);
    binData += this.exploitAllByte(lampTimeData.toString(), LIGHT_TIME_HEX_SIZE);
    binData += this.exploitAllByte(pumpTimeData.toString(), PUMP_TIME_HEX_SIZE);

    let hexData = Converter.Bin2Hex(binData);

    hexData = this.exploitAllByte(hexData, DOWN_DATA_HEX_SIZE);

    return hexData;
  }

  private exploitAllByte(data: string, bytes: number = 1): string {
    let result: string = "";;

    const zeroNumberNeeded = (bytes * 8) - data.length;

    if (zeroNumberNeeded > 0) {
      for (let i = 0; i < zeroNumberNeeded; i++) {
        result += "0";
      }
    }

    result += data;

    return result;
  }
}
