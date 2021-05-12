const Joi = require('joi');
const ApiError = require('./../../util/api_error');

const _schema = Joi.object().keys({
  startDate: Joi.date().iso().required(),
  endDate: Joi.date().iso().required(),
  minCount: Joi.number().integer().required(),
  maxCount: Joi.number().integer().required()
});

/**
 * Called by the route to validate filter records request.
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @param {Object} next The next object.
 */
exports.validate = (req, res, next) => {
  try {
    const validationResult = _schema.validate(req.body);
    if (validationResult.error) {
      throw new ApiError(400, validationResult.error);
    }
    next();
  } catch (err) {
    next(err);
  }
};
