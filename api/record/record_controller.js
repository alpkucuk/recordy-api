const Record = require('./record_model');

const kCreatedAt = 'createdAt';
const kTotalCount = 'totalCount';

/**
 * Filters records according to filter object.
 * Example filter object:
 *    {
 *      "startDate": "2019-11-18",
 *      "endDate": "2020-07-05",
 *      "minCount": 1000,
 *      "maxCount": 5000
 *    }
 * @param {Object} filter The filter object.
 * @returns {Array} Array of records.
 */
const _filterRecords = async (filter) => {
  // Do not include object id.
  const projection = {
    $project: {
      _id: 0,
      key: '$key',
      createdAt: '$createdAt',
      totalCount: { $sum: '$counts' }
    }
  };

  // Create date match
  let dateMatch = { createdAt: {} };
  if (filter.startDate) {
    dateMatch[kCreatedAt]['$gt'] = new Date(filter.startDate);
  }
  if (filter.endDate) {
    dateMatch[kCreatedAt]['$lt'] = new Date(filter.endDate);
  }

  // Create total count match.
  let totalCountMatch = { totalCount: {} };
  if (filter.minCount) {
    totalCountMatch[kTotalCount]['$gt'] = filter.minCount;
  }
  if (filter.maxCount) {
    totalCountMatch[kTotalCount]['$lt'] = filter.maxCount;
  }

  // Construct aggregation pipeline.
  let pipeline = [];
  // Add date macth if needed.
  if (Object.keys(dateMatch[kCreatedAt]).length) {
    pipeline.push({
      $match: { createdAt: dateMatch[kCreatedAt] }
    });
  }

  // Add projection stage.
  pipeline.push(projection);

  // Add totalCount macth if needed.
  if (Object.keys(totalCountMatch[kTotalCount]).length) {
    pipeline.push({
      $match: { totalCount: totalCountMatch[kTotalCount] }
    });
  }

  try {
    const result = await Record.aggregate(pipeline);
    return result;
  } catch (err) {
    console.error(err);
    throw new Error('Failed to fetch data from database.');
  }
};

/**
 * Called by the route when the user initiates a post request to filter records.
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * * @param {Object} next The next object.
 */
exports.filterRecords = async (req, res, next) => {
  try {
    const records = await _filterRecords(req.body);
    res.status(200).json({ code: 0, msg: 'Success', records });
  } catch (err) {
    next(err);
  }
};
