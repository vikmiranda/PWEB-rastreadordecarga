const {Schema, model} = require('mongoose');

const CargaSchema = new Schema({
    cod_rastreamento: String,
    cidade_origem: String,
    cidade_destino: String,
    data_limite: Date,
},
{
    timestamps: true,
    _v: false
});

module.exports = model('Carga', CargaSchema);