require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const Person = require('./models/person')
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

// 3:13 puhelinluettelo ja tietokanta step1 (fetch all people saved in the phonebook)
app.get('/api/persons', (request, response) => {
    Person.find({}).then(people => {
        response.send(people.map(person => person.toJSON()))
    })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person.toJSON())
    })
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

  /*   if (Person.find({name: body.name})) {
        return response.status(400).json({
            error: 'name already added to the Phonebook'
        })
    } */

    const person = new Person({
        name: body.name,
        number: body.number
    }) 

    person.save().then(savedPerson => {
        response.json(savedPerson.toJSON())
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`)
})