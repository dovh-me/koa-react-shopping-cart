const { items } = require('../data/data');
const koaRouter = require('@koa/router');
const { customerAuth } = require('../middleware/auth');
const router = new koaRouter();

// add an item to the wishList
router.post('/wishList/addItem', customerAuth, (ctx) => {
    try {
        const { itemName } = ctx.request.body;
        console.log('Adding item to wishList');
        // find the item
        const item = items.get(itemName);
        if (!item) return ctx.throw(401, 'invalid item');

        ctx.user.wishList.push(item.name);
    } catch (e) {
        console.log(e);
        ctx.body = { error: e };
        ctx.status = 401;
    }
});

// remove an item from the wishList
router.delete('/wishList/removeItem/:itemName', customerAuth, (ctx) => {
    try {
        console.log(`Removing an item from the wishList`);
        const itemName = ctx.params.itemName;
        const wishList = ctx.user.wishList;

        const itemIndex = wishList.findIndex(e => e.itemName === itemName);
        if (itemIndex < -1) throw new Error('item not found');
        ctx.user.wishList = wishList.splice(itemIndex, 1);
        // send the updated wishList as the response
        ctx.body = { wishList: ctx.user.wishList }
    } catch (e) {
        console.log(e);
        ctx.body = { error: e.message }
        ctx.status = 401;
    }
});

// get public customer data
router.get('/wishList/viewAll', customerAuth, (ctx) => {
    try {
        const user = ctx.user;
        ctx.body = { wishList: user.getWishlist() }
    } catch (e) {
        console.log(e);
        ctx.body = { error: e };
        ctx.status = 401;
    }
});

module.exports = router;