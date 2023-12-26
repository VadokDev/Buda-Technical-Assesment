import { marketRepository } from '../../repositories/index.js';
import { GetSpreadByMarket } from './GetSpreadByMarket.js';
import { GetSpreadByMarketController } from './GetSpreadByMarketController.js';

const getSpreadByMarket = new GetSpreadByMarket(marketRepository);
const getSpreadByMarketController = new GetSpreadByMarketController(getSpreadByMarket);

export { getSpreadByMarket, getSpreadByMarketController }