export class SetSpreadAlertController {
  constructor(useCase) {
    this.useCase = useCase;
  }

  executeImpl(req, res) {
    if (!req.body.spread) {
      return res
        .status(400)
        .send({ status: 'error', message: 'Spread value not given' });
    }

    const dto = {
      spread: req.body.spread,
    };

    this.useCase.execute(dto);
    return res.status(200).send({ status: 'success' });
  }
}
