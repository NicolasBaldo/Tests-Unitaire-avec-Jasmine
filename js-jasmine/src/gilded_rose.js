class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}


class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach(item => {
      if (item.name === "Sulfuras, Hand of Ragnaros") return;

      item.sellIn -= 1;

      if (item.name.startsWith("Conjured")) {
        this.updateConjuredItem(item);
      } else {
        this.updateRegularItem(item);
      }

      if (item.quality < 0) item.quality = 0;
      if (item.quality > 50 && item.name !== "Sulfuras, Hand of Ragnaros") item.quality = 50;
    });

    return this.items;
  }

  updateConjuredItem(item) {
    if (item.sellIn >= 0) {
      item.quality -= 2;
    } else {
      item.quality -= 4;
    }
  }

  updateRegularItem(item) {
    if (item.name === "Aged Brie") {
      if (item.sellIn >= 0) {
        item.quality += 1;
      } else {
        item.quality += 2;
      }
    } else if (item.name.startsWith("Backstage passes")) {
      if (item.sellIn < 0) {
        item.quality = 0;
      } else if (item.sellIn <= 5) {
        item.quality += 3;
      } else if (item.sellIn <= 10) {
        item.quality += 2;
      } else {
        item.quality += 1;
      }
    } else {
      if (item.sellIn >= 0) {
        item.quality -= 1;
      } else {
        item.quality -= 2;
      }
    }
  }
}

module.exports = {
  Item,
  Shop
};
