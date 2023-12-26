import { Router } from 'express';
import { getSpreadByMarketController } from '../usecases/GetSpreadByMarket/index.js';
import { getSpreadAllMarketsController } from '../usecases/GetSpreadAllMarkets/index.js';
import { setSpreadAlertController } from '../usecases/SetSpreadAlert/index.js';

const spreadRouter = Router();

spreadRouter.get('/:marketId', (req, res) =>
  getSpreadByMarketController.executeImpl(req, res)
);

spreadRouter.get('/', (req, res) =>
  getSpreadAllMarketsController.executeImpl(req, res)
);

spreadRouter.put('/alert', (req, res) =>
  setSpreadAlertController.executeImpl(req, res)
);

export { spreadRouter };
