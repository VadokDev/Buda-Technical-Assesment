import { describe, it } from 'node:test';
import request from 'supertest';
import { app } from '../../src/app.js';

describe('Get spread by market test suite', async () => {
  await it('should get the btc-chile spread value', async () => {
    const marketId = 'BTC-CLP';
    request(app)
      .get(`/spread/${marketId}`)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
      });
  });
  
  await it('should return 404 for a non-existent market', async () => {
    const marketId = 'BTC-FAKE';
    request(app)
      .get(`/spread/${marketId}`)
      .expect(404)
      .end(function(err, res) {
        if (err) throw err;
      });
  });
});
