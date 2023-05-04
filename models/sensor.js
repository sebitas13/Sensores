
const mongoose = require('mongoose');

const sensorSchema = mongoose.Schema({

    temperatura : {
        type : Number
    },

    pir : {
        type : Number
    },

    fecha : {
        type : Date,
        default : Date.now
    }
});


const Sensor = mongoose.model('Sensor',sensorSchema);

module.exports = {
    Sensor
}