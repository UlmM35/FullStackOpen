import axios from 'axios'
import { useState, useEffect } from 'react'
import personService from './services/persons'

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

const Persons = ({persons, onClick}) => {
  return (
  <div>{persons.map(person => 
    <div key={persons.indexOf(person)}>{person.name} {person.number} <button id="delete" onClick={onClick}>delete</button> </div>)}
  </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('enter a name')
  const [newNumber, setNewNumber] = useState('enter a number')
  const [newString, setNewString] = useState('')
  const [showName, setShowName] = useState(false)

  useEffect(() => {
    personService.getAll().then((intialPersons) => {
      setPersons(intialPersons)
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
      number: newNumber,
    }
    personService
      .create(nameObj)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
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

  const handleDeletion = (event) => {
    const deleteButton = document.querySelector("#delete")
    deleteButton.addEventListener('click', () => {
      window.confirm(`Delete '${event.target.person.name}' ?`)
    })
  }

  const personsToShow = showName ? persons : persons.filter(person => person.name.toLowerCase().includes(newString.toLowerCase()))
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newString} onChange={handleStringChange} />
      <h2>add a new</h2>
      <PersonForm onSubmit={addInfo} value={newName} value1={newNumber} onChange={handleNameChange} onChange1={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} onClick={handleDeletion}/>
    </div>
  )
}

export default App
