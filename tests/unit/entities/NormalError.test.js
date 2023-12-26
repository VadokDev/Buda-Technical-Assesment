import { describe, it } from 'node:test';
import assert from 'node:assert';
import { NormalError } from '../../../src/entities/NormalError.js';

describe('NormalError entity test suite', async () => {
  await it('should trigger a console error when is created', (t) => {
    t.mock.method(console, 'error').mock.mockImplementation(() => {});
    new NormalError('', '', '', '');

    assert.strictEqual(console.error.mock.calls.length, 1);
  })
})