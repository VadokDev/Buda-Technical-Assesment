import { UnexpectedError } from "./UnexpectedError.js";
import { NormalError } from "./NormalError.js";

export class AppError {
  static create(err, entity, method, type) {
    if (!type) {
      return new UnexpectedError(err, entity, method);
    }
    return new NormalError(err, entity, method, type);
  }
}
