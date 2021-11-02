// import * as fs from "fs";
// import { createCanvas, loadImage } from "canvas";
import { Builder } from "./interfaces/builder.interface";

class MasterBuilder implements Builder<MasterBuilder> {
  width = 2000;
  height = 2000;
  index = 1;
  attributes = [];
  imageStack = [];

  constructor(height: number, width: number) {
    this.height = height;
    this.width = width;
    console.log("her");
  }

  build() {
    return this;
  }
}

async function main() {
  const height = 1000;
  const width = 1000;
  return await new MasterBuilder(height, width).build();
}

main()
  // eslint-disable-next-line no-process-exit
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  });
