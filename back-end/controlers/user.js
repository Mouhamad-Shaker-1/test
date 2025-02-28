// authRouter.js
const express = require("express");
const User = require("../models/User");
const Post = require("../models/Post");
const { UnauthenticatedError, BadRequestError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const register = async (req, res) => {
  const newUser = await User.create(req.body);

  const token = newUser.createJWT();
  res.status(StatusCodes.CREATED).json({
    name: newUser.name,
    email: newUser.email,
    _id: newUser._id,
    token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("please provide email and password");
  }
  const user = await User.findOne({ email });

  if (!user || user.isDelete) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    name: user.name,
    email: user.email,
    _id: user._id,
    token,
  });
};

const getAllUsers = async (req, res) => {
  const users = await User.find({ isDelete: false }).select("-password");
  res.status(StatusCodes.OK).json(users);
};

// using authenticatoin by JWT and get id from the payload
const updateUser = async (req, res) => {
  const { name, email } = req.body;

  // Prepare the updated data object
  let updateData = {
    name,
    email,
  };

    // Find the user first
    const user = await User.findById(req.user.userID).select("-password");

    // Check if user exists and is not deleted
    if (!user || user.isDelete) {
      throw new UnauthenticatedError("User not found");
    }

  // Update the user in the database
  const updateUser = await User.findOneAndUpdate(
    { _id: req.user.userID },
    updateData,
    { new: true, runValidators: true }
  ).select("-password").select("-isDelete");

  await Post.updateMany(
    { createdBy: req.updateUser.userID },
    { createrName: name }
  );

  // Send the updated user data in the response
  res.status(StatusCodes.OK).json(updateUser);
};

// using authenticatoin by JWT and get id from the payload
const deleteUser = async (req, res) => {
  const user = await User.findOneAndUpdate(
    { _id: req.user.userID }, 
    { isDelete: true }, 
    { new: true }
  );

  if (!user) {
    throw new UnauthenticatedError("User not found");
  }

  await Post.updateMany({ createdBy: req.user.userID }, { isDelete: true });

  res.status(StatusCodes.OK).json({ message: "User deleted successfully" });
};

module.exports = { register, getAllUsers, updateUser, login, deleteUser };
