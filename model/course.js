const { Schema, model } = require('mongoose')

const courseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    categoryID: {
        type: String,
        required: true
    },
    image: String
})

module.exports = model('course', courseSchema)