import { gql } from "@apollo/client"

export const AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
  }
}
`

export const BOOKS = gql`
query {
  allBooks {
    title
    author {
      name
    }
    published
    genres
  }
}
`

export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author
      published
      genres
    }
  }
`

export const UPDATE_BIRTH_YEAR = gql`
  mutation updateAuthor(
    $name: String!
    $setBornTo: Int!
  ) {
    editAuthor(
      name: $name,
      setBornTo: $setBornTo
    ) {
      name
      born
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const ME = gql`
query {
  me {
    favoriteGenre
  }
}
`