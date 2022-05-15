const Item = require('../classes/Item');
import { items } from '../data/data';
import { customerAuth, traderAuth } from '../middleware/auth';

const koaRouter = require('@koa/router');
const router = new koaRouter();

// add new item
router.post('/item/create', traderAuth, async (ctx) => {
    try {
        const item = new Item(ctx.body);

        items.set(item.name, item);
        ctx.body = {
            message: 'item added',
            item
        }
        ctx.status = 201;
    } catch (e) {
        console.log(e);
        ctx.body = { error: e };
        ctx.status = 401;
    }
});

// update item
router.patch('/item/update/:itemName', traderAuth, async (ctx) => {
    try {
        const itemName = ctx.params.itemName;
        // find the item 
        const item = items.get(itemName);
        item.updateItem(ctx.body);

        ctx.body = { item };
        ctx.status = 201;
    } catch (e) {
        console.log(e);
        ctx.throw(401, { error: e });
        ctx.status = 401;
    }
});

// remove item
router.delete('/item/delete/:itemName', traderAuth, async (ctx) => {
    try {
        // find the item
        const itemToRemove = items.get(ctx.params.itemName);
        if (!itemToRemove) return ctx.throw(400, 'invalid item');
        // check whether the trader is matching
        if (ctx.user.username !== itemToRemove.trader) return ctx.throw(401, 'Not authorized');
    } catch (e) {
        console.log(e);
    }
});

// doesn't need authentication
// get item
router.get('/item/get/:name', (ctx) => {
    try {
        // WRN: might have to change to search by id instead of the name
        const item = items.get(ctx.params.name);

        if (!item) throw new Error('item not found!');
        ctx.body = { item };
        ctx.status = 201;
    } catch (e) {
        console.log(e);
        ctx.body = { error: e };
        ctx.status = 401;
    }
});

router.get('/item/getAll', (ctx) => {
    // send all the items in the items map
    ctx.body = Array.from(items.values());
    ctx.status = 201;
})

export default router;