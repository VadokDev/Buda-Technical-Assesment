import { describe, it } from 'node:test';
import assert from 'node:assert';
import { GetSpreadByMarket } from '../../../../src/usecases/GetSpreadByMarket/GetSpreadByMarket.js';
import { Market } from '../../../../src/entities/Market.js';
import { NormalError } from '../../../../src/entities/NormalError.js';

describe('GetSpreadByMarket usecase test suite', async () => {
  await it('should return the spread of a given market when it exists', async (t) => {
    const getByIdMock = new Market('id1', 100.0, 100.0);
    const marketRepositoryMock = {
      getById: t.mock.fn(() => getByIdMock),
    };

    const getSpreadByMarket = new GetSpreadByMarket(marketRepositoryMock);

    const expected = { spread: 0 };
    const result = await getSpreadByMarket.execute({ marketId: 'test' });

    assert.deepStrictEqual(result, expected);
  });

  await it('should return an error when the marketId does not exists', async (t) => {
    const getByIdMock = null;
    const marketRepositoryMock = {
      getById: t.mock.fn(() => getByIdMock),
    };

    const getSpreadByMarket = new GetSpreadByMarket(marketRepositoryMock);

    const expected = { spread: 0 };
    const result = await getSpreadByMarket.execute({ marketId: 'fake' });

    assert.strictEqual(result instanceof NormalError, true);
  });

  await it('should throw an error when something fails', async (t) => {
    const marketRepositoryMock = {
      getById: t.mock.fn(() => {
        throw new Error('error');
      }),
    };

    const getSpreadByMarket = new GetSpreadByMarket(marketRepositoryMock);

    assert.rejects(() => getSpreadByMarket.execute({ marketId: 'error' }));
  });
});
