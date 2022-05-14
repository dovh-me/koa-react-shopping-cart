const koa = require('koa');
const koaRouter = require('@koa/router');
const koaBody = require('koa-body');

const app = new koa();
const router = new koaRouter();

app.use(koaBody());
// routers
const customerRouter = require('./routers/customer');
const traderRouter = require('./routers/trader');

app.use(router.allowedMethods());
app.use(router.routes());

// customers router
app.use(customerRouter.allowedMethods());
app.use(customerRouter.routes());
// trader router
app.use(traderRouter.allowedMethods());
app.use(traderRouter.routes());

app.listen(9019);