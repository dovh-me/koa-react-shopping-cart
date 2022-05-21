module.exports = class Item {
    static idNum = 0;
    static allowedFields = [
        'name', 'quantity', 'price', 'trader', 'promotionPtg'
    ];
    constructor({ trader, name, quantity, price, promotionPtg }) {
        this.id = `${Item.idNum}+${trader}`;
        this.name = name;
        this.quantity = +quantity;
        this.price = +price;
        this.trader = trader;
        this.promotionPtg = +promotionPtg;
        Item.idNum++;
    }

    updateItem(updateData) {
        console.log(`Updating item data: ${this.name}`);
        for (const key in updateData) {
            if (!updateData.hasOwnProperty(key)) continue;
            // throw an error if an invalid field is being updated
            if (!Item.allowedFields.includes(key)) throw new Error('Invalid field being updated');
            // if the fields is valid, update the data
            console.log(`Updating field ${key} - from: ${this[key]} to: ${updateData[key]}`);
            this[key] = updateData[key];
        }
    }
}