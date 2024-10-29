const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { v1: uuid } = require("uuid");
const Book = require("./Models/Book");
const Author = require("./Models/Author");
const User = require("./Models/User");

const MONGODB_URI = process.env.MONGODB_URI;

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Sandi Metz", // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
];

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conexión con el libro
 */

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"],
  },
  {
    title: "Demons",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
  },
];

/*
  you can remove the placeholder query once your first one has been implemented 
*/

const typeDefs = `
  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }

  scalar BookCount

  type Author {
    name: String!
    born: Int
    bookCount: BookCount
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addAuthor(
    name: String!
    born: Int
    ): Author

    addBook(
    title: String!
    author: String!
    published: String
    genres: [String]
    ): Book

    editAuthor(
    name: String!
    setBornTo: Int!
    ): Author

    createUser(
    username: String!
    favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }
`;

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

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.startsWith("Bearer ")) {
      const decodedToken = jwt.verify(
        auth.substring(7),
        process.env.JWT_SECRET
      );
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
