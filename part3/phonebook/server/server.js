const express = require('express')
const morgan = require('morgan')
const app = express()

const extendedMorganTinyConfig = function (tokens, req, res) {
    const parts = [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms'
    ]
    if (tokens.method(req, res) === 'POST') {
        parts.push(JSON.stringify(req.body))
    }
    return parts.join(' ')
}

app.use(express.json())
app.use(morgan(extendedMorganTinyConfig))
app.use(express.static('../front/build'))

let persons = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
    },
    { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
    },
    { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
    },
    { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
    }
]

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find(p => p.id === id);
    if (person) {
        response.json(person)
    }
    response.status(404).end()
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter(p => p.id !== id);
    response.status(204).end()
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.post('/api/persons', (request, response) => {
    // make very naive checks and exit request using returns
    if (!request.body.name) {
        return response.status(400).json({ error: 'name must exist' })
    }

    const nameInBook = persons.find(p => p.name === request.body.name)
    if (nameInBook) {
        return response.status(400).json({ error: 'name must be unique' })
    }

    if (request.body.number === undefined) {
        return response.status(400).json({ error: 'number must exist' })
    }
    
    const newPerson = { 
        id: Math.random() * 1000 * 1000 * 1000,
        name: request.body.name,
        number: request.body.number
    }
    persons.push(newPerson)
    return response.status(201).json(persons)
})

app.get('/info', (request, response) => {
    const peopleCount = persons.length;
    const time = (new Date()).toString();
    const html = `
        <div>
            <p>Phonebook has info for ${peopleCount} people</p>
            <p>${time}</p>
        </div>
    `
    response.send(html)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})