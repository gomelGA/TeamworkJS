const mongoose = require('mongoose')
const encryption = require('./../utilities/encryption')
let Schema = mongoose.Schema

let UserModel = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  fullName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  salt: { type: String, required: true }
})

UserModel.method({
  authenticate: function (password) {
    let inputPasswordHash = encryption.hashPassword(password, this.salt)
    let isSamePasswordHash = inputPasswordHash === this.password

    return isSamePasswordHash
  }
})

const User = mongoose.model('User', UserModel)

module.exports = User
