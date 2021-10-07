const mongoose = require('mongoose')
const Schema = mongoose.Schema

const thaliSchema = new Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
  
})

module.exports = mongoose.model('Thali', thaliSchema)