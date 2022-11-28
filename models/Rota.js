const {Schema, model} = require('mongoose');

const RotaSchema = new Schema({
    nome: String,
    cidade: [
        {
            posicao_cidade: String,
            nome_cidade: String,
        }
    ],
},

{
    timestamps: true,
    _v: false
});

module.exports = model('Rota', RotaSchema);