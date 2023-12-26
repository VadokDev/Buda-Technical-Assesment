import { describe, it } from 'node:test';
import request from 'supertest';
import { app } from '../../src/app.js';

describe('Get spread for all markets test suite', async () => {
  await it('should get the spread value for all markets', async () => {
    request(app)
      .get(`/spread`)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
      });
  });
});
