import { describe, it } from 'node:test';
import assert from 'node:assert';
import { GetSpreadByMarketController } from '../../../../src/usecases/GetSpreadByMarket/GetSpreadByMarketController.js';
import { AppError } from '../../../../src/entities/AppError.js';
import { MARKET_NOT_FOUND } from '../../../../src/utils/constants.js';

describe('GetSpreadByMarketController controller test suite', async () => {
  await it('should respond with the market spread', async (t) => {
    const useCaseMock = {
      execute: t.mock.fn(() => ({ spread: 0 })),
    };

    const resMock = {
      status: t.mock.fn(() => {
        return resMock;
      }),
      send: t.mock.fn(() => {
        return resMock;
      }),
    };

    const expected = {
      status: 'success',
      spread: 0,
    };

    const reqMock = { params: { marketId: 'test' } };
    const getSpreadByMarketController = new GetSpreadByMarketController(
      useCaseMock
    );

    await getSpreadByMarketController.executeImpl(reqMock, resMock);
    assert.deepStrictEqual(resMock.status.mock.calls[0].arguments, [200]);
    assert.deepStrictEqual(resMock.send.mock.calls[0].arguments, [expected]);
  });

  await it('should respond with 400 when market id is not given', async (t) => {
    const resMock = {
      status: t.mock.fn(() => {
        return resMock;
      }),
      send: t.mock.fn(() => {
        return resMock;
      }),
    };

    const expected = {
      status: 'error',
      message: 'Market id not given',
    };

    const reqMock = { params: {} };
    const getSpreadByMarketController = new GetSpreadByMarketController({});

    await getSpreadByMarketController.executeImpl(reqMock, resMock);
    assert.deepStrictEqual(resMock.status.mock.calls[0].arguments, [400]);
    assert.deepStrictEqual(resMock.send.mock.calls[0].arguments, [expected]);
  });

  await it('should respond with error when the market id is not found', async (t) => {
    const useCaseMock = {
      execute: t.mock.fn(() =>
        AppError.create(
          `The market with id fake does not exists`,
          'GetSpreadByMarket',
          'execute',
          MARKET_NOT_FOUND
        )
      ),
    };

    const resMock = {
      status: t.mock.fn(() => {
        return resMock;
      }),
      send: t.mock.fn(() => {
        return resMock;
      }),
    };

    const expected = {
      status: 'error',
      message: 'Market id not found',
    };

    const reqMock = { params: { marketId: 'fake' } };
    const getSpreadByMarketController = new GetSpreadByMarketController(
      useCaseMock
    );

    await getSpreadByMarketController.executeImpl(reqMock, resMock);
    assert.deepStrictEqual(resMock.status.mock.calls[0].arguments, [404]);
    assert.deepStrictEqual(resMock.send.mock.calls[0].arguments, [expected]);
  });

  await it('should respond with 520 when an no controlled error occurs', async (t) => {
    const useCaseMock = {
      execute: t.mock.fn(() =>
        AppError.create(
          `test error message`,
          'GetSpreadByMarket',
          'execute',
          'UNCONTROLLED_ERROR'
        )
      ),
    };

    const resMock = {
      status: t.mock.fn(() => {
        return resMock;
      }),
      send: t.mock.fn(() => {
        return resMock;
      }),
    };

    const expected = {
      status: 'error',
      message: 'Unknown error',
    };

    const reqMock = { params: { marketId: 'fake' } };
    const getSpreadByMarketController = new GetSpreadByMarketController(
      useCaseMock
    );

    await getSpreadByMarketController.executeImpl(reqMock, resMock);
    assert.deepStrictEqual(resMock.status.mock.calls[0].arguments, [520]);
    assert.deepStrictEqual(resMock.send.mock.calls[0].arguments, [expected]);
  });

  await it('should respond with 500 when something fails', async (t) => {
    const useCaseMock = {
      execute: t.mock.fn(() => {
        throw new Error('error');
      }),
    };

    const resMock = {
      status: t.mock.fn(() => {
        return resMock;
      }),
      send: t.mock.fn(() => {
        return resMock;
      }),
    };

    const reqMock = { params: { marketId: 'test '} };
    const getSpreadByMarketController = new GetSpreadByMarketController(useCaseMock);

    await getSpreadByMarketController.executeImpl(reqMock, resMock);
    assert.deepStrictEqual(resMock.status.mock.calls[0].arguments, [500]);
    assert.deepStrictEqual(resMock.send.mock.calls.length, 1);
  });
});
