const jwt = require('jsonwebtoken');
const config = require('./config.json')

module.exports = (req, res, next) =>{
    const token = req.body.token || req.query.token || req.headers[x-access-token]
    if (token) {
        jwt.verify(token, config.accessToken, function(err, decoded) {
            if (err) {
                return res.status(401).json({error: true, message: "User is not authorized"});
            }
            req.decoded = decoded;
            next();
        });
    }
    else {
        return res.status(403).send({
            error: true,
            message: "No token was provided."
        });
    }
}