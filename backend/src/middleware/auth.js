const jwt = require('jsonwebtoken');
const { traders, customers } = require('../data/data');

module.exports = {
    customerKey: 'VERYveryVERYverySecureCustomerKeyAndReactIsGay',
    async customerAuth(ctx, next) {
        if (authenticate(this.customerKey, customers)) {
            next();
        } else {
            ctx.body = 'Unauthorized';
            ctx.status = 401;
        }
    },
    async generateCustomerToken(data) {
        return generateToken.bind(null, this.customerKey, data);
    },

    traderKey: 'VERYveryVERYverySecureTraderKeyAndReactIsVERYGay',
    async traderAuth(ctx, next) {
        if (authenticate(this.traderKey, traders, ctx)) {
            await next();
        } else {
            ctx.body = 'Unauthorized';
            ctx.status = 401;
        }
    },
    async generateTraderToken(data) {
        return generateToken.bind(null, this.traderKey, data);
    }
}

function generateToken(key, data) {
    return jwt.sign(data, key);
}

async function authenticate(data, key, ctx) {
    // todo: encrypt the password
    const token = ctx.request.get('Authorization').replace('Bearer ', '').trim();
    const user = jwt.verify(token, key);
    const userToValidate = data.get(user.username);

    if (!userToValidate) return false;

    if (userToValidate.tokens.includes(token)) {
        ctx.user = Object.assign(userToValidate, { token });
    }
    return Boolean(ctx.user);
}