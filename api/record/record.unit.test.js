const httpMocks = require('node-mocks-http');
const ApiError = require('./../../util/api_error');
const Record = require('./record_model');
const RecordController = require('./record_controller');
const RecordValidator = require('./record_validator');

// Mock for trace constructor calls for ApiError class.
jest.mock('./../../util/api_error');

// Mock model aggregate function.
Record.aggregate = jest.fn();

let req, res, next;
beforeAll(() => {
  res = httpMocks.createResponse();
  next = jest.fn();
});

// Mock data
const filteredRecords = [
  {
    key: 'ABC',
    createdAt: '2017-01-28T01:22:14.398Z',
    totalCount: 190
  },
  {
    key: 'DEF',
    createdAt: '2017-01-28T01:22:14.398Z',
    totalCount: 300
  }
];

describe('Record API Unit Test', () => {
  describe('RecordValidator.validate', () => {
    beforeEach(() => {
      // Clear all instances and calls to constructor and all methods.
      ApiError.mockClear();
      req = httpMocks.createRequest();
      jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    it('invalid startDate, should give validation error', () => {
      req.body = {
        startDate: 'invalid date format',
        endDate: '2012-01-18',
        minCount: 0,
        maxCount: 500
      };
      RecordValidator.validate(req, res, next);
      expect(ApiError).toHaveBeenCalledTimes(1);
    });

    it('invalid minCount, should give validation error', () => {
      req.body = {
        startDate: '2011-12-05',
        endDate: '2012-01-18',
        minCount: 'minCountAsString',
        maxCount: 500
      };
      RecordValidator.validate(req, res, next);
      expect(ApiError).toHaveBeenCalledTimes(1);
    });

    it('Extra parameter not allowed, should give validation error', () => {
      req.body = {
        startDate: '2011-12-05',
        endDate: '2012-01-18',
        minCount: 0,
        maxCount: 500,
        extra: 9000
      };
      RecordValidator.validate(req, res, next);
      expect(ApiError).toHaveBeenCalledTimes(1);
    });

    it('all parameters are missing, should validate successfully', () => {
      RecordValidator.validate(req, res, next);
      expect(ApiError).toHaveBeenCalledTimes(0);
    });

    it('all parameters are valid, should validate successfully', () => {
      req.body = {
        startDate: '2011-12-05',
        endDate: '2012-01-18',
        minCount: 0,
        maxCount: 500
      };
      RecordValidator.validate(req, res, next);
      expect(ApiError).toHaveBeenCalledTimes(0);
    });
  });

  describe('RecordController.filterRecords', () => {
    it('Error during fetching data from DB', async () => {
      const errorMessage = { message: 'Failed to fetch data from DB.' };
      const rejectedPromise = Promise.reject(errorMessage);
      Record.aggregate.mockReturnValue(rejectedPromise);
      await RecordController.filterRecords(req, res, next);
      expect(next).toHaveBeenCalledWith(errorMessage);
    });

    it('should return filtered records', async () => {
      Record.aggregate.mockReturnValue(filteredRecords);
      await RecordController.filterRecords(req, res, next);
      expect(res.statusCode).toBe(200);
      expect(res._isEndCalled()).toBeTruthy();
      expect(res._getJSONData()).toStrictEqual({
        code: 0,
        msg: 'Success',
        records: filteredRecords
      });
    });
  });
});
