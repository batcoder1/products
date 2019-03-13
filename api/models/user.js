'use strict';
/**
 * user.js - Create a schema model for user
 *
 * @file user.js
 * @author ERS
 *
 */

const mongoose = require('mongoose');
const bcrypt =  require('bcrypt');


var UserSchema = mongoose.Schema({
   
  email : {type: String, trim: true,  sparse: true, default: null},
  password: String,
  createdAt: Date,
  updatedAt: Date
});

 
//authenticate input against database
UserSchema.statics.authenticate = async (query, password) => {

  try {
    const _user = await user.findOne(query);
    if (!_user) {
      throw "U002"
    }
    const result = await bcrypt.compare(password, _user.password);
    if (!result) {
      throw "U002"
    }
    return _user;

  } catch (err) {
    throw err
  }
};

UserSchema.pre('save', async function(next) {
  try {
    const user = this;
     // generate a salt
     const salt = await bcrypt.genSalt(10);

     // hash the password along with our new salt
     const hash = await bcrypt.hash(user.password, salt);
    
    user.password = hash;
    return next();
   
  } catch (err) {
    throw err
  }
});

const user = mongoose.model('user', UserSchema);



module.exports = user;