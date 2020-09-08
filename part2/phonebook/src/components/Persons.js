import React from 'react'
import Person from './Person'

const Persons = ({ persons }) => {
    let personsDisplay = persons.map(person => {
        return <Person key={person.name} person={person} />
    })

    return personsDisplay
}

export default Persons