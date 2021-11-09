import * as items from "../../data/items.json";
import { getRandom } from "../utils/index";
import { Builder, Trait } from "../interfaces/index";

/**
 * A Generative Corgi Type.
 */
export class CorgiBuilder implements Builder<CorgiBuilder> {
  public readonly items = items;

  public BASE_ASSETS_PATH = `./assets`;
  public index = 0;

  public attribtues = [];
  public imageStack = [];

  public store: any = {};

  new(): this {
    this.attribtues = [];
    this.imageStack = [];

    // Trait Reset.
    Object.keys(this.store).forEach((key) => {
      this.store[key] = null;
    });
    return this;
  }

  select(trait: Trait) {
    const options = this.items[trait].items;
    const chance = this.items[trait].chance;
    let selectedOption = getRandom(options, chance);
    this.store[trait] = selectedOption;

    const path = selectedOption
      ? `${this.BASE_ASSETS_PATH}/${trait}__${selectedOption}`
      : null;
  }

  build() {
    this.new().select("background");
  }
}
