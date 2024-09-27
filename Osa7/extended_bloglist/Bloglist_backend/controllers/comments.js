const commentRouter = require("express").Router();
const Comment = require("../models/Comment");
const Blog = require("../models/Blog");

commentRouter.get("/", async (request, response) => {
  const id = request.baseUrl.split("/")[3];
  const comments = await Comment.find({ blog: id });

  response.json(comments);
});

commentRouter.post("/", async (request, response, next) => {
  try {
    const id = request.baseUrl.split("/")[3];
    const { text } = request.body;
    const comment = new Comment({ text, blog: id });
    const res = await comment.save();
    const blog = await Blog.findById(id);

    blog.comments = blog.comments.concat(comment._id);
    console.log(blog);
    await blog.save(); //(user.blogs = user.blogs.concat(result._id)), await user.save();
    response.status(201).json(res);
  } catch (error) {
    next(error);
  }
});

module.exports = commentRouter;
