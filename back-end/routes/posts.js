const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authentication')

const { createPost, getAllPosts, getSinglePost, updatePost, deletePost } = require('../controlers/posts')

router.route('/').post(authMiddleware, createPost).get(getAllPosts)
router.route('/:id').get(getSinglePost).put(authMiddleware, updatePost).delete(authMiddleware, deletePost)


module.exports = router