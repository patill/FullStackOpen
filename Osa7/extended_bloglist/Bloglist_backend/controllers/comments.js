const commentRouter = require("express").Router();
const Comment = require("../models/Comment");

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
    response.status(201).json(res);
  } catch (error) {
    next(error);
  }
});

module.exports = commentRouter;
