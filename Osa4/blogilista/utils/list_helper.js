const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const summa = (array) => {
    return array.reduce((a, b) => a + b.likes, 0);
  };
  return blogs.length <= 0 ? 0 : summa(blogs);
};

module.exports = {
  dummy,
  totalLikes,
};
