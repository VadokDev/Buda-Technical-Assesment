import { MarketMapper } from '../mappers/MarketMapper.js';
import { AppError } from '../entities/AppError.js';

export class MarketRepository {
  constructor(client, models) {
    this.client = client;
    this.models = models;
  }

  async getById(marketId) {
    try {
      const { data: rawMarket } = await this.client.get(
        `/markets/${marketId}/ticker`
      );

      const market = MarketMapper.toDomain(rawMarket.ticker);
      return market;
    } catch (err) {
      if (err.response?.status === 404) {
        return null;
      }

      AppError.create(err, 'MarketRepository', 'getById');
      throw err;
    }
  }

  async getAll() {
    try {
      const { data: rawMarketIds } = await this.client.get(`/markets`);
      const marketIds = rawMarketIds.markets.map(({ id }) => id);
      const marketPromises = marketIds.map((marketId) =>
        this.getById(marketId)
      );
      const markets = Promise.all(marketPromises);
      return markets;
    } catch (err) {
      AppError.create(err, 'MarketRepository', 'getById');
      throw err;
    }
  }

  setAlert(spread) {
    this.models.alertModel.setSpread(spread);
  }
}
