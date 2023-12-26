import { describe, it } from 'node:test';
import assert from 'node:assert';
import { MarketMapper } from '../../../src/mappers/MarketMapper.js';
import { Market } from '../../../src/entities/Market.js';

describe('MarketMapper mapper test suite', async () => {
  await it('should return a Market from raw data', () => {
    const expected = new Market('id', 123.5, 123.5);
    const rawMarket = {
      market_id: 'id',
      max_bid: ['123.5', 'CLP'],
      min_ask: ['123.5', 'CLP']
    };

    const market = MarketMapper.toDomain(rawMarket);
    assert.deepStrictEqual(market, expected);
    assert.strictEqual(market instanceof Market, true);
  });
})