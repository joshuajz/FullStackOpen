import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', phoneNumber: '39-44-5323523' }
  ])
  const [ newName, setNewName ] = useState('')

  const handleNoteChange = (event) => {
    setNewName(event.target.value)
  }

  const [ phoneNumber, setPhoneNumber] = useState('')

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.map(person => person.name).includes(newName)){
      window.alert(`${newName} is already in the phonebook.`)
      setNewName("")
    }
    else {
      const personsCurrent = persons.concat({name: newName, phoneNumber: phoneNumber})
      setPersons(personsCurrent)
      setNewName("")
      setPhoneNumber("")
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          Name: <input value={newName} onChange={handleNoteChange}/>
        </div>
        <div>
          Phone Number: <input value={phoneNumber} onChange={handlePhoneNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p>{person.name} {person.phoneNumber}</p>)}
    </div>
  )
}

export default App
