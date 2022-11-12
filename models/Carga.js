const mongoose = require('mongoose');

const Carga = mongoose.model('Carga', {
    cod_rastreamento: String,
    cidade_origem: String,
    cidade_destino: String,
    data_limite: Date,
})

module.exports = Carga;