const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
//const morgan = require('morgan')

app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())
/* 
morgan.token('data', (req, res) => JSON.stringify(req.body))
app.use(morgan((tokens, req, res) => {
    return [
        tokens.method(req,res),
        tokens.url(req,res),
        tokens.status(req,res),
        tokens.res(req,res, 'content-length'), '-',
        tokens['response-time'](req,res), 'ms',
        tokens['data'](req, res)
    ].join(' ')
})) */

let contacts = [
    {
        "name": "Ada Lovelace",
        "number": "12-21-321243",
        "id": 1
    },
    {
        "name": "Anna Winlock",
        "number": "11-22-112211",
        "id": 2
    },
    {
        "name": "Marlyn Meltzer",
        "number": "33-23-456344",
        "id": 3
    },
    {
        "name": "Betty Holberton",
        "number": "55-15-561123",
        "id": 4
    },
]

app.get('/info', (request, response) => {
    const time = new Date()
    response.send(`
        <p>Phonebook has info for ${contacts.length} people<p>
        <p>${time}<p>
    `)
})

app.get('/api/persons', (request, response) => {
    response.send(contacts)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const contact = contacts.find(contact => contact.id === id)

    if (contact) {
        response.send(contact)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    contacts = contacts.filter(contact => contact.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name and/or number missing!'
        })
    }

    if (contacts.find(contact => contact.name === body.name)) {
        return response.status(400).json({
            error: 'name already added to the Phonebook'
        })
    }

    const randomId = Math.floor(Math.random() * Math.floor(999))

    const contact = {
        name: body.name,
        number: body.number,
        id: randomId
    }

    contacts = contacts.concat(contact)
    response.json(contact)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`)
})