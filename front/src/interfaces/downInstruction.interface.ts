export interface IDownInstruction {
  lamp: ILampInstruction;
  door: IDoorInstruction;
  pump: IPumpInstruction;
}

export interface ILampInstruction {
  light: boolean;
  timeInMinutes: number;
}

export interface IPumpInstruction {
  timeInMillis: number;
}

export interface IDoorInstruction {
  open: boolean;
}