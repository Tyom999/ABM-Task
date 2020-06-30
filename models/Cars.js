const mongoose = require('mongoose');

const carSchema = mongoose.Schema({
    productImage: {
      type: [String]
    },
    typeCar: {
        type: String,
        enum: ["Sale", "Rent"],
        default: "Sale"
    },
    mark: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    engine: {
        type: String,
        required: true
    },
    gearbox: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }

});

module.exports = mongoose.model('carModel', carSchema);
