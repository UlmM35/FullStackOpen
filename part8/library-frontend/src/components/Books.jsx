import { useQuery } from "@apollo/client/react"
import { BOOKS } from "../queries"
import { useState } from "react"

const Books = ({ show }) => {
  const [filter, setFilter] = useState("")
  const { loading, data } = useQuery(BOOKS)
  
  if (!show) {
      return null
  }
  
  if (loading) {
      return <div>loading...</div>
  }
  
  const books = data.allBooks

  const genres = [...new Set(books.flatMap((b) => b.genres))]

  const booksToShow = filter ? books.filter((b) => b.genres.includes(filter)) : books

  const handleClick = (e) => {
    e.preventDefault()
    setFilter(e.target.value)
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToShow.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((a) => (
        <button key={genres.indexOf(a)} value={a} onClick={handleClick}>{a}</button>
      ))}
      <button onClick={handleClick} value={""}>all genres</button>
    </div>
  )
}

export default Books
