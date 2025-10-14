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
    author
    published
  }
}
`

