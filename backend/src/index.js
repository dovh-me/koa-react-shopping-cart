const koa = require('koa');
const koaRouter = require('@koa/router');
const koaBody = require('koa-body');
const koaCors = require('@koa/cors');

const app = new koa();
const router = new koaRouter();

app.use(koaCors());
app.use(koaBody());
// routers
const customerRouter = require('./routers/customer');
const traderRouter = require('./routers/trader');
const itemRouter = require('./routers/item');
const cartRouter = require('./routers/cart');
const wishlistRouter = require('./routers/wishlist');

app.use(router.allowedMethods());
app.use(router.routes());

// customers router
app.use(customerRouter.allowedMethods());
app.use(customerRouter.routes());
// trader router
app.use(traderRouter.allowedMethods());
app.use(traderRouter.routes());
// item router
app.use(itemRouter.allowedMethods());
app.use(itemRouter.routes());
// cart router
app.use(cartRouter.allowedMethods());
app.use(cartRouter.routes());
// wishlist router
app.use(wishlistRouter.allowedMethods());
app.use(wishlistRouter.routes());

app.listen(9019);