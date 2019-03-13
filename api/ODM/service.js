const User = require('../models/user')
const Product = require('../models/product')
const env = require('../../config/development')
/**
 * USERS
 */
/**
 * createUser
 * Create a user in DB
 * @param {*} newUser
 */
async function createUser (newUser) {
  try {
    await User.create(newUser)
  } catch (err) {
    throw env.errores.U001
  }
}

exports.createUser = createUser

/**
 * PRODUCTS
 */
/**
 * CreateProduct
 * create a product in DB
 * @param {*} newProduct
 */
async function createProduct (product) {
  try {
    var newProduct = new Product({
      name: product.name,
      description: product.description,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    await newProduct.save()
  } catch (err) {
    throw env.errores.P001
  }
}
exports.createProduct = createProduct

/**
 * DeleteProduct
 * Delete a product from DB
 * @param {*} productId
 */
async function deleteProduct (productId) {
  try {
    await Product.findByIdAndRemove(productId)
  } catch (err) {
    throw env.errores.P002
  }
}
exports.deleteProduct = deleteProduct

/**
 * FindAllProducts
 * get all products from DB
 * @param {*} productId
 */
async function findAllProducts (productId) {
  try {
    const products = await Product.find(productId)
    return products
  } catch (err) {
    throw env.errores.P003
  }
}
exports.findAllProducts = findAllProducts
