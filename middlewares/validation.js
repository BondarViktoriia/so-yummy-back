const RequestError = require("../helpers/RequestError");

const validation = (schema) => {
  return (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(RequestError(400, `${error.message}`));
    }
    next();
  };
};

module.exports = validation;