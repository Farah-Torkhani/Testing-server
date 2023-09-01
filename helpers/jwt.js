const { expressjwt: ejwt } = require("express-jwt");

function authJwt() {
    const secret = process.env.secret;
    const api = process.env.API_URL;

    const expressJwtMiddleware = ejwt({
        secret: secret, // Use your actual secret here
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        path: [
            {url: /\/api\/v1\/products(.*)/ , methods: ['GET', 'OPTIONS'] },
            {url: /\/api\/v1\/categories(.*)/ , methods: ['GET', 'OPTIONS'] },
            `${api}/users/login`,
            `${api}/users/register`,
        ]
    });

    return expressJwtMiddleware;
}

async function isRevoked(req, payload, done) {
    if (!payload.isAdmin) {
        done(null, true);
    } else {
        done();
    }
}

module.exports = authJwt;
