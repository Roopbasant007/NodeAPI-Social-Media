const userRouter = require("express").Router();
const verifyCookies = require("../middlewares/verifyCookies");

// get user profile
const getUserProfile = require("../contollers/getUserProfileContollers");

// follow and unfollow user
const {
  followRequest,
  unFollowRequest,
} = require("../contollers/followContollers");

// create, del, like and unile etc for POST.
const {
  createPost,
  likePost,
  unlikePost,
  commentPost,
  deletePost,
  getPost,
  updatePost,
  getBlogs,
} = require("../contollers/postContollers");

userRouter.get("/user", verifyCookies, getUserProfile);
userRouter.post("/follow/:id", verifyCookies, followRequest);
userRouter.post("/unfollow/:id", verifyCookies, unFollowRequest);

// User Router for Post
userRouter.post("/blog", verifyCookies, createPost);
userRouter.post("/like/:id", verifyCookies, likePost);
userRouter.post("/unlike/:id", verifyCookies, unlikePost);
userRouter.post("/comment/:id", verifyCookies, commentPost);
userRouter.post("/blog/delete/:id", verifyCookies, deletePost);
userRouter.get("/blog/:id", verifyCookies, getPost);
userRouter.post("/blog/update/:id", verifyCookies, updatePost);
userRouter.post("/getblogs", verifyCookies, getBlogs);

module.exports = userRouter;
