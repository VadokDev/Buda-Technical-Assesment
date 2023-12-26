import { describe, it } from 'node:test';
import assert from 'node:assert';
import { Market } from '../../../src/entities/Market.js';
import { MarketRepository } from '../../../src/repositories/MarketRepository.js';

describe('MarketRepository repository test suite', async () => {
  await it('should return a market by id', async (t) => {
    const mockResponse = {
      data: {
        ticker: {
          last_price: ['879789.0', 'CLP'],
          market_id: 'BTC-CLP',
          max_bid: ['879658.0', 'CLP'],
          min_ask: ['876531.11', 'CLP'],
          price_variation_24h: '0.005',
          price_variation_7d: '0.1',
          volume: ['102.0', 'BTC'],
        },
      },
    };

    const clientMock = {
      get: t.mock.fn(() => mockResponse),
    };

    const expected = new Market('BTC-CLP', 879658.0, 876531.11);
    const marketRepository = new MarketRepository(clientMock);

    const result = await marketRepository.getById('BTC-CLP');
    assert.deepStrictEqual(result, expected);
  });

  await it('should return null when market id does not exists', async (t) => {
    const clientMock = {
      get: t.mock.fn(() => {
        throw { response: { status: 404 } };
      }),
    };

    const marketRepository = new MarketRepository(clientMock);

    const result = await marketRepository.getById('BTC-CLP');
    assert.strictEqual(result, null);
  });

  await it('should return all markets info', async (t) => {
    const marketsResponseMock = {
      data: {
        markets: [
          {
            id: 'BTC-CLP',
            name: 'btc-clp',
            base_currency: 'BTC',
            quote_currency: 'CLP',
            minimum_order_amount: ['0.001', 'BTC'],
            taker_fee: '0.8',
            maker_fee: '0.4',
            max_orders_per_minute: 100,
            maker_discount_percentage: '0.0',
            taker_discount_percentage: '0.0',
          },
          {
            id: 'BTC-COP',
            name: 'btc-cop',
            base_currency: 'BTC',
            quote_currency: 'COP',
            minimum_order_amount: ['0.001', 'BTC'],
            taker_fee: '0.8',
            maker_fee: '0.4',
            max_orders_per_minute: 100,
            maker_discount_percentage: '0.0',
            taker_discount_percentage: '0.0',
          },
        ],
      },
    };

    const marketMock1 = {
      data: {
        "ticker": {
          "last_price": ["879789.0", "CLP"],
          "market_id": "BTC-CLP",
          "max_bid": ["879658.0", "CLP"],
          "min_ask": ["876531.11", "CLP"],
          "price_variation_24h": "0.005",
          "price_variation_7d": "0.1",
          "volume": ["102.0", "BTC"]
        }
      }
    }

    const marketMock2 = {
      data: {
        "ticker": {
          "last_price": ["879789.0", "COP"],
          "market_id": "BTC-COP",
          "max_bid": ["879658.0", "COP"],
          "min_ask": ["876531.11", "COP"],
          "price_variation_24h": "0.005",
          "price_variation_7d": "0.1",
          "volume": ["102.0", "BTC"]
        }
      }
    }

    const getMock = t.mock.fn();
    getMock.mock.mockImplementationOnce(() => marketsResponseMock, 0);
    getMock.mock.mockImplementationOnce(() => marketMock1, 1);
    getMock.mock.mockImplementationOnce(() => marketMock2, 2);

    const clientMock = {
      get: getMock
    };

    const expected = [new Market("BTC-CLP", 879658.0, 876531.11), new Market("BTC-COP", 879658.0, 876531.11)]

    const marketRepository = new MarketRepository(clientMock);
    const result = await marketRepository.getAll();

    assert.deepStrictEqual(result, expected);
  })

  await it('should throw an error when something fails', async (t) => {
    const clientMock = {
      get: t.mock.fn(() => {
        throw new Error('error');
      }),
    };

    const marketRepository = new MarketRepository(clientMock);
    assert.rejects(() => marketRepository.getById('BTC-CLP'));
    assert.rejects(() => marketRepository.getAll());
  });
});
