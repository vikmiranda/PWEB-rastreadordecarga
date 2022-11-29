const {Schema, model} = require('mongoose');
const Rota = require('./Rota');


const CargaSchema = new Schema({
    cod_rastreamento: String,
    cidade_origem: String,
    cidade_destino: String,
    data_limite: Date,
    rota: {type: [Rota.schema]},
    status: String,
    historico: [
        {
            nome_local: String,
            data_local: Date,
            evento_local: String,
        }
    ]
},

{
    timestamps: true,
    _v: false
});

module.exports = model('Carga', CargaSchema);