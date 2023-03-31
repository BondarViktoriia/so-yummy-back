const RequestError = require("../helpers/RequestError");

const validation = (schema) => {
  return (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(RequestError(400, "Missing field favorite"));
    }
    next();
  };
};

module.exports = validation;