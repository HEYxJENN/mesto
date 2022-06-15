import { config } from "../utils/config";

export class Card {
  constructor(name, link, config) {
    _this.name = name;
    _this.link = link;
    _this.alt = name;
    _this.nameMaybe = config.nameMaybe;
  }
}
