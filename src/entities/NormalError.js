export class NormalError {
  constructor(err, entity, method, type) {
    this.err = err;
    this.entity = entity;
    this.method = method;
    this.type = type;
    
    console.error(err, entity, method, type);
  }
}
