const handleError = (err, req, res, next) => {
  // Error code is equal to http status code of the corresponding error.
  const code = err.code || 500;
  const msg = err.message || 'Internal server error';

  return res.status(code).json({
    code,
    msg
  });
};

module.exports = handleError;
