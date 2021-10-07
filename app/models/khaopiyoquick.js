const mongoose = require('mongoose')
const Schema = mongoose.Schema

const khaopiyoquickSchema = new Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
  
})

module.exports = mongoose.model('Khaopiyoquick', khaopiyoquickSchema)