import { AppError } from '../../entities/AppError.js';

export class GetSpreadAllMarketsController {
  constructor(useCase) {
    this.useCase = useCase;
  }

  async executeImpl(req, res) {
    try {
      const result = await this.useCase.execute();
      return res.status(200).send({
        status: 'success',
        spreads: result
      });
    } catch (err) {
      AppError.create(err, 'GetSpreadByMarketController', 'executeImpl');
      res.status(500).send();
    }
  }
}
