import React, { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ]) 
    const [newName, setNewName] = useState('')

    const phoneNumberOnChange = (event) => setNewName(event.target.value)
    const onFormSubmitClick = (e) => {
        e.preventDefault()
        if (persons.some(person => person.name === newName)) {
            alert(`${newName} is already added to phonebook`);
        } else {
            setPersons([...persons, { name: newName }])
        }
    }

    const PhoneNumber = ({name}) => <p key={name}>{name}</p>

    return (
        <div>
            <h2>Phonebook</h2>
            <form>
                <div>
                    name: <input value={newName} onChange={phoneNumberOnChange} />
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