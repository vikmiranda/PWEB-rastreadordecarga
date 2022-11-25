const {Schema, model} = require('mongoose');

const NavioSchema = new Schema({
    nome_navio: String,
    rota: [
        {
            cidade: String,
            dias: String,
        }
    ]
},

{
    timestamps: true,
    _v: false
});

module.exports = model('Navio', NavioSchema);