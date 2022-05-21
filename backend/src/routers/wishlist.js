const { items } = require('../data/data');
const koaRouter = require('@koa/router');
const { customerAuth } = require('../middleware/auth');
const CartItem = require('../classes/CartItem');
const router = new koaRouter();

// add an item to the wishlist
router.post('/wishlist/addItem', customerAuth, (ctx) => {
    try {
        console.log('Adding item to wishlist');
        const reqItem = ctx.request.body.item;
        if (!reqItem) ctx.throw(400, 'item required');
        // find the item
        const item = new CartItem(reqItem);

        ctx.user.wishlist.push(item);
        ctx.body = { message: 'item added to wishlist', item }
        ctx.status = 201;
    } catch (e) {
        console.log(e);
        ctx.body = { error: e };
        ctx.status = 401;
    }
});

// remove an item from the wishlist
router.post('/wishlist/removeItem', customerAuth, (ctx) => {
    try {
        console.log(`Removing an item from the wishlist`);
        console.log({ user: ctx.user })
        const { name, quantity } = ctx.request.body.item;
        const wishlist = ctx.user.wishlist;

        const itemIndex = wishlist.findIndex(e => e.name === name && e.quantity === quantity);
        if (itemIndex < 0) throw new Error('item not found');
        ctx.user.wishlist = wishlist.splice(itemIndex, 1);
        // send the updated wishlist as the response
        ctx.body = { wishlist: ctx.user.getWishlist() }
    } catch (e) {
        console.log(e);
        ctx.body = { error: e.message }
        ctx.status = 401;
    }
});

// get public customer data
router.get('/wishlist/viewAll', customerAuth, (ctx) => {
    try {
        const user = ctx.user;
        ctx.body = { wishlist: user.getWishlist() }
    } catch (e) {
        console.log(e);
        ctx.body = { error: e };
        ctx.status = 401;
    }
});

router.post('/wishlist/moveToCart', customerAuth, (ctx) => {
    try {
        const user = ctx.user;
        if (!user) ctx.throw(401, 'user not found');

        const reqItem = ctx.request.body.item;
        if (!reqItem) ctx.throw(400, 'item required');

        // find the item from the wishlist
        const itemIndex = ctx.user.wishlist.findIndex((item) => item.name === reqItem.name && item.quantity === reqItem.quantity);
        if (itemIndex < 0) ctx.throw(400, 'item not found');
        else {
            let item = ctx.user.wishlist.splice(itemIndex, 1);
            item = item && item[0];
            ctx.user.cart.push(item);

            ctx.body = { wishlist: ctx.user.getWishlist() };
            ctx.status = 201;
        }
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;