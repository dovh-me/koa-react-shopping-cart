module.exports = class Item {
    static idNum = 0;
    static allowedFields = [
        'id', 'name', 'quantity', 'trader'
    ];
    constructor({ trader, name, quantity }) {
        this.id = `${Item.idNum}+${trader}`;
        this.name = name;
        this.quantity = quantity;
        this.trader = trader;
        Item.idNum++;
    }

    updateItem(updateData) {
        for (const key in updateData) {
            if (!updateData.hasOwnProperty(key)) continue;
            // throw an error if an invalid field is being updated
            if (!Item.allowedFields.includes(key)) throw new Error('Invalid field being updated');
            // if the fields is valid, update the data
            this[key] = updateData[key];
        }
    }
}