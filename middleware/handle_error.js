const ApiError = require('./../util/api_error');

const handleError = (err, req, res, next) => {
  // Error code is equal to http status code of the corresponding error.
  let code = err.code || 500;
  let msg = err.message || 'Internal server error';
  if (!(err instanceof ApiError)) {
    code = 500;
    msg = 'Internal server error';
  }

  return res.status(code).json({
    code,
    msg
  });
};

module.exports = handleError;
