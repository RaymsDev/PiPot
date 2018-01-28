import { IDataFromDevice } from './../interfaces/dataFromDevice.interface';
export class DataFromDevice implements IDataFromDevice{
  device: string;
  time: string;
  snr:string;
  station:string;
  data:string;
  avgSignal:string;
  lat:string;
  lng:string;
  rssi:string;
  seqNumber:string;

  constructor(data? :Partial<IDataFromDevice>){
    if(!data){
      return;
    }

    this.device = data.device ? data.device : "";
    this.time = data.device ? data.device : "";
    this.snr = data.snr ? data.snr : "";
    this.station = data.snr ? data.snr : "";
    this.data = data.data ? data.data : "";
    this.avgSignal = data.avgSignal ? data.avgSignal : "";
    this.lat = data.lat ? data.lat : "";
    this.lng = data.lng ? data.lng : "";
    this.rssi = data.rssi ? data.rssi : "";
    this.seqNumber = data.seqNumber ? data.seqNumber : "";
  }
}