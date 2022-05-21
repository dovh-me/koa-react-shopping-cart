const { items } = require('../data/data');
const CartItem = require('../classes/CartItem');
const koaRouter = require('@koa/router');
const { customerAuth } = require('../middleware/auth');
const router = new koaRouter();

// add an item to the cart
router.post('/cart/addItem', customerAuth, (ctx) => {
    try {
        const { name, quantity } = ctx.request.body;
        console.log('Adding item to cart');
        // find the item
        const item = items.get(name);
        if (!item) return ctx.throw(401, 'invalid item');

        if (item.quantity < quantity) return ctx.throw(401, 'insufficient stocks in the inventory');

        ctx.user.cart.push(new CartItem({ name: item.name, quantity }));
        ctx.body = { message: 'Item added successfully' };
        ctx.status = 201;
    } catch (e) {
        console.log(e);
        ctx.body = { error: e };
        ctx.status = 401;
    }
});

// remove an item from the cart
router.post('/cart/removeItem', customerAuth, (ctx) => {
    try {
        console.log(`Removing an item from the cart`);
        const data = ctx.request.body;
        const cart = ctx.user.cart;
        console.log({ data });

        const itemIndex = cart.findIndex(e => (e.name === data.name) && (e.quantity == data.quantity));
        if (itemIndex < 0) throw new Error('item not found');
        console.log({ itemIndex });
        cart.splice(itemIndex, 1);
        // send the updated cart as the response
        ctx.body = { cart: ctx.user.getCart() }
        ctx.status = 201;
    } catch (e) {
        console.log(e);
        ctx.throw(401, e.message)
    }
});

// purchase list of items
router.post('/cart/purchase', customerAuth, (ctx) => {
    try {
        console.log('Purchasing item');
        const reqBody = ctx.request.body;
        const user = ctx.user;
        console.log({ items: reqBody.items })


        const userCart = user.cart
        // .filter((item) => reqBody.items.includes(item.name));

        const itemsPurchased = [];
        userCart.forEach((item) => {
            if (item.purchase()) {
                console.log('item purchase', item.name)
                itemsPurchased.push(item);
                // remove the purchase item from the user cart
                user.cart = user.cart.filter((e) => !(e.name === item.name));
            } else {
                console.log('item was not purchased', item.name);
            }
        });

        ctx.body = { cart: ctx.user.getCart(), itemsPurchased }
        ctx.status = 201;
    } catch (error) {
        console.log(error);
    }
});

// get public customer data
router.get('/cart/viewAll', customerAuth, (ctx) => {
    try {
        console.log('/cart/viewAll router - fetch cart request')
        const user = ctx.user;
        // get cart item details from the items map
        const cart = user.getCart();
        ctx.body = { cart }
    } catch (e) {
        console.log(e);
        ctx.body = { error: e };
        ctx.status = 401;
    }
});

module.exports = router;