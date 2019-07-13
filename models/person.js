const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const databaseUrl = process.env.MONGODB_URI

mongoose.set('useFindAndModify', false)

mongoose.connect(databaseUrl, {useNewUrlParser: true})
    .then(result => {
        console.log('Connected to MongoDB')
    })
    .catch(error => {
        console.log('Error occured when trying to connect to the MOongoDB', error.message)
    })

const personSchema = new mongoose.Schema({
    name: {type: String, minlength: 3, unique: true},
    number: {type: String, minlength: 8}
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

personSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Person', personSchema)
