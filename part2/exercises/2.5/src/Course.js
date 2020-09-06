import React from 'react'

const Course = ({ course }) => {
    let partsLines = course.parts.map(part => {
        return (
          <p key={ part.id }>{ part.name } { part.exercises}</p>
        )
    })

    let totalExercices = course.parts.reduce((sum, part) => {
        return sum + part.exercises
    }, 0)

    return (
        <div>
            <h1>{ course.name }</h1>
            <div>
                { partsLines }
            </div>
            <p>Total exercices: {totalExercices}</p>
        </div>
    )
}

export default Course