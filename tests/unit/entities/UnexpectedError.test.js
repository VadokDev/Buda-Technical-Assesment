import { describe, it } from 'node:test';
import assert from 'node:assert';
import { UnexpectedError } from '../../../src/entities/UnexpectedError.js';

describe('UnexpectedError entity test suite', async () => {
  await it('should trigger a console error when is created', (t) => {
    t.mock.method(console, 'error').mock.mockImplementation(() => {});
    new UnexpectedError('', '', '');

    assert.strictEqual(console.error.mock.calls.length, 1);
  });
});
