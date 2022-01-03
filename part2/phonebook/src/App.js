import React, { useState, useEffect } from 'react'
import Phonebook from "./phonebookApi";

const PersonFilter = ({value, onChange}) => (
    <div>
        filter by name: <input value={value} onChange={onChange} />
    </div>
)

const PhonebookForm = ({nameValue, nameOnChange, numberValue, numberOnChange, submit}) => (
    <form>
        <div>
            name: <input value={nameValue} onChange={nameOnChange} />
        </div>
        <div>
            number: <input value={numberValue} onChange={numberOnChange} />
        </div>
        <div>
            <button onClick={submit} type="submit">add</button>
        </div>
    </form>
)
const PhonobookItem = ({name, number}) => <p key={name}>{name}: {number}</p>
const PhonebookList = ({persons}) => persons.map(PhonobookItem)



const App = () => {
    // Add phone number
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    // Filter and view phone numbers
    const [filter, setFilter] = useState("")
    const [persons, setPersons] = useState([])
    const filteredPersons = persons
        .filter(({name}) => 
            !filter ||
            name.toLowerCase().includes(filter.toLowerCase()) 
        )

    useEffect(() => {
        (async () => { // Make some magic to avoid react warning about async
            const response = await Phonebook.getPersonRecords()
            setPersons(response)
        })()
    }, [])

    // HTML functions
    const nameOnChange = (event) => setNewName(event.target.value)
    const phoneNumberOnChange = (event) => setNewNumber(event.target.value)
    const filterOnChange = (event) => setFilter(event.target.value)

    const onFormSubmitClick = async (e) => {
        e.preventDefault()
        if (persons.some(person => person.name === newName)) {
            alert(`${newName} is already added to phonebook`);
        } else {
            const newPersonRecord = { name: newName, number: newNumber }
            await Phonebook.addPersonRecord(newPersonRecord)
            setPersons([...persons, newPersonRecord])
        }
    }

    return (
        <div>
            <h2>Phonebook form</h2>
            <PhonebookForm
                nameValue={newName} 
                nameOnChange={nameOnChange}
                numberValue={newNumber}
                numberOnChange={phoneNumberOnChange}
                submit={onFormSubmitClick}/>
            <h2>Numbers</h2>
            <PersonFilter value={filter} onChange={filterOnChange} />
            <PhonebookList persons={filteredPersons} filter={filter}/>
        </div>
    )
}

export default App