const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();
const Book = require("./Models/Book");
const Author = require("./Models/Author");
const User = require("./Models/User");

const resolvers = {
  Author: {
    bookCount: async ({ books }) => {
      console.log("book.find");
      return books.length;
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
      author.books = [];
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
      var author; //placeholder, if new author added
      const authorDefined = await Author.findOne({ name: args.author });
      console.log(authorDefined);
      if (!authorDefined) {
        author = new Author({ name: args.author, born: null, books: [] });
        console.log(author);
        try {
          await author.save();
        } catch (error) {
          console.log(error);
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
        : (newBook.author = author);
      try {
        console.log(newBook);
        await newBook.save();
        if (authorDefined) {
          if (authorDefined.books) {
            authorDefined.books.push(newBook._id);
          } else authorDefined.books = [newBook.id];
          console.log(authorDefined);
          await authorDefined.save();
        } else {
          author.books.push(newBook);
          await author.save();
        }
      } catch (error) {
        console.log(error);
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

      pubsub.publish("BOOK_ADDED", { bookAdded: newBook });
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
      console.log("logging in");
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
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
};

module.exports = resolvers;
