const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authentication')


const {register, getAllUsers, updateUser, login, deleteUser} = require('../controlers/user')

router.route('/login').post(login)
router.route('').post(register).get(getAllUsers).put(authMiddleware, updateUser).delete(authMiddleware, deleteUser)

// .post(authMiddleware, updateUser)

module.exports =  router