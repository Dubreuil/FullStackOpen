import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import Notification from './components/Notification'

import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterValue, setFilterValue ] = useState('')
  const [ personsToDisplay, setPersonsToDisplay ] = useState(persons)
  const [ notificationMessage, setNotificationMessage ] = useState(null)
  const [ notificationType, setNotificationType ] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const person = persons.find(p => p.name === newName)

    if (person !== undefined) {
        if (window.confirm(`${newName} is aleady in the phonebook, do you want to update their phone number?`)) {
          
          const changedPerson = { ...person, number:newNumber }
          
          personService
            .update(person.id, changedPerson)
            .then(updatedPerson => {
              setPersons(persons.map(p => p.id !== updatedPerson.id ? p : updatedPerson))
              setNotificationType("success")
              setNotificationMessage(`${updatedPerson.name} was updated`)
              setTimeout(() => {
                setNotificationMessage(null)
              }, 5000)
            })
            .catch(() => {
              setPersons(persons.filter(p => p.id !== person.id))
              setNotificationType("failure")
              setNotificationMessage(`${changedPerson.name} was previously deleted`)
              setTimeout(() => {
                setNotificationMessage(null)
              }, 5000)
            })
        }
    }

    else {
      const personObject = {name:newName, number:newNumber}
      
      personService
        .create(personObject)
        .then(createdPerson => {
          setPersons(persons.concat(createdPerson))
          setNotificationType("success")
          setNotificationMessage(`${createdPerson.name} was added`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
    }

    setNewName('')
    setNewNumber('')
  }

  const removePerson = id => {
    if (window.confirm("Really delete this user?")) {
      personService
        .remove(id)
        .then(() => {
          personService
            .getAll()
            .then(persons => {
            setPersons(persons)
          })
        })
    }
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
      <Notification type={notificationType} message={notificationMessage} />
      <Filter filterText={filterValue} handleFilterChange={handleFilterChange} />
      <h2>New numbers</h2>
      <PersonForm newName={newName} newNumber={newNumber} submitHandler={addPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <div>
        {personsToDisplay.map(person => {
          return (<Person key={person.name} person={person} deleteHandler={() => removePerson(person.id) } />)
          })
        }
      </div>
    </div>
  )
}

export default App