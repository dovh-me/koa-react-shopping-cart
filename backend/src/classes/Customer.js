const { items } = require('../data/data');
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

    getWishlist() {
        const wishlist = this.wishList;
        return wishlist.map((item) => items.get(item));
    }

    getCart() {
        const cart = this.cart;
        return cart.map((item) => {
            const rawItem = items.get(item.name);
            return { ...rawItem, quantity: item.quantity }
        });
    }
}