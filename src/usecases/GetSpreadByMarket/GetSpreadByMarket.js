import { AppError } from '../../entities/AppError.js';
import { MARKET_NOT_FOUND } from '../../utils/constants.js';

export class GetSpreadByMarket {
  constructor(marketRepository) {
    this.marketRepository = marketRepository;
  }

  async execute({ marketId }) {
    try {
      const market = await this.marketRepository.getById(marketId);

      if (!market) {
        return AppError.create(
          `The market with id ${marketId} does not exists`,
          'GetSpreadByMarket',
          'execute',
          MARKET_NOT_FOUND
        );
      }

      const result = {
        spread: market.getSpread(),
      };

      return result;
    } catch (err) {
      AppError.create(err, 'GetSpreadByMarket', 'execute');
      throw err;
    }
  }
}
