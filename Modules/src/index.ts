// import { mainValidator } from "./validator";
// console.log(new mainValidator().isAcceptable("12345"));

// import { ZipValid } from "./validator";

// import { ZipCodeValidator } from "./validator";
// import { ZipCodeValidator as subValidator } from "./validator";

// import * as validator from "./validator";
// const { ZipCodeValidator } = validator;
// console.log(new ZipCodeValidator().isAcceptable("testt"));

// import { CODE } from "./validator/types";
// import type { CODE } from "./validator/types";

// ZipValid.mainValidator;
// ZipValid.numberRegExp;

// import zip = require("./validator/ZipCodeValidator");

// console.log(new zip().isAcceptable("test"));

import * as Zip from "./validator/ZipCodeValidator";

const needZipValidation = true;
if (needZipValidation) {
  let ZipCodeValidator: typeof Zip = require("./validator/ZipCodeValidator");
  let validator = new ZipCodeValidator.ZipCodeValidator();

  if (validator.isAcceptable("...")) {
  }
}

(async function () {
  const zipCode = await import("./validator/ZipCodeValidator");

  let validator = new zipCode.ZipCodeValidator();
  console.log(validator.isAcceptable("..test"));
})();
