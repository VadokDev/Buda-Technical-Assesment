export class Market {
  constructor(id, maxBid, minAsk) {
    this.id = id;
    this.maxBid = maxBid;
    this.minAsk = minAsk;
  }

  getId() {
    return this.id;
  }

  getSpread() {
    return this.minAsk - this.maxBid;
  }
}
