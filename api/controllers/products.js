
const Product = require('../models/product');
const service = require('../ODM/service');

/* 
 * Create new product
 * @param {*} req
 * @param {*} res
 * @returns
 */
async function createProduct (req, res){
    try {
        if (!req.body.name &&
            !req.body.description ) {
            throw 'BRP'
        }
        let { name, description } =  req.body;
        var newProduct = new Product({
            name: name,
            description: description,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        await service.createProduct(newProduct);
        
        return res.status(200).send(newProduct);

    } catch (err) {
        return handler(err, res);
    }

};
exports.createProduct = createProduct;

/**
 * FindAll
 * Retrieve and return all products
 * @param {*} req
 * @param {*} res
 * @returns products
 */
async function findAll (req, res) {
    try {

        const products = await service.findAllProducts();
        return res.send(products);

    } catch (err) {
        return handler(err, res);
    }
};
exports.findAll = findAll;


/**
 * Delete
 * delete a product
 * @param {*} req
 * @param {*} res
 * @returns
 */
async function deleteProduct (req, res){

    try {
        let { productId } = req.body;

        await service.deleteProduct(productId)
   
        res.send( {

           message: "Product deleted succesfully"
        });

    } catch (err) {
        return handler(err, res);
    }
};
exports.deleteProduct = deleteProduct;

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
