// models/User.js
require('dotenv').config()
const mongoose = require('mongoose');
const { isEmail } = require('validator');
const jwt = require('jsonwebtoken')

const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: [isEmail, 'Please enter a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6
  },
  isDelete: {
    type: Boolean,
    default: false
  }
});

userSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.createJWT = function () {
    return jwt.sign({userID:this._id, userName: this.name}, process.env.JWT_SECRET, {expiresIn: process.env.EXPIRES_IN} )
}

userSchema.methods.comparePassword = async function (canditatePassword) {
    const isMatch = await bcrypt.compare(canditatePassword ,this.password)
    return isMatch
}

const User = mongoose.model('User', userSchema);

module.exports = User;
