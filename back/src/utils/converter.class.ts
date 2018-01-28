class Converter {
  //Useful Functions
  private checkBin(n: any): boolean {
    return /^[01]{1,64}$/.test(n);
  }

  private checkDec(n: any): boolean {
    return /^[0-9]{1,64}$/.test(n);
  }

  private checkHex(n: any): boolean {
    return /^[0-9A-Fa-f]{1,64}$/.test(n);

  }

  private pad(s: any, z: any): string {
    s = "" + s;
    return s.length < z ? this.pad("0" + s, z) : s;
  }
  
  private unpad(s: any): string {
    s = "" + s;
    return s.replace(/^0+/, '')
  }

  //Decimal operations
  public Dec2Bin(n: number): string | number {
    if (!this.checkDec(n) || n < 0) {
      return 0;
    }

    return n.toString(2);
  }

  public Dec2Hex(n: number): string {
    if (!this.checkDec(n) || n < 0) {
      return (0).toString();
    }
    return n.toString(16);
  }

  //Binary Operations
  public Bin2Dec(n: string): string | number {
    if (!this.checkBin(n)) {
      return 0;
    }
    return parseInt(n, 2).toString(10);
  }

  public Bin2Hex(n: string): string {
    if (!this.checkBin(n)) {
      return (0).toString();
    }
    return parseInt(n, 2).toString(16);
  }

  //Hexadecimal Operations
  public Hex2Bin(n: string): string | number {
    if (!this.checkHex(n)) {
      return (0).toString();
    }
    return parseInt(n, 16).toString(2);
  }

  public Hex2Dec(n: string): string {
    if (!this.checkHex(n)) {
      return (0).toString();
    }
    return parseInt(n, 16).toString(10);
  }
}

const converter = new Converter();

export default converter;