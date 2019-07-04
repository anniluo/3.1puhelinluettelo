const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

const contacts = [
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

app.get('/api', (request, response) => {
    response.send('<h3>"REST" api for contacts</h3>')
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

const PORT = 3001
app.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`)
})