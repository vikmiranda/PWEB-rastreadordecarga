const {Schema, model} = require('mongoose');

const UsuarioSchema = new Schema({
    user: String,
    password: String
},
{
    timestamps: true,
    _v: false
});

module.exports = model('User', UsuarioSchema);