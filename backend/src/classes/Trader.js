const Person = require('./Person');
const { items } = require('../data/data');

module.exports = class Trader extends Person {
    constructor(responseBody) {
        super(responseBody);
    }

    toPublicJson() {
        super.toJson(['inventory']);
    }

    getInventory() {
        const traderName = this.username;
        const itemValues = Array.from(items.values());
        return itemValues.filter((item) => item.trader === traderName);
    }
}