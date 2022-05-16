const Trader = require('../classes/Trader');

const koaRouter = require('@koa/router');
const router = new koaRouter();

const { traderAuth, traderKey } = require('../middleware/auth');

// data store imports
const { traders } = require('../data/data');

// create a new trader
router.post('/traders/create', (ctx) => {
    const body = ctx.request.body;
    console.log(ctx.request.body);

    if (traders.has(body.username)) {
        ctx.body = 'username already taken';
        ctx.status = 400;
    } else {
        // remove the duplicated username in the body
        // validate if only allowed fields are provided
        traders.set(body.username, new Trader(body));
    }
});

// login trader
router.post('/traders/login', traderAuth, (ctx) => {
    try {
        console.log('login router');
        const body = ctx.request.body;
        console.log(body);

        // check whether the trader exist
        const trader = traders.get(body.username);
        if (trader) {
            const isValid = trader.password === body.password;
            if (!isValid) throw new Error('invalid credentials')

            // create a new token
            const token = jwt.sign({ username: trader.username, password: trader.password }, traderKey);
            trader.tokens = trader.tokens instanceof Array ? trader.tokens.push(token) : [token];
            ctx.body = {
                username: trader.username,
                dateJoined: trader.dateJoined,
                token: token
            }
            ctx.status = 201;
            console.log(ctx.body);
        }
    } catch (e) {
        console.log(e);
        ctx.body = { error: e.message }
        ctx.status = 401;
    }
});

router.get('/traders/logout', traderAuth, (ctx) => {
    const user = traders.get(ctx.user.username);
    user.tokens.filter(e => e !== ctx.user.token);
});

// get public trader data
router.get('/traders/get/:username', (ctx) => {
    try {
        const user = traders.get(ctx.params.username);

        if (user) {
            ctx.body = user.toPublicJson();
            ctx.status = 201;
        }
    } catch (e) {
        console.log(e);
    }
});

// get inventory
router.get('/traders/inventory', traderAuth, (ctx) => {
    try {
        if (!ctx.user) throw new Error('user error');

        ctx.body = { inventory: ctx.user.inventory };
        ctx.status = 201;
    } catch (e) {
        console.log(e);
        ctx.body = { error: e }
        ctx.status = 400
    }
});

module.exports = router;