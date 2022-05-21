const { items } = require("../data/data");

module.exports = class CartItem {
    constructor({ name, quantity }) {
        this.name = name;
        this.quantity = quantity;
    }

    /**
     * It does what it says, you donkey
     */
    purchase() {
        const item = this.getItem();
        if (!item) throw new Error('item not found');

        if ((item.quantity - this.quantity) >= 0) {
            item.quantity -= this.quantity;
            console.log(`${this.name} item purchased`);
            return true;
        } else throw new Error('insufficient quantity in the inventory')
    }

    /**
     * Returns the real item with the latest data
     */
    getItem() {
        const itemName = this.name;
        return items.get(itemName);
    }
}