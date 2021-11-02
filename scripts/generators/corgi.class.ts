import { Builder } from "../interfaces/builder.interface";

export class CorgiBuilder implements Builder<CorgiBuilder> {
  BASE_ASSETS_PATH = `./assets`;
  index = 0;

  attribtues = [];
  imageStack = [];

  store = {};

  build() {}
}
