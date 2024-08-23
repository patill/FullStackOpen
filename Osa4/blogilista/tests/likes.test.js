const listHelper = require("../utils/list_helper");
const blogHelper = require("../utils/test_helper");

describe("total likes", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
  ];

  const listWithManyBlogs = blogHelper.listWithManyBlogs;

  test("when list has only one blog equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test("When list has no blog the result is 0", () => {
    expect(listHelper.totalLikes([])).toBe(0);
  });

  test("List with many blogs gives correct sum of likes", () => {
    expect(listHelper.totalLikes(listWithManyBlogs)).toBe(36);
  });
});
