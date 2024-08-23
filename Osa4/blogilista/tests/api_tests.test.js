const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("../utils/test_helper");
const app = require("../app");
const Blog = require("../models/Blog");
const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.listWithManyBlogs);
});

test("Api returns JSON", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("Api returns the right number of entries", async () => {
  const result = await api.get("/api/blogs");
  const initialBlogs = helper.listWithManyBlogs;
  expect(result.body).toHaveLength(initialBlogs.length);
});

test("A blog can be added", async () => {
  const allBlogsBefore = await api.get("/api/blogs");
  const blog = new Blog({
    title: "Another blog of interest",
    author: "Phantom",
    url: "http://example.com",
  });

  await api
    .post("/api/blogs")
    .send(blog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const allBlogsAfter = await api.get("/api/blogs");

  expect(allBlogsBefore.body).toHaveLength(allBlogsAfter.body.length - 1);
});

test("Api returns one blog", async () => {
  const allBlogs = await api.get("/api/blogs");
  const id = allBlogs.body[0]._id;

  const result = await api.get(`/api/blogs/${id}`);

  expect(result.body.title).toEqual(allBlogs.body[0].title);
});

test("A blog can be deleted", async () => {
  const allBlogsBefore = await api.get("/api/blogs");
  const noteToBeDeleted = allBlogsBefore.body[0];
  await api.delete(`/api/blogs/${noteToBeDeleted._id}`).expect(204);
  const allBlogsAfter = await api.get("/api/blogs");
  expect(allBlogsBefore.body).toHaveLength(allBlogsAfter.body.length + 1);

  expect(allBlogsAfter.body).not.toContain(noteToBeDeleted);
});

test("The Likes of a blog can be changed", async () => {
  const allBlogsBefore = await api.get("/api/blogs");
  const blogToBeModified = allBlogsBefore.body[0]; //has 7 likes
  await api
    .put(`/api/blogs/${blogToBeModified._id}`)
    .send({ likes: 12 })
    .expect(200);
  const modifiedBlog = await api.get(`/api/blogs/${blogToBeModified._id}`);
  expect(modifiedBlog.body.likes).toEqual(12);
});

afterAll(() => {
  mongoose.connection.close();
});
