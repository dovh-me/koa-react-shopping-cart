const Person = require('./Person');

module.exports = class Customer extends Person {
    constructor(responseBody) {
        super(responseBody);
        this.wishList = [];
        this.cart = [];
    }

    toPublicJson() {
        super.toJson(['wishList', 'cart']);
    }
}