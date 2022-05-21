const { items } = require('../data/data');
const Person = require('./Person');

module.exports = class Customer extends Person {
    constructor(responseBody) {
        super(responseBody);
        this.wishlist = [];
        this.cart = [];
    }

    toPublicJson() {
        return super.toJson(['wishList', 'cart']);
    }

    getWishlist() {
        const wishlist = this.wishlist;
        return wishlist.map((item) => {
            const rawItem = item.getItem();
            if (!rawItem) throw new Error('item not found');
            console.log({ rawItem });
            return { ...rawItem, quantity: item.quantity }
        });
    }

    getCart() {
        const cart = this.cart;
        return cart.map((item) => {
            const rawItem = item.getItem();
            if (!rawItem) throw new Error('item not found');
            console.log({ rawItem });
            return { ...rawItem, quantity: item.quantity }
        });
    }
}