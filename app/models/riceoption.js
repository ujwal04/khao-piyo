const mongoose = require('mongoose')
const Schema = mongoose.Schema

const riceoptionSchema = new Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
  
})

module.exports = mongoose.model('Riceoption', riceoptionSchema)