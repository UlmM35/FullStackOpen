const { PubSub } = require("graphql-subscriptions")
const pubsub = new PubSub()

const { GraphQLError, subscribe } = require("graphql")
const jwt = require("jsonwebtoken")
const Author = require("./models/author")
const Book = require("./models/book")
const User = require("./models/user")

const resolvers = {
  Query: {
    bookCount: async () => await Book.collection.countDocuments(),
    authorCount: async () => await Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const { author, genre } = args

      let authorFilter = {}
      if (author) {
        const authorDoc = await Author.findOne({ name: author })
        if (!authorDoc) {
          return []
        }
        authorFilter.author = authorDoc._id
      }

      let genreFilter = {}
      if (genre) {
        genreFilter.genres = { $in: [genre] }
      }

      return await Book.find({ ...authorFilter, ...genreFilter }).populate("author")
    },
    allAuthors: async () => await Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Author: {
    bookCount: (root) => Book.collection.countDocuments({ author: root._id })
  },
  Mutation: {
    addBook: async (root, args, context) => {
        const currentUser = context.currentUser

        if (!currentUser) {
          throw new GraphQLError('not authenticated', {
            extensions: {
              code: 'BAD_USER_INPUT',
            }
          })
        }

        let author = await Author.findOne({ name: args.author})
        if (!author) {
            author = new Author({ name: args.author })
            await author.save()
        }

        const book = new Book({ ...args, author: author._id })

        try {
          await book.save()
        } catch (error) {
          throw new GraphQLError("Saving book failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: { ...args },
              error
            }
          })
        }

        pubsub.publish("BOOK_ADDED", { bookAdded: book })

        return book.populate("author")
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser

        if (!currentUser) {
          throw new GraphQLError('not authenticated', {
            extensions: {
              code: 'BAD_USER_INPUT',
            }
          })
        }
      
      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }
      author.born = args.setBornTo
      try {
        await author.save()
      } catch (error) {
        throw new GraphQLError("Saving author failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidargs: args.name,
            error
          }
        })
      }

      return author
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      try {
        const savedUser = await user.save()
        return savedUser
      } catch (error) {
        throw new GraphQLError("Creating the user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
            error
          }
        })
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== "secret" ) {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT"
          }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterableIterator('BOOK_ADDED')
    },
  },
}

module.exports = resolvers