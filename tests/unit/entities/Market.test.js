import { describe, it } from 'node:test';
import assert from 'node:assert';
import { Market } from '../../../src/entities/Market.js';

describe('Market entity test suite', async () => {
  await it('should calculate spread from a given market', () => {
    const market = new Market('test_market', 100, 200);
    const expected = 100;
    const spread = market.getSpread();
    
    assert.equal(spread, expected);
  })
  
  await it('should return their correct id', () => {
    const market = new Market('test_market', 100, 200);
    const expected = 'test_market';
    const marketId = market.getId();
    
    assert.strictEqual(marketId, expected);
  })
})