const blogRouter = require("express").Router();
const Blog = require("../models/Blog");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogRouter.get("/:id", async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id).populate("user", {
      username: 1,
      name: 1,
    });
    response.json(blog);
  } catch (error) {
    next(error);
  }
});

blogRouter.post("/", async (request, response, next) => {
  try {
    const { title, author, url, likes } = request.body;
    const user = request.user;

    if (user) {
      const blog = new Blog({ title, author, url, likes, user: user._id });
      const result = await blog.save();
      (user.blogs = user.blogs.concat(result._id)), await user.save();
      response.status(201).json(result);
    } else response.status(401).json({ error: "Bad authentication" });
  } catch (error) {
    next(error);
  }
});

blogRouter.delete("/:id", async (request, response, next) => {
  try {
    const user = request.user;

    const blogToBeRemoved = await Blog.findById(request.params.id);
    if (blogToBeRemoved) {
      if (
        user &&
        blogToBeRemoved.user &&
        blogToBeRemoved.user.valueOf() === user.id
      ) {
        await Blog.findByIdAndRemove(request.params.id);
        response.status(204).end();
      } else {
        response.status(401).end();
      }
    } else response.status(400).end();
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
