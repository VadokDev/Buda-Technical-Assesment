import { describe, it } from 'node:test';
import assert from 'node:assert';
import { SetSpreadAlertController } from '../../../../src/usecases/SetSpreadAlert/SetSpreadAlertController.js';

describe('SetSpreadAlertController controller test suite', async () => {
  await it('should update the spread value', (t) => {
    const useCaseMock = {
      execute: t.mock.fn(),
    };

    const resMock = {
      status: t.mock.fn(() => {
        return resMock;
      }),
      send: t.mock.fn(() => {
        return resMock;
      }),
    };

    const expected = { status: 'success' };
    const newSpread = { spread: 50 };
    const reqMock = { body: newSpread };

    const setSpreadAlertController = new SetSpreadAlertController(useCaseMock);
    setSpreadAlertController.executeImpl(reqMock, resMock);

    assert.deepStrictEqual(useCaseMock.execute.mock.calls[0].arguments, [
      newSpread,
    ]);
    assert.deepStrictEqual(resMock.status.mock.calls[0].arguments, [200]);
    assert.deepStrictEqual(resMock.send.mock.calls[0].arguments, [expected]);
  });

  await it('should responde with error when spread value is not given', (t) => {
    const resMock = {
      status: t.mock.fn(() => {
        return resMock;
      }),
      send: t.mock.fn(() => {
        return resMock;
      }),
    };

    const expected = { status: 'error', message: 'Spread value not given' };
    const reqMock = { body: {} };

    const setSpreadAlertController = new SetSpreadAlertController({});
    setSpreadAlertController.executeImpl(reqMock, resMock);

    assert.deepStrictEqual(resMock.status.mock.calls[0].arguments, [400]);
    assert.deepStrictEqual(resMock.send.mock.calls[0].arguments, [expected]);
  });
});
