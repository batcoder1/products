const auth = require('../helpers/auth');
const products = require('./products');
const users = require('./users');

const authentication = require('./authentication');


module.exports = function (router) {
    // without authentication  
    router.use('/authentication', authentication);
    router.use('/users', users);

    // with authentication
    router.use('/products', auth.isAuthenticated, products);
    
      
 
}