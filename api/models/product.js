'use strict';
/**
 * Create a schema model for product
 *
 * @file product.js
 * @author ERS
 *
 */
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  }, 
  description: String,

  createdAt:	Date,
  updatedAt: Date
});
const product = mongoose.model('product', ProductSchema);


module.exports = product;
