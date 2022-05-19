const Customer = require('../classes/Customer');
const { customers } = require('../data/data');

const jwt = require('jsonwebtoken');
const koaRouter = require('@koa/router');
const { customerKey, customerAuth, traderAuth } = require('../middleware/auth');
const router = new koaRouter();

// create a new customer
router.post('/customers/create', (ctx) => {
    try {
        const body = ctx.request.body;
        console.log(ctx.request.body);

        if (customers.has(body.username)) {
            ctx.body = 'username already taken';
            ctx.status = 400;
        } else {
            // remove the duplicated username in the body
            // validate if only allowed fields are provided
            customers.set(body.username, new Customer(body));

            // delete the password from the response body
            delete body.password;

            ctx.body = { message: 'user created', ...body };
            ctx.status = 201;
        }
    } catch (e) {
        console.log(e);
        ctx.body = { error: e };
        ctx.status = 400;
    }
});

// login customer
router.post('/customers/login', (ctx) => {
    try {
        console.log('login router');
        const body = ctx.request.body;
        console.log(body);

        // check whether the customer exist
        const customer = customers.get(body.username);
        if (customer) {
            const isValid = customer.password === body.password;
            if (!isValid) throw new Error('invalid credentials')

            // create a new token
            const token = jwt.sign({ username: customer.username, password: customer.password }, customerKey);
            customer.tokens = customer.tokens instanceof Array ? [...customer.tokens, token] : [token];
            ctx.body = {
                username: customer.username,
                dateJoined: customer.dateJoined,
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

router.get('/customers/logout', customerAuth, (ctx) => {
    const user = customers.get(ctx.user.username);
    user.tokens = user.tokens.filter(e => e !== ctx.user.token);
    ctx.body = { message: 'logout success' };
    ctx.status = 201;
});

// get public customer data
router.get('/customers/get/:username', traderAuth, (ctx) => {
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

module.exports = router;