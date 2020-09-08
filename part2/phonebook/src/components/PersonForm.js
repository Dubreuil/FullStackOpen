import React from 'react'

const PersonForm = ({newName, newNumber, submitHandler, handleNameChange, handleNumberChange}) => {
    return (
        <form onSubmit={submitHandler}>
            <div>name: <input value={newName} onChange={handleNameChange} /></div>
            <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    )
}

export default PersonForm