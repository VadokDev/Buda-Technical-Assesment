import { AppError } from '../../entities/AppError.js';
import { NormalError } from '../../entities/NormalError.js';
import { MARKET_NOT_FOUND } from '../../utils/constants.js';

export class GetSpreadByMarketController {
  constructor(useCase) {
    this.useCase = useCase;
  }

  async executeImpl(req, res) {
    if (!req.params.marketId) {
      return res
        .status(400)
        .send({ status: 'error', message: 'Market id not given' });
    }

    try {
      const dto = {
        marketId: req.params.marketId,
      };
      
      const result = await this.useCase.execute(dto);

      if (result instanceof NormalError) {
        if (result.type === MARKET_NOT_FOUND) {
          res
            .status(404)
            .send({ status: 'error', message: 'Market id not found' });
        }

        return res.status(520).send({status: 'error', message: 'Unknown error'});
      }
      
      return res.status(200).send({
        status: 'success',
        ...result,
      });
    } catch (err) {
      AppError.create(err, 'GetSpreadByMarketController', 'executeImpl');
      res.status(500).send();
    }
  }
}
