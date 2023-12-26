import { marketRepository } from '../../repositories/index.js';
import { GetSpreadAllMarkets } from './GetSpreadAllMarkets.js';
import { GetSpreadAllMarketsController } from './GetSpreadAllMarketsController.js';

const getSpreadAllMarkets = new GetSpreadAllMarkets(marketRepository);
const getSpreadAllMarketsController = new GetSpreadAllMarketsController(
  getSpreadAllMarkets
);

export { getSpreadAllMarkets, getSpreadAllMarketsController };
