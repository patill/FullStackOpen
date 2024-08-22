import { useState, useEffect } from "react";
import "./App.css";
import Form from "./components/Form";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notification";
import Error from "./components/Error";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("Type here");
  const [newNumber, setNewNumber] = useState("Numero...");
  const [notification, setNotification] = useState(null);
  const [newError, setNewError] = useState(null);

  const updateHook = () => {
    console.log("effect");
    async function fetchData() {
      const data = await personService.getAll();
      console.log(data);
      setPersons(data);
    }
    fetchData();
  };

  useEffect(updateHook, []);

  console.log("render", persons.length, "entries");

  const handleNameChange = (event) => {
    //console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const addName = (event) => {
    event.preventDefault();
    console.log("addName fired");
    const createName = async (NameObj) => {
      const response = await personService.create(NameObj);
      setPersons(persons.concat(response));
      setNewName("");
      setNewNumber("");
    };
    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      setNewError(`${newName} is already added to phonebook`);
      setTimeout(() => {
        setNewError(null);
      }, 3000);
      setNewName("");
      setNewNumber("");
    } else {
      const NameObj = {
        name: newName,
        number: newNumber,
      };

      createName(NameObj);
      setNotification(`${newName} added succesfully.`);
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const removePerson = async (id) => {
    const filterArray = persons.filter((person) => person.id === id);
    const personToBeDeleted = filterArray[0];
    try {
      if (
        personToBeDeleted &&
        window.confirm(`You want to remove ${personToBeDeleted.name}?`)
      ) {
        await personService.remove(personToBeDeleted.id);
        setPersons(
          persons.filter((person) => person.id !== personToBeDeleted.id)
        );
        setNotification(`${personToBeDeleted.name} removed succesfully.`);
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Error message={newError} />
      <Form
        addname={addName}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} onDelete={removePerson} />
    </div>
  );
};

export default App;
