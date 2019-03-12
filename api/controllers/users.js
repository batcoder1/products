const User = require('../models/user');
const auth = require('../helpers/auth'); 
const service = require('../ODM/service');


/**
 * Signup
 * Register user from CMS
 * @param {*} req
 * @param {*} res
 * @returns
 */
async function signup (req, res) {
    try {
        let {
            email,
            password,
        } = req.body

        if (!email || !password) {
            throw 'BRP'
        }
   
        const newUser = {email,password

        }
        await service.createUser(newUser);
        
        return res.status(200).send({
            message: "User created succesfully",

        });
    } catch (err) {
        return handler(err, req, res)
    };

};
exports.signup = signup;

/**
 * Login
 *  
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
async function login (req, res){

    let { email, password } = req.body
  
    try {
        if (!email && !password) {
            throw 'BRP'
        }
        const query = {
            'email': email
        };
        let user = await User.authenticate(query, password);


    
        // token
        const tokenAuth = auth.createToken(user);

        return res.status(200).send({tokenAuth});

    } catch (err) {
        handler(err, res)

    };
};
exports.login = login;

/**
 * Handler
 * Error handler
 * @param {*} err
 * @param {*} res
 * @returns code: err
 */
function handler(err, res) {

    if (err) {
        if (err.message) {
            return res.status(500).send({
                code: err.message
            });
        } else {
            return res.status(500).send({
                code: err
            });
        }
    }

    return res.status(500).send({
        code: "500",
        message: "Internal Server error"
    });
}