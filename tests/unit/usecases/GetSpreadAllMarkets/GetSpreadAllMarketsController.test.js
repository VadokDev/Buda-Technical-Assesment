import { describe, it } from 'node:test';
import assert from 'node:assert';
import { GetSpreadAllMarketsController } from '../../../../src/usecases/GetSpreadAllMarkets/GetSpreadAllMarketsController.js';

describe('GetSpreadAllMarketsController controller test suite', async () => {
  await it('should respond with spreads and their respective market id when everything is ok', async (t) => {
    const getAllMock = [
      { market: 'id1', spread: 0 },
      { market: 'id2', spread: 50 },
    ];

    const useCaseMock = {
      execute: t.mock.fn(() => getAllMock),
    };

    const resMock = {
      status: t.mock.fn(() => {
        return resMock;
      }),
      send: t.mock.fn(() => {
        return resMock;
      }),
    };

    const getSpreadAllMarketsController = new GetSpreadAllMarketsController(
      useCaseMock
    );

    const expected = {
      status: 'success',
      spreads: [
        { market: 'id1', spread: 0.0 },
        { market: 'id2', spread: 50.0 },
      ],
    };

    await getSpreadAllMarketsController.executeImpl({}, resMock);
    assert.deepStrictEqual(resMock.status.mock.calls[0].arguments, [200]);
    assert.deepStrictEqual(resMock.send.mock.calls[0].arguments, [expected]);
  });

  await it('should respond with 500 when something fails', async (t) => {
    const useCaseMock = {
      execute: t.mock.fn(() => {
        throw new Error('error');
      }),
    };

    const getSpreadAllMarketsController = new GetSpreadAllMarketsController(
      useCaseMock
    );

    const resMock = {
      status: t.mock.fn(() => {
        return resMock;
      }),
      send: t.mock.fn(() => {
        return resMock;
      }),
    };

    await getSpreadAllMarketsController.executeImpl({}, resMock);
    assert.deepStrictEqual(resMock.status.mock.calls[0].arguments, [500]);
    assert.strictEqual(resMock.status.mock.calls.length, 1);
  });
});
