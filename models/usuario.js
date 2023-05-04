const mongoose = require('mongoose');
// const validator = require('validator')

const UsuarioSchema = mongoose.Schema({
    nombre : {
        type : String,
        required : true,
        unique : true,
        lowerCase : true,
    },
    edad : {
        type : Number
    },

    email : {
        type : String,
        required : true,
        unique : true,
        lowerCase : true,
        // validate : (value) => {
        //     return validator.isEmail(value)
        // }
    }
})


const Usuario = mongoose.model('Usuario',UsuarioSchema);

module.exports = {
    Usuario
}