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
    <div key={person.id}>{person.name} {person.number} <button value={person.name} id={person.id} onClick={onClick}>delete</button> </div>)}
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
      window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)
      const person = persons.find(person => person.name === newName)
      const changedPerson = { ...person, number: newNumber}
      
      personService
        .update(person.id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.name === newName ? returnedPerson : person))
        })
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
    if (window.confirm(`Delete ${event.target.value} ?`)) {
      personService.deletion(event.target.id)
      setPersons(persons.filter(person => person.id !== event.target.id))
    }
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
