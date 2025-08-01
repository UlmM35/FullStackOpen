const express = require('express')
const morgan = require('morgan')
const app = express()

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(express.json())
app.use(express.static('dist'))

morgan.token('type', (req, res) => {
    return `${JSON.stringify(req.body)}`
})

app.use(morgan(':method :url :status :response-time :req[head] :type'))

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    response.send(`
        <div>
            <div>Phonebook has info for ${persons.length}</div>
            <div>${new Date()}</div>
        </div>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find((person) => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

const generateId = () => {
    const maxId = Math.floor(Math.random() * 42069)
    return String(maxId)
}

app.post('/api/persons', (request, response) => {
    const body = request.body
    console.log(request.body)

    if (!body.name || !body.number) {
        return response.status(400).json({error: 'content missing'})
    } else if (persons.some(person => person.name === body.name)) {
        return response.status(403).json({error: 'name must be unique'})
    }
    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)
    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter((person) => person.id !== id)
    response.status(204).end()
})


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})