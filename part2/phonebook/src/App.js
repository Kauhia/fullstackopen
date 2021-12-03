import React, { useState } from 'react'


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
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState("")

    const filteredPersons = persons
        .filter(({name}) => 
            !filter ||
            name.toLowerCase().includes(filter.toLowerCase()) 
        )


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