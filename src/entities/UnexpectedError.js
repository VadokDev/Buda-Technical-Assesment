import { UNEXPECTED_ERROR } from '../utils/constants.js';

export class UnexpectedError {
  constructor(err, entity, method) {
    this.err = err;
    this.entity = entity;
    this.method = method;
    this.type = UNEXPECTED_ERROR;
    
    console.error(err, entity, method, UNEXPECTED_ERROR);
  }
}
