const jwt = require('jwt-simple');
const moment = require('moment');
const env = require('../../config/development');
const User = require('../models/user');
 
 
/**
 * CreateToken
 * Create a authorization token
 * @param {*} user
 * @returns token
 */
function createToken(user) {
    var payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(12, "hours").unix(),
    };
    
    return jwt.encode(payload, env.TOKEN_SECRET);
}
exports.createToken = createToken;

/**
 * IsAuthenticated
 * authenticate check
 * @param {*} req
 * @param {*} rescoupon
 * @param {*} next
 * @returns 
 */
async function isAuthenticated (req, res, next) {
    try {
        if (!req.headers.authorization){
            throw 'U402' //not authorized
        }
        const token =req.headers.authorization.split(' ')[1];
        await checkAuthenticationJWT(token);
        
        next();
    } catch (error) {
        handler(error, res)
    }

}
module.exports.isAuthenticated = isAuthenticated;

/**
 * checkAuthenticationJWT
 * authenticate check
 * @param {*} token
 * @returns 
 */
async function checkAuthenticationJWT  (token) {
    try {
       

        const payload = jwt.decode(token, env.TOKEN_SECRET);
        
        const userId = payload.sub;
        const user = await User.findById(userId);
        if (!user) {
            throw 'U401' //not authorized
        }

    } catch (error) {
        if (error.message === "Token expired") {
            throw 'U402'
        }
        throw error
    }

}

function handler(err, res) {

    if (err) {

        switch (err) {
            case 'U402':
                return res.status(401).send({
                    code: err,
                    token: res.token
                });

            case 'U401':
                return res.status(401).send({
                    code: 'U401'
                });

            default:
                return res.status(500).send({
                    code: "500",
                    message: "Internal Server error"
                });
        }


    }

    return res.status(500).send({
        code: "500",
        message: "Internal Server error"
    });
}
 
 
