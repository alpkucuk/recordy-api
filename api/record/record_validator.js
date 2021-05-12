const Joi = require('joi');
const ApiError = require('./../../util/api_error');

const kSchema = Joi.object().keys({
  startDate: Joi.date().iso(),
  endDate: Joi.date().iso(),
  minCount: Joi.number().integer(),
  maxCount: Joi.number().integer()
});

/**
 * Called by the route to validate filter records request.
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @param {Object} next The next object.
 */
exports.validate = (req, res, next) => {
  try {
    const validationResult = kSchema.validate(req.body);
    if (validationResult.error) {
      throw new ApiError(400, validationResult.error);
    }
    next();
  } catch (err) {
    next(err);
  }
};
