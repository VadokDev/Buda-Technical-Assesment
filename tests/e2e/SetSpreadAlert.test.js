import { describe, it } from 'node:test';
import request from 'supertest';
import { app } from '../../src/app.js';

describe('Set spread alert test suite', async () => {
  await it('should get the btc-chile spread value', async () => {
    request(app)
      .put(`/spread/alert`)
      .send({ spread: 50 })
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
      });
  });
});
