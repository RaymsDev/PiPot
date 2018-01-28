import { IDataFromDevice } from './../interfaces/dataFromDevice.interface';
export class DataFromDevice implements IDataFromDevice{
  public device: string;
  public time: string;
  public snr:string;
  public station:string;
  public data:string;
  public avgSignal:string;
  public lat:string;
  public lng:string;
  public rssi:string;
  public seqNumber:string;

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