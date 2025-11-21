import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Notify from "./components/Notify";
import Recommendations from "./components/Recommendations";
import { useApolloClient, useSubscription } from "@apollo/client/react";
import { BOOK_ADDED, BOOKS } from "./queries";

export const updateCache = (cache, query, addedBook) => {
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  const dataInCache = cache.readQuery(query)

  cache.writeQuery({
    ...query,
    data: {
      allBooks: uniqByName(dataInCache.allBooks.concat(addedBook))
    }
  })
}

const App = () => {
  const [page, setPage] = useState("authors");
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(() => {
    return localStorage.getItem("phonenumbers-user-token");
  })
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      notify(`${addedBook.title} added`)
      updateCache(client.cache, { query: BOOKS }, addedBook)
    }
  })

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  return (
    <div>
      <div>
        <Notify errorMessage={errorMessage}/>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommended")}>recommend</button>
            <button onClick={() => {
              setToken(null)
              localStorage.clear()
              client.resetStore()
              setPage("authors")
            }}>log out</button>
          </>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      <Authors show={page === "authors"}/>

      <Books show={page === "books"} />

      {token ? <NewBook show={page === "add"} /> : null}

      {token ? <Recommendations show={page === "recommended"} /> : null}
    
      <LoginForm setError={notify} show={page === "login"} setToken={setToken}/>
    </div>
  );
};

export default App;
