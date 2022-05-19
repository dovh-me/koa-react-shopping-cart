const jwt = require('jsonwebtoken');
const { traders, customers } = require('../data/data');

const customerKey = 'VERYveryVERYverySecureCustomerKeyAndReactIsGay';
const traderKey = 'VERYveryVERYverySecureTraderKeyAndReactIsVERYGay'

module.exports = {
    customerKey,
    async customerAuth(ctx, next) {
        if (await authenticate(customers, customerKey, ctx)) {
            next();
        } else {
            ctx.throw(401, 'unauthorized');
        }
    },
    async generateCustomerToken(data) {
        return generateToken.bind(null, customerKey, data);
    },

    traderKey,
    async traderAuth(ctx, next) {
        if (await authenticate(traders, traderKey, ctx)) {
            next();
        } else {
            ctx.throw(401, 'unauthorized');
        }
    },
    async generateTraderToken(data) {
        return generateToken.bind(null, traderKey, data);
    }
}

function generateToken(key, data) {
    return jwt.sign(data, key);
}

async function authenticate(data, key, ctx) {
    // todo: encrypt the password
    const token = ctx.request.get('authorization').replace('Bearer ', '').trim();
    // console.log({ authorization: ctx.request.get('Authorization'), token, key });
    const user = jwt.verify(token, key);
    const userToValidate = data.get(user.username);

    if (!userToValidate) return false;
    console.log({ userToValidate })
    if (userToValidate.tokens.includes(token)) {
        ctx.user = Object.assign(userToValidate, { token });
    }
    return Boolean(ctx.user);
}