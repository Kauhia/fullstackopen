import React, { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: "020202" }
    ]) 
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const nameOnChange = (event) => setNewName(event.target.value)
    const phoneNumberOnChange = (event) => setNewNumber(event.target.value)

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
            {persons.map(PhoneNumber)}
        </div>
    )
}

export default App