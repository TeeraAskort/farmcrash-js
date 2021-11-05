export default class Player {
  constructor(id, name, crops, workers, items, money, lastTimePlayed) {
    this.id = id;
    this.name = name;
    this.crops = crops;
    this.workers = workers;
    this.items = items;
    this.money = money;
    this.lastTimePlayed = lastTimePlayed;
  }
}
