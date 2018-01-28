import * as chalk from "chalk";

const colors = chalk.default;

export class ConsoleLogger{

  public static success(obj:any):void{
    console.log(colors.green(obj));
  }

  public static info(obj:any):void{
    console.log(colors.blue(obj));
  }

  public static error(obj:any):void{
    console.log(colors.red(obj));
  }

  public static warning(obj:any):void{
    console.log(colors.yellow(obj));
  }


}