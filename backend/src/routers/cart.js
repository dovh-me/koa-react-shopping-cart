const { customers, items } = require('../data/data');

const koaRouter = require('@koa/router');
const { customerAuth } = require('../middleware/auth');
const router = new koaRouter();

// add an item to the cart
router.post('/cart/addItem', customerAuth, (ctx) => {
    try {
        const { itemName, quantity } = ctx.request.body;
        console.log('Adding item to cart');
        // find the item
        const item = items.get(itemName);
        if (!item) throw new Error('invalid item');

        if (item.quantity < quantity) throw new Error('insufficient stocks in the inventory');

    } catch (e) {
        console.log(e);
        ctx.body = { error: e };
        ctx.status = 401;
    }
});

// remove an item from the cart
router.delete('/cart/removeItem/:itemName', customerAuth, (ctx) => {
    try {
        console.log(`Removing an item from the cart`);
        const cart = ctx.user.cart;

    } catch (e) {
        console.log(e);
        ctx.body = { error: e.message }
        ctx.status = 401;
    }
});

// purchase list of items
router.post('/cart/purchase', customerAuth, (ctx) => {
    const user = customers.get(ctx.user.username);
    user.tokens.filter(e => e !== ctx.user.token);
});

// get public customer data
router.get('/cart/viewAll', customerAuth, (ctx) => {
    try {
        const user = ctx.user;
        ctx.body = { cart: user.cart }
    } catch (e) {
        console.log(e);
        ctx.body = { error: e };
        ctx.status = 401;
    }
});

module.exports = router;