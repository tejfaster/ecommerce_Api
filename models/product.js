const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    cat: {
        type: Array
    },
    size: {
        type: String,
    },
    color: {
        type: String,
    },
    price: {
        type: String,
    },
},
    { timestamps: true }
)

module.exports = mongoose.model('Product', ProductSchema)