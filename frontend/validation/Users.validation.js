const isEmpty = require("./isEmpty");
const validator = require("validator");

module.exports = function ValidateUser(data) {
  let errors = {};
  data.Nom = !isEmpty(data.Nom) ? data.Nom : "";
  data.Date = !isEmpty(data.Date) ? data.Date : "";
  data.Artistes = !isEmpty(data.Artistes) ? data.Artistes : "";
  data.Lien = !isEmpty(data.Lien) ? data.Lien : "";
 
 
  if (validator.isEmpty(data.Nom)) {
    errors.Nom = "Required Nom";
  }
  if (validator.isEmpty(data.Date)) {
    errors.Date = "Required Date";
  }
  if (validator.isEmpty(data.Artistes)) {
    errors.Artistes = "Required Firstname";
  }
  if (validator.isEmpty(data.Lien)) {
    errors.Lien = "Required Lien";
  }

  return {
      errors,
      isValid: isEmpty(errors)
  }
};
