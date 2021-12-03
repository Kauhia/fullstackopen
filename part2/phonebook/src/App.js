import React, { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState("")

    const nameOnChange = (event) => setNewName(event.target.value)
    const phoneNumberOnChange = (event) => setNewNumber(event.target.value)
    const filterOnChange = (event) => setFilter(event.target.value)

    const onFormSubmitClick = (e) => {
        e.preventDefault()
        if (persons.some(person => person.name === newName)) {
            alert(`${newName} is already added to phonebook`);
        } else {
            setPersons([...persons, { name: newName, number: newNumber }])
        }
    }

    const PhoneNumber = ({name, number}) => <p key={name}>{name}: {number}</p>

    return (
        <div>
            <h2>Phonebook</h2>
            <form>
                <div>
                    name: <input value={newName} onChange={nameOnChange} />
                </div>
                <div>
                    number: <input value={newNumber} onChange={phoneNumberOnChange} />
                </div>
                <div>
                    <button onClick={onFormSubmitClick} type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <div>
                filter by name: <input value={filter} onChange={filterOnChange} />
            </div>
            {
                persons
                    .filter(({name}) => 
                        !filter ||
                        name.toLowerCase().includes(filter.toLowerCase()) 
                    )
                    .map(PhoneNumber)
            }
        </div>
    )
}

export default App