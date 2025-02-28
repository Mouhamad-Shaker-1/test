const { StatusCodes } = require("http-status-codes");
const Post = require("../models/Post");
const { NotFoundError, BadRequestError } = require("../errors");

const getAllPosts = async (req, res) => {
  const { userId } = req.query; // Get userId from query params

  let query = { isDelete: false };
  if (userId) {
    query.createdBy = userId;
  }
  const allPosts = await Post.find(query).sort({ createdAt: -1 });
  res.status(StatusCodes.OK).json(allPosts);
};

const getSinglePost = async (req, res) => {
  const postID = req.params.id;
  const post = await Post.findOne({ _id: postID, isDelete: false });
  if (!post) {
    throw new NotFoundError(`there are no post with ${postID} id.`);
  }
  res.status(StatusCodes.OK).json({ post });
};

const createPost = async (req, res) => {
  req.body.createdBy = req.user.userID;
  req.body.createrName = req.user.userName;
  const { title, content } = req.body;


  if (!title || !content) {
    throw new BadRequestError("title or content fields cannot be empty");
  }
  const post = await Post.create(req.body);
  res.status(StatusCodes.CREATED).json({ post });
};

const updatePost = async (req, res) => {
  const postID = req.params.id;
  const userID = req.user.userID;

  const { title, content } = req.body;

  if (!title || !content) {
    throw new BadRequestError("title or content fields cannot be empty");
  }

  const post = await Post.findOneAndUpdate(
    { _id: postID, createdBy: userID, isDelete: false }, 
    { title, content }, 
    { new: true, runValidators: true }
);

  if (!post) {
    throw new NotFoundError(`there are no post with ${postID} id.`);
  }
  res.status(StatusCodes.OK).json(post);
};

const deletePost = async (req, res) => {
  const postID = req.params.id;
  const userID = req.user.userID;

  const post = await Post.findOneAndUpdate(
    { createdBy: userID, _id: postID },
    { isDelete: true },
    { new: true }
  );

  if (!post) {
    throw new NotFoundError(`there are no post with ${postID} id.`);
  }
  res.status(StatusCodes.OK).json({ message: "Post deleted successfully" });
};

module.exports = {
  createPost,
  getAllPosts,
  getSinglePost,
  updatePost,
  deletePost,
};
