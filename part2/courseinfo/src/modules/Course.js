import React from 'react'

const Course = ({courses}) => {
    return (
    <div>
        {courses.map(course => <CreateCourse course={course} key={course.id}/>)}
    </div>
    )
}

const CreateCourse = ({course}) => {
    const totalExercises = (parts) => {
        const exercises = parts.map(part => part.exercises)
        const reducer = (accumlator, currentValue) => accumlator + currentValue
        return exercises.reduce(reducer)
    }

    return (
        <div>
            <h1>{course.name}</h1>
            {course.parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)}
            <p><b>Total Exercises: {totalExercises(course.parts)}</b></p>
        </div>
    )
}

export default Course;
