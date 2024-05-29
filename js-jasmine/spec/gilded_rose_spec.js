const {Shop, Item} = require('../src/gilded_rose.js');

describe("Gilded Rose", function() {

  it("should decrease quality and sellIn by 1 each day for normal items", function() {
    const gildedRose = new Shop([new Item("normal item", 10, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(19);
  });

  it("should not decrease quality below 0", function() {
    const gildedRose = new Shop([new Item("normal item", 10, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it("should increase quality of Aged Brie as it ages", function() {
    const gildedRose = new Shop([new Item("Aged Brie", 10, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(21);
  });

  it("should not increase quality above 50", function() {
    const gildedRose = new Shop([new Item("Aged Brie", 10, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
  });

  it("should not change quality of Sulfuras", function() {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 10, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(80);
    expect(items[0].sellIn).toBe(10);
  });

  it("should increase quality of Backstage passes by 2 when 10 days or less", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(22);
  });

  it("should increase quality of Backstage passes by 3 when 5 days or less", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(23);
  });

  it("should drop quality of Backstage passes to 0 after the concert", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it("should degrade quality of Conjured items twice as fast", function() {
    const gildedRose = new Shop([new Item("Conjured Mana Cake", 3, 6)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(4);
  });

  // Full test to verify multiple scenarios
  it("full test", () => {
    const items = [
      new Item("+5 Dexterity Vest", 10, 20),
      new Item("Aged Brie", 2, 0),
      new Item("Elixir of the Mongoose", 5, 7),
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 39),
      new Item("Conjured Mana Cake", 3, 6),
    ];

    const days = Number(process.argv[2]) || 2;
    const gildedRose = new Shop(items);

    for (let day = 0; day < days; day++) {
      console.log(`\n-------- day ${day} --------`);
      console.log("name, sellIn, quality");
      items.forEach(item => console.log(`${item.name}, ${item.sellIn}, ${item.quality}`));
      gildedRose.updateQuality();
    }
  });
});
