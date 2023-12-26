
export class SetSpreadAlert {
  constructor(marketRepository) {
    this.marketRepository = marketRepository;
  }

  execute({spread}) {
    this.marketRepository.setAlert(spread);
  }
}