import React from 'react'

const Course = ({course}) => {
    const exercises = course.parts.map(part => part.exercises)

    const reducer = (accumlator, currentValue) => accumlator + currentValue

    const totalExercises = exercises.reduce(reducer)

    return (
    <div>
        <h1>{course.name}</h1>
        {course.parts.map(part => <p>{part.name} {part.exercises}</p>)}
        <p>Total Exercises: {totalExercises}</p>
    </div>
    )
}

export default Course;
