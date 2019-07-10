const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Give a password as an argument.')
    process.exit(1)
}

const password = process.argv[2]

const url = 
    `mongodb+srv://phonebook:${password}@clusterphonebook-osi1w.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, {useNewUrlParser: true})

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length > 3) {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })
    
    person.save().then(response => {
        console.log(`Added ${response.name} with number: ${response.number} to the Phonebook.`)
        mongoose.connection.close()
    })

} else {
    Person.find({}).then(result => {
        console.log('Phonebook:')
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}
