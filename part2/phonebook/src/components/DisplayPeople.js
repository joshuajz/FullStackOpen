import React from 'react'

const DisplayPeople = ({persons, search}) => {
    const displayPeople = () => {
        var people = []
        for (let i = 0; i < persons.length; i++) {
          if (persons[i].name.toLowerCase().includes(search.toLowerCase())) {
            people = people.concat(persons[i])
          }
        }
        return people
      }

    return (
        <>
            {displayPeople().map(person => <p key={person.name}>{person.name} {person.phoneNumber}</p>)}
        </>
    )
}

export default DisplayPeople;
