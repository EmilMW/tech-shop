const jwt = require('jsonwebtoken');
const config = require('config');
const jwtConfig = config.get('jwt');

// middleware to check if the user is logged in
const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, jwtConfig.secret, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.send('Token invalid');
            } else {
                res.locals.token = decodedToken;
                next();
            }
        });
    } else {
        res.status(401).send('Please login');
    }
};

module.exports = { requireAuth };
