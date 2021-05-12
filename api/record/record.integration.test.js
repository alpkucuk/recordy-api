const request = require('supertest');
const app = require('./../../index');

describe('Record API Integration Test', () => {
  describe('POST api/v1/record', () => {
    it('should return 400 when extra parameter is passed', async () => {
      const response = await request(app)
        .post('/api/v1/record')
        .send({
          extra: 9000
        })
        .expect(400);

      expect(response.body).toEqual({
        code: 400,
        msg: expect.any(String)
      });
    });

    it('should return 404 for some unknown route', async () => {
      const response = await request(app)
        .post('/api/v1/unknown')
        .send({
          startDate: '2012-05-17',
          endDate: '2013-05-17',
          minCount: 100,
          maxCount: 200
        })
        .expect(404);

      expect(response.body).toEqual({
        code: 404,
        msg: expect.any(String)
      });
    });
  });
});
