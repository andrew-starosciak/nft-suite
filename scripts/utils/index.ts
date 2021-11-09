export const getRandom = function (items: string[], odds: any) {
  if (odds.length === 0) {
    return items[Math.floor(Math.random() * items.length)];
  } else {
    const rnd = Math.floor(Math.random() * 100);
    let counter = 0;
    for (let i = 0; i < odds.length; i++) {
      counter += odds[i] * 100;
      if (counter > rnd) {
        return items[i];
      }
    }
  }
};

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function formatValue(string: string) {
  console.log("🚀 | formatValue | string", string);
  if (string) {
    string = string.replace("_", " ");
    string = capitalizeFirstLetter(string);
    return string;
  }
}
