import { describe, it } from 'node:test';
import assert from 'node:assert';
import { AppError } from '../../../src/entities/AppError.js';
import { NormalError } from '../../../src/entities/NormalError.js';
import { UnexpectedError } from '../../../src/entities/UnexpectedError.js';

describe('AppError entity test suite', async () => {
  await it('should instantiate a NormalError', (t) => {
    t.mock.method(console, 'error').mock.mockImplementation(() => {});
    const appError = AppError.create('', '', '', 'TEST_TYPE_ERROR');

    assert.strictEqual(appError instanceof NormalError, true);
  });

  await it('should instantiate an UnexpectedError', (t) => {
    t.mock.method(console, 'error').mock.mockImplementation(() => {});
    const appError = AppError.create('', '', '');
    assert.strictEqual(appError instanceof UnexpectedError, true);
  });
});
