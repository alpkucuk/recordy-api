const express = require('express');
const RecordController = require('./record_controller');
const RecordValidator = require('./record_validator');

const router = express.Router();

/**
 * @swagger
 *
 *  /record:
 *    post:
 *      summary: Filter records
 *      description: Filter records by date and total count.
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                startDate:
 *                  type: string
 *                  description: Filter records created after this date which is in format YYYY-MM-DD
 *                endDate:
 *                  type: string
 *                  description: Filter records created before this date which is in format YYYY-MM-DD
 *                minCount:
 *                  type: integer
 *                  description: Filter records which total count is greater than minimum count.
 *                maxCount:
 *                  type: integer
 *                  description: Filter records which total count is less than maximum count.
 *              example:
 *                startDate: "2015-07-05"
 *                endDate: "2015-10-05"
 *                minCount: 4900
 *                maxCount: 5000
 *      responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  code:
 *                    type: integer
 *                    value: 0
 *                  msg:
 *                    type: string
 *                    default: Success
 *                  records:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        key:
 *                          type: string
 *                        createdAt:
 *                          type: string
 *                        totalCount:
 *                          type: integer
 *        400:
 *          description: Bad Request
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  code:
 *                    type: integer
 *                    value: 400
 *                    default: 400
 *                  msg:
 *                    type: string
 */
router
  .route('/')
  .post(RecordValidator.validate, RecordController.filterRecords);

module.exports = router;
