import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import NumberForm from "./components/Form";
import DisplayPeople from "./components/DisplayPeople";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState("");
  const [newName, setNewName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log(response.data);
      setPersons(response.data);
    });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const [search, setSearch] = useState("");

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.map((person) => person.name).includes(newName)) {
      window.alert(`${newName} is already in the phonebook.`);
      setNewName("");
    } else {
      const personsCurrent = persons.concat({
        name: newName,
        number: phoneNumber,
      });
      setPersons(personsCurrent);
      setNewName("");
      setPhoneNumber("");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={search} onChange={handleSearchChange} />
      <h2>New</h2>
      <NumberForm
        name={newName}
        onName={handleNameChange}
        number={phoneNumber}
        onNumber={handlePhoneNumberChange}
        onSubmit={addPerson}
      />
      <h2>Numbers</h2>
      <DisplayPeople persons={persons} search={search} />
    </div>
  );
};

export default App;
