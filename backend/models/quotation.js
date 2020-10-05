const mongoose = require('mongoose')

const quotationScheme = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    info: String,
    valid: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('Quotation', quotationScheme)