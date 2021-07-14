import React, { useState } from 'react'
import Filter from './components/Filter'
import NumberForm from './components/Form'
import DisplayPeople from './components/DisplayPeople'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', phoneNumber: '39-44-5323523' }
  ])
  const [ newName, setNewName ] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const [ phoneNumber, setPhoneNumber] = useState('')

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value)
  }

  const [ search, setSearch] = useState('')

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
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
      <Filter value={search} onChange={handleSearchChange}/>
      <h2>New</h2>
      <NumberForm name={newName} onName={handleNameChange} number={phoneNumber} onNumber={handlePhoneNumberChange} onSubmit={addPerson}/>
      <h2>Numbers</h2>
      <DisplayPeople persons={persons} search={search}/>
    </div>
  )
}

export default App
