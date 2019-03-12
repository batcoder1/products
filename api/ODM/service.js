const User = require('../models/user');
const Product = require('../models/product');

////////////////////////////////////////////////////////////////
//////// USERS /////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
/**
 * createUser
 * Create a user in DB
 * @param {*} newUser
 */
async function createUser(newUser) {
    try {
    
        await User.create(newUser);

    } catch (err) {
      
        throw "U001"
    }

}
exports.createUser = createUser;

////////////////////////////////////////////////////////////////
//////// PRODUCTS //////////////////////////////////////////////
////////////////////////////////////////////////////////////////
/**
 * CreateProduct
 * create a product in DB
 * @param {*} newProduct
 */
async function createProduct (newProduct) {
    try {
    
        await Product.create(newProduct);

    } catch (err) {
      
        throw "P001"
    }

}
exports.createProduct = createProduct;

/**
 * DeleteProduct
 * Delete a product from DB
 * @param {*} productId
 */
async function deleteProduct (productId) {
    try {
    
        await Product.findByIdAndRemove(productId);

    } catch (err) {
      
        throw "P001"
    }

}
exports.deleteProduct = deleteProduct;


/**
 * FindAllProducts
 * get all products from DB
 * @param {*} productId
 */
async function findAllProducts (productId) {
    try {
    
       const products=  await Product.find(productId);
       return products;
    
    } catch (err) {  
        throw "P002"
    }

}
exports.findAllProducts = findAllProducts;



