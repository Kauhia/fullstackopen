import React, { useState, useEffect } from 'react'
import Phonebook from "./phonebookApi";
import "./index.css"

const Notification = ({notification, onChange}) => {
    useEffect(() => {
        setTimeout(() => onChange(null), 5 * 1000)
    }, [notification?.message])

    if (notification === null) return null
    return (
        <div className={notification.kind}>
            {notification.message}
        </div>
    )
}

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


const PhonobookItem = ({record, remove}) => (
    <p>
        {record.name}: {record.number}
        <button onClick={remove}>Delete</button>
    </p>
)

const PhonebookList = ({persons, remove}) => {
    const [filter, setFilter] = useState("")
    
    const filteredPersons = persons
        .filter(({name}) => 
            !filter ||
            name.toLowerCase().includes(filter.toLowerCase()) 
        ).map(p => <PhonobookItem key={p.name} record={p} remove={remove(p)}/>)

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
    const [notification, setNotification] = useState(null) // { message, kind: error || success}

    const fetchPhonebook = async () => {
        const response = await Phonebook.getPersonRecords()
        setPersons(response)
    }

    const deletePerson = (personToDelete) => async () => {
        const confirmed = window.confirm(`Delete user ${personToDelete.name}?`);
        if (confirmed) {
            await Phonebook.deletePersonRecord(personToDelete.id)
            const updatedPersons = persons.filter(person => person.id !== personToDelete.id)
            setPersons(updatedPersons)
        }
    }

    const addPerson = (record) => async (e) => {
        e.preventDefault()
        const personWithSameName = persons.find(person => person.name === record.name)
        const isDuplicate = !!personWithSameName
        const shouldAdd = !isDuplicate

        const duplicateMessage = `${record.name} is already added to phonebook, replace the old number with a new one?`
        const shouldUpdate = isDuplicate && window.confirm(duplicateMessage)
        
        if (shouldAdd) {
            try {
                const res = await Phonebook.addPersonRecord(record)
                setPersons([...persons, res])
                setNotification({ message:`Added ${record.name}`, kind: "success"})
            } catch (error) {
                await fetchPhonebook()
                setNotification({ message:`Failed to added ${record.name}`, kind: "error"})
            }
        }

        if (shouldUpdate) {
            try {
                const res = await Phonebook.updatePersonRecord({...record, id: personWithSameName.id})
                const personsWithoutUpdatedRecord = persons.filter(p => p.id !== personWithSameName.id)
                setPersons([...personsWithoutUpdatedRecord, res])
                setNotification({ message:`Updated ${record.name}`, kind: "success"})    
            } catch (error) {
                await fetchPhonebook()
                setNotification({ message:`Failed to update ${record.name}`, kind: "error"})
            }
        }
    }

    useEffect(() => { 
        fetchPhonebook()
    }, [])

    return (
        <div>
            <Notification
                notification={notification}
                onChange={setNotification}/>
            <PhonebookForm submit={addPerson}/>
            <PhonebookList persons={persons} remove={deletePerson}/>
        </div>
    )
}

export default App