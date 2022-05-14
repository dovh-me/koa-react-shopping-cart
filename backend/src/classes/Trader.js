module.exports = class Trader extends Person {
    constructor(responseBody) {
        super(responseBody);
        this.wishList = [];
        this.cart = [];
    }

    toPublicJson() {
        super.toJson(['inventory']);
    }
}