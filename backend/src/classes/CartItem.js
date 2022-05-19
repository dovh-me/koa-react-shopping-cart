const { items } = require("../data/data");

module.exports = class CartItem {
    constructor({ itemName, quantity }) {
        this.itemName = itemName;
        this.quantity = quantity;
    }

    /**
     * It does what it says, you donkey
     */
    purchase() {
        const item = items.get(this.itemName);
        if (!item) throw new Error('item not found');

        if ((item.quantity - this.quantity) >= 0) {
            item.quantity -= this.quantity;
            console.log(`${this.itemName} item purchased`);
        } else throw new Error('insufficient quantity in the inventory')
    }

    /**
     * Returns the real item with the latest data
     */
    getItem() {
        const itemName = this.itemName;
        return items.get(itemName);
    }
}