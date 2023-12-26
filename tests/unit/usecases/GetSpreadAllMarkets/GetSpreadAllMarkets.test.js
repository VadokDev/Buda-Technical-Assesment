import { describe, it } from 'node:test';
import assert from 'node:assert';
import { Market } from '../../../../src/entities/Market.js';
import { GetSpreadAllMarkets } from '../../../../src/usecases/GetSpreadAllMarkets/GetSpreadAllMarkets.js';

describe('GetSpreadAllMarkets usecase test suite', async () => {
  await it('should return a list of spreads by market', async (t) => {
    const getAllMock = [
      new Market('id1', 100.0, 100.0),
      new Market('id2', 100.0, 150.0),
    ];

    const marketRepositoryMock = {
      getAll: t.mock.fn(() => getAllMock),
    };

    const expected = [
      { market: 'id1', spread: 0.0 },
      { market: 'id2', spread: 50.0 },
    ];

    const getSpreadAllMarkets = new GetSpreadAllMarkets(marketRepositoryMock);
    const result = await getSpreadAllMarkets.execute();
    assert.deepStrictEqual(result, expected);
  });

  await it('should thrown an error when something fails', async (t) => {
    const marketRepositoryMock = {
      getAll: t.mock.fn(() => {
        throw new Error('error');
      }),
    };

    const getSpreadAllMarkets = new GetSpreadAllMarkets(marketRepositoryMock);
    assert.rejects(() => getSpreadAllMarkets.execute());
  });
});
