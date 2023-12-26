import { AppError } from '../../entities/AppError.js';

export class GetSpreadAllMarkets {
  constructor(marketRepository) {
    this.marketRepository = marketRepository;
  }

  async execute() {
    try {
      const markets = await this.marketRepository.getAll();
      const spreads = markets.map((market) => ({
        market: market.getId(),
        spread: market.getSpread(),
      }));
      return spreads;
    } catch (err) {
      AppError.create(err, 'GetSpreadAllMarkets', 'execute');
      throw err;
    }
  }
}
