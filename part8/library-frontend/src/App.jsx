import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Notify from "./components/Notify";
import Recommendations from "./components/Recommendations";
import { useApolloClient } from "@apollo/client/react";

const App = () => {
  const [page, setPage] = useState("authors");
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(() => {
    return localStorage.getItem("phonenumbers-user-token");
  })
  const client = useApolloClient()

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
