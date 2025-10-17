import { useState, useEffect } from "react"
import { useMutation, useQuery } from "@apollo/client/react"
import { AUTHORS, UPDATE_BIRTH_YEAR } from "../queries"

const Authors = ({ show }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const { loading, data } = useQuery(AUTHORS)

  const [ updateBirthYear, result ] = useMutation(UPDATE_BIRTH_YEAR, {
    refetchQueries: [ { query: AUTHORS }],
    onError: (error) => {
      console.log(error)
    }
  })

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      console.log('person not found')
    }
  }, [result.data])

  if (!show) {
    return null
  }

  if (loading) {
    return <div>loading...</div>
  }

  const submit = async (event) => {
    event.preventDefault()

    await updateBirthYear({ variables: { name, setBornTo: Number(born) }})
    setName('')
    setBorn('')
  }

  const authors = data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
          <div>name <input value={name} onChange={({ target }) => setName(target.value)}/></div>
          <div>born <input value={born} onChange={({ target }) => setBorn(target.value)}/></div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
