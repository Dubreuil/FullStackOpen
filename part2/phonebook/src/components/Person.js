import React from 'react'

const Person = ({ person, deleteHandler }) => {
    return (
        <div>
            <span>{person.name} {person.number}</span>
            <button onClick={deleteHandler}>Delete</button>
        </div>
    )
}

export default Person