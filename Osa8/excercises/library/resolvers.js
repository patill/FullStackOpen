const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const Book = require("./Models/Book");
const Author = require("./Models/Author");
const User = require("./Models/User");

const resolvers = {
  Author: {
    bookCount: async ({ _id }) => {
      console.log(_id);
      const booklist = await Book.find({ author: _id });
      return booklist.length;
    },
  },
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author && args.genre) {
        const author = await Author.findOne({ name: args.author });
        const books = await Book.find({
          author: author._id,
          genres: args.genre,
        }).populate("author");
        return books;
      }
      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        const books = await Book.find({
          author: author._id,
        }).populate("author");
        return books;
      }
      if (args.genre) {
        const books = await Book.find({
          genres: args.genre,
        }).populate("author");
        console.log(books);
        return books;
      }
      return Book.find({}).populate("author");
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Mutation: {
    addAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      const author = new Author({ ...args });
      author.born === null
        ? (author.born = parseInt(args.born))
        : (author.born = null);
      try {
        console.log(author);
        await author.save();
      } catch (error) {
        if (error.name === "ValidationError") {
          if (error.errors.name.kind === "unique") {
            throw new GraphQLError("Author should be unique", {
              extensions: {
                code: "BAD_USER_INPUT",
                invalidArgs: args.author,
                error,
              },
            });
          } else if (error.errors.name.kind === "minlength") {
            throw new GraphQLError("Author should contain at least 4 letters", {
              extensions: {
                code: "BAD_USER_INPUT",
                invalidArgs: args.author,
                error,
              },
            });
          }
        }
        throw new GraphQLError("Saving author failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args,
            error,
          },
        });
      }
      return author;
    },
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      const authorDefined = await Author.findOne({ name: args.author });
      console.log(authorDefined);
      if (!authorDefined) {
        const author = new Author({ name: args.author, born: null });
        console.log(author);
        try {
          await author.save();
        } catch (error) {
          if (error.name === "ValidationError") {
            if (error.errors.name.kind === "unique") {
              throw new GraphQLError("Author should be unique", {
                extensions: {
                  code: "BAD_USER_INPUT",
                  invalidArgs: args.author,
                  error,
                },
              });
            } else if (error.errors.name.kind === "minlength") {
              throw new GraphQLError(
                "Author should contain at least 4 letters",
                {
                  extensions: {
                    code: "BAD_USER_INPUT",
                    invalidArgs: args.author,
                    error,
                  },
                }
              );
            }
          }
          throw new GraphQLError("Saving author failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.author,
              error,
            },
          });
        }
      }

      const newBook = new Book({
        ...args,
      });
      newBook.genres ? (newBook.genres = args.genres) : (newBook.genres = []);
      newBook.published
        ? (newBook.published = parseInt(args.published))
        : (newBook.published = null);
      authorDefined
        ? (newBook.author = authorDefined)
        : (newBook.author = await Author.findOne({ name: args.author }));
      try {
        console.log(newBook);
        await newBook.save();
      } catch (error) {
        if (error.name === "ValidationError") {
          if (error.errors.name.kind === "unique") {
            throw new GraphQLError("Title should be unique", {
              extensions: {
                code: "BAD_USER_INPUT",
                invalidArgs: args.title,
                error,
              },
            });
          } else if (error.errors.name.kind === "minlength") {
            throw new GraphQLError("Title should contain at least 4 letters", {
              extensions: {
                code: "BAD_USER_INPUT",
                invalidArgs: args.title,
                error,
              },
            });
          }
        }
        throw new GraphQLError("Saving book failed", {
          extensions: { code: "BAD_USER_INPUT", invalidArgs: args, error },
        });
      }
      return newBook;
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      const author = await Author.findOne({ name: args.name });
      if (!author) return null;
      author.born = args.setBornTo;
      try {
        await author.save();
      } catch (error) {
        if (error.name === "ValidationError") {
          if (error.errors.name.kind === "unique") {
            throw new GraphQLError("Author should be unique", {
              extensions: {
                code: "BAD_USER_INPUT",
                invalidArgs: args.author,
                error,
              },
            });
          } else if (error.errors.name.kind === "minlength") {
            throw new GraphQLError("Author should contain at least 4 letters", {
              extensions: {
                code: "BAD_USER_INPUT",
                invalidArgs: args.author,
                error,
              },
            });
          }
        }
        throw new GraphQLError("Saving author failed", {
          extensions: { code: "BAD_USER_INPUT", invalidArgs: args, error },
        });
      }
      return author;
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });
      return user.save().catch((error) => {
        if (error.name === "ValidationError") {
          if (error.errors.name.kind === "unique") {
            throw new GraphQLError("The username should be unique", {
              extensions: {
                code: "BAD_USER_INPUT",
                invalidArgs: args.username,
                error,
              },
            });
          } else if (error.errors.name.kind === "minlength") {
            throw new GraphQLError("The username have at least 3 characters", {
              extensions: {
                code: "BAD_USER_INPUT",
                invalidArgs: args.username,
                error,
              },
            });
          }
        }
        throw new GraphQLError("Creating the user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
            error,
          },
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const userToGenerateToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userToGenerateToken, process.env.JWT_SECRET) };
    },
  },
};

module.exports = resolvers;
