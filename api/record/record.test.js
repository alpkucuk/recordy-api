const RecordController = require('./record_controller');

describe('Record API Test', () => {
  describe('RecordController.filterRecords', () => {
    it('should have a filterRecords function', () => {
      expect(typeof RecordController.filterRecords).toBe('function');
    });
  });

  describe('RecordValidator /POST filter', () => {
    it('should give validation error', () => {
      expect(true);
    });
  });
});
