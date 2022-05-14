module.exports = class Item {
    constructor(responseBody) {
        const { id, name, quantity } = responseBody;
        this.id = id;
        this.name = name;
        this.quantity = quantity;
    }
}