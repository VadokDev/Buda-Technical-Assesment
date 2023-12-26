import { Market } from '../entities/Market.js';

export class MarketMapper {
  static toDomain(raw) {
    return new Market(raw.market_id, parseFloat(raw.max_bid[0]), parseFloat(raw.min_ask[0]));
  }
}
