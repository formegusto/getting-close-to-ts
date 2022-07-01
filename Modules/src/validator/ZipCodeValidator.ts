import { StringValidator } from "./StringValidator";

// export const numberRegExp = new RegExp("/^[0-9]+$/");
const numberRegExp = new RegExp("/^[0-9]+$/");

class ZipCodeValidator implements StringValidator {
  isAcceptable(s: string): boolean {
    return s.length === 5 && numberRegExp.test(s);
  }
}

export { ZipCodeValidator };
export { ZipCodeValidator as mainValidator };
// export = ZipCodeValidator;
