import React from 'react'

const Course = ({course}) => {
    const exercises = course.parts.map(part => part.exercises)
    var totalExercises = 0
    for (let i = 0; i < exercises.length; i++) {
        totalExercises += exercises[i]
    }

    return (
    <div>
        <h1>{course.name}</h1>
        {course.parts.map(part => <p>{part.name} {part.exercises}</p>)}
        <p>Total Exercises: {totalExercises}</p>
    </div>
    )
}

export default Course;
