const blogRouter = require("express").Router();
const Blog = require("../models/Blog");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogRouter.get("/:id", async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);
    response.json(blog).populate("user", { username: 1, name: 1 });
  } catch (error) {
    next(error);
  }
});

const getTokenFrom = (request) => {
  const authorization = request.get("Authorization");

  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

blogRouter.post("/", async (request, response, next) => {
  try {
    const { title, author, url, likes } = request.body;

    const decodedToken = jwt.verify(request.token, process.env.JWT_SECRET);

    if (!request.token || !decodedToken) {
      return response.status(401).json({ error: "token missing or invalid" });
    }
    const user = await User.findById(decodedToken.id);
    const blog = new Blog({ title, author, url, likes, user: user._id });
    const result = await blog.save();

    (user.blogs = user.blogs.concat(result._id)), await user.save();
    response.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

blogRouter.delete("/:id", async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

blogRouter.patch("/:id", async (request, response, next) => {
  try {
    const blogToBeChanged = request.body;
    console.log(blogToBeChanged);

    const result = await Blog.findByIdAndUpdate(
      request.params.id,
      blogToBeChanged
    );
    response.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = blogRouter;
