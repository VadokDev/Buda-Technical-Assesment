import { describe, it } from 'node:test';
import assert from 'node:assert';
import { SetSpreadAlert } from '../../../../src/usecases/SetSpreadAlert/SetSpreadAlert.js';

describe('SetSpreadAlert usecase test suite', async () => {
  await it('should save the given spread', (t) => {
    const marketRepositoryMock = {
      setAlert: t.mock.fn(),
    };

    const setSpreadAlert = new SetSpreadAlert(marketRepositoryMock);
    setSpreadAlert.execute({spread: 5});

    assert.deepStrictEqual(marketRepositoryMock.setAlert.mock.calls[0].arguments, [5]);
  });
});
