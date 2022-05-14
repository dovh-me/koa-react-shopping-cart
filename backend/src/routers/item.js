import { traderAuth } from '../middleware/auth';

const koaRouter = require('@koa/router');
const router = new koaRouter();

// add new item
router.post('/item/create', traderAuth, (ctx) => {

});

// update item
router.post('/item/update', traderAuth, (ctx) => {

});

// remove item
router.delete('/item/delete/:id', traderAuth, (ctx) => {

});

// doesn't need authentication
// get item
router.get('/item/get/:name', (ctx) => {

});

// get all items
router.get('/item/getAll', (ctx) => {

});

// needs customer authentication
// purchase item
router.post('item/purchase/:id', (ctx) => {

});

router.get('/item/getAll', (ctx) => {

})

export default router;