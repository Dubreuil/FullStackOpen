import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

import axios from 'axios'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterValue, setFilterValue ] = useState('')
  const [ personsToDisplay, setPersonsToDisplay ] = useState(persons)

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.filter(person => {return person.name === newName}).length > 0) {
        alert(`${newName} is aleady in the phonebook`)
        return
    }

    setPersons(persons.concat({name:newName, number:newNumber}))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilterValue(event.target.value.toLowerCase())

  useEffect(() => {
    if (persons !== undefined) {
      const displays = persons.filter(person => {
        return person.name.toLowerCase().includes(filterValue)
      })

      setPersonsToDisplay(displays)
    }
  }, [persons, filterValue])

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filterText={filterValue} handleFilterChange={handleFilterChange} />
      <h2>New numbers</h2>
      <PersonForm newName={newName} newNumber={newNumber} submitHandler={addPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <div>
        <Persons persons={personsToDisplay} />
      </div>
    </div>
  )
}

export default App