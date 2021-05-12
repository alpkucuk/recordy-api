const httpMocks = require('node-mocks-http');
const ApiError = require('./../../util/api_error');
const RecordValidator = require('./record_validator');

// Mock for trace constructor calls for ApiError class.
jest.mock('./../../util/api_error');

describe('Record API Unit Test', () => {
  describe('RecordValidator.validate', () => {
    beforeEach(() => {
      // Clear all instances and calls to constructor and all methods.
      ApiError.mockClear();
    });

    it('invalid startDate, should give validation error', () => {
      const req = httpMocks.createRequest();
      const next = jest.fn();
      req.body = {
        startDate: 'invalid date format',
        endDate: '2012-01-18',
        minCount: 0,
        maxCount: 500
      };
      RecordValidator.validate(req, httpMocks.createResponse(), next);
      expect(ApiError).toHaveBeenCalledTimes(1);
    });

    it('invalid minCount, should give validation error', () => {
      const req = httpMocks.createRequest();
      const next = jest.fn();
      req.body = {
        startDate: '2011-12-05',
        endDate: '2012-01-18',
        minCount: 'minCountAsString',
        maxCount: 500
      };
      RecordValidator.validate(req, httpMocks.createResponse(), next);
      expect(ApiError).toHaveBeenCalledTimes(1);
    });

    it('missing endDate parameter, should give validation error', () => {
      const req = httpMocks.createRequest();
      const next = jest.fn();
      req.body = {
        startDate: '2011-12-05',
        minCount: '0',
        maxCount: 500
      };
      RecordValidator.validate(req, httpMocks.createResponse(), next);
      expect(ApiError).toHaveBeenCalledTimes(1);
    });

    it('Extra parameter not allowed, should give validation error', () => {
      const req = httpMocks.createRequest();
      const next = jest.fn();
      req.body = {
        startDate: '2011-12-05',
        endDate: '2012-01-18',
        minCount: '0',
        maxCount: 500,
        extra: 9000
      };
      RecordValidator.validate(req, httpMocks.createResponse(), next);
      expect(ApiError).toHaveBeenCalledTimes(1);
    });

    it('all parameters are valid, should validate successfully', () => {
      const req = httpMocks.createRequest();
      const next = jest.fn();
      req.body = {
        startDate: '2011-12-05',
        endDate: '2012-01-18',
        minCount: 0,
        maxCount: 500
      };
      RecordValidator.validate(req, httpMocks.createResponse(), next);
      expect(ApiError).toHaveBeenCalledTimes(0);
    });
  });
});
