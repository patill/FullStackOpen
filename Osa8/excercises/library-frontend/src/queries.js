import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      born
      name
      bookCount
    }
  }
`;

export const ALL_BOOKS = gql`
  query filteredBooks($genre: String!) {
    allBooks(genre: $genre) {
      title
      author {
        name
        born
      }
      published
      id
      genres
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation newBook(
    $title: String!
    $author: String!
    $published: String
    $genres: [String]
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author {
        name
      }
      published
      id
    }
  }
`;

export const EDIT_AUTHOR = gql`
  mutation changeAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
      bookCount
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;
