import axios from 'axios'
import { useState, useEffect } from 'react'

const Filter = ({ value, onChange }) => <div>filter shown with <input value={value} onChange={onChange}/></div>

const PersonForm = ({onSubmit, value, value1, onChange, onChange1}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>name: <input value={value} onChange={onChange} /></div>
      <div>number: <input value={value1} onChange={onChange1} /></div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

const Persons = ({persons}) => <div>{persons.map(person => <div key={persons.indexOf(person)}>{person.name} {person.number}</div>)}</div>

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('enter a name')
  const [newNumber, setNewNumber] = useState('enter a number')
  const [newString, setNewString] = useState('')
  const [showName, setShowName] = useState(false)

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addInfo = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const nameObj = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(nameObj))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleStringChange = (event) => {
    setNewString(event.target.value)
  }

  const personsToShow = showName ? persons : persons.filter(person => person.name.toLowerCase().includes(newString.toLowerCase()))
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newString} onChange={handleStringChange} />
      <h2>add a new</h2>
      <PersonForm onSubmit={addInfo} value={newName} value1={newNumber} onChange={handleNameChange} onChange1={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App
