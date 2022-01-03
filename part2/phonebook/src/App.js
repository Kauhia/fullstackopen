import React, { useState, useEffect } from 'react'
import Phonebook from "./phonebookApi";

const PhonebookForm = ({submit}) => {
    // Add phone number
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const phoneNumberRecord = { name: newName, number: newNumber }

    // HTML functions
    const nameOnChange = (event) => setNewName(event.target.value)
    const numberOnChange = (event) => setNewNumber(event.target.value)
    
    return (
        <div>
            <h2>Phonebook form</h2>
            <form>
                <div>
                    name: <input value={newName} onChange={nameOnChange} />
                </div>
                <div>
                    number: <input value={newNumber} onChange={numberOnChange} />
                </div>
                <div>
                    <button onClick={submit(phoneNumberRecord)} type="submit">add</button>
                </div>
            </form>
        </div>
    )
}


const PhonobookItem = ({name, number, remove}) => (
    <p>
        {name}: {number}
        <button onClick={remove}>Delete</button>
    </p>
)

const PhonebookList = ({persons, remove}) => {
    const [filter, setFilter] = useState("")
    
    const filteredPersons = persons
        .filter(({name}) => 
            !filter ||
            name.toLowerCase().includes(filter.toLowerCase()) 
        ).map(p => <PhonobookItem key={p.name} name={p.name} number={p.number} remove={remove(p)}/>)

    const filterOnChange = (event) => setFilter(event.target.value)
    return (
        <div>
            <h2>Numbers</h2>
            <div>
                filter by name: <input value={filter} onChange={filterOnChange} />
            </div>
            {filteredPersons}
        </div>
    )
    
}


const App = () => {
    const [persons, setPersons] = useState([])
    useEffect(() => {
        (async () => { // Make some magic to avoid react warning about async
            const response = await Phonebook.getPersonRecords()
            setPersons(response)
        })()
    }, [])

    const deletePerson = (personToDelete) => async () => {
        const confirmed = window.confirm(`Delete user ${personToDelete.name}?`);
        if (confirmed) {
            const res = await Phonebook.deletePersonRecord(personToDelete.id)
            const updatedPersons = persons.filter(person => person.id !== personToDelete.id)
            setPersons(updatedPersons)
        }
    }

    const addPerson = (record) => async (e) => {
        e.preventDefault()
        if (persons.some(person => person.name === record.newName)) {
            alert(`${record.newName} is already added to phonebook`);
        } else {
            await Phonebook.addPersonRecord(record)
            setPersons([...persons, record])
        }
    }

    return (
        <div>
            <PhonebookForm submit={addPerson}/>
            <PhonebookList persons={persons} remove={deletePerson}/>
        </div>
    )
}

export default App