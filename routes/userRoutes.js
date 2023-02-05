const userRouter = require("express").Router();
const verifyJWT = require("../middlewares/verifyJWT");

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

userRouter.get("/user", verifyJWT, getUserProfile);
userRouter.post("/follow/:id", verifyJWT, followRequest);
userRouter.post("/unfollow/:id", verifyJWT, unFollowRequest);

// User Router for Post
userRouter.post("/blog", verifyJWT, createPost);
userRouter.post("/like/:id", verifyJWT, likePost);
userRouter.post("/unlike/:id", verifyJWT, unlikePost);
userRouter.post("/comment/:id", verifyJWT, commentPost);
userRouter.post("/blog/delete/:id", verifyJWT, deletePost);
userRouter.get("/blog/:id", verifyJWT, getPost);
userRouter.post("/blog/update/:id", verifyJWT, updatePost);
userRouter.post("/getblogs", verifyJWT, getBlogs);

module.exports = userRouter;
