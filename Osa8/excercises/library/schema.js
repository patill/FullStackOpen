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
    books: [Book]
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

  type Subscription {
  bookAdded: Book!
  }
`;

module.exports = typeDefs;
