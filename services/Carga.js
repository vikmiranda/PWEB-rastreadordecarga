const { cargaModel, rotaModel } = require('../models');
const cod_rastreio = require('../script/codigoRastreamentoAleatorio');
const Rota = require('./Rota');

class Carga {
    async criarCarga(bodyOfRequest) {
        try {
            const new_cod_rastreio = await cod_rastreio();
            const {
                cidade_origem,
                cidade_destino,
                data_limite,
            } = bodyOfRequest;

            const novaCarga = new cargaModel({
                cod_rastreamento: new_cod_rastreio,
                cidade_origem,
                cidade_destino,
                data_limite,
                status: 'registrado',
                Rota,
                historico: []
            });

            const carga = await novaCarga.save();

            return carga;
        }
        catch (error) {
            throw new Error("Error in criarCarga: " + error.message);
        }
    }

    async listarCarga() {
        try {
            const carga = await cargaModel.find();

            return carga;
        }
        catch (error) {
            throw new Error("Error in listarCarga: " + error.message);
        }
    }

    async pegarCargarPeloId(id) {
        try {
            const carga = await cargaModel.findById(id);

            if(!carga) {
                throw new Error("Id not found");
            }

            return carga;
        }
        catch (error) {
            throw new Error("Error in pegarCargarPeloId: " + error.message);
        }
    }


    async pegarCargarPeloCodRastreio(cod_rastreio) {
        try {
            const carga = await cargaModel.findOne({
                cod_rastreamento: cod_rastreio
            });

            if(!carga) {
                throw new Error("Tracking code not found");
            }

            return carga;
        }
        catch (error) {
            throw new Error("Error in pegarCargarPeloCodRastreio: " + error.message);
        }
    }

    async pegarCargasRegistrada() {
        try {
            const carga = await cargaModel.find({
                status: 'registrado'
            });

            if(!carga) {
                throw new Error("Nenhuma Carga com Status 'Registrado' ");
            }

            return carga;
        }
        catch (error) {
            throw new Error("Error in pegarCargasRegistrada: " + error.message);
        }
    }

    async pegarCargasCaminho() {
        try {
            const carga = await cargaModel.find({
                status: 'em caminho'
            });

            if(!carga) {
                throw new Error("Nenhuma Carga com Status 'Em Caminho' ");
            }

            return carga;
        }
        catch (error) {
            throw new Error("Error in pegarCargasCaminho: " + error.message);
        }
    }

    
    async pegarCargasEntregue() {
        try {
            const carga = await cargaModel.find({
                status: 'entregue'
            });

            if(!carga) {
                throw new Error("Nenhuma Carga com Status 'Entregue' ");
            }

            return carga;
        }
        catch (error) {
            throw new Error("Error in pegarCargasEntregue: " + error.message);
        }
    }




    async atualizarCarga(bodyOfRequest) {
        try {
            const {
                id,
                cod_rastreamento,
                cidade_origem,
                cidade_destino,
                data_limite,
                status,
                rota,
                historico
            } = bodyOfRequest;

            const dadosrota = await rotaModel.findById(rota);
    
            const carga = await cargaModel.findByIdAndUpdate(id, {
                    cod_rastreamento,
                    cidade_origem,
                    cidade_destino,
                    data_limite,
                    status,
                    rota: dadosrota,
                    historico
                },
                {
                    new: true
                });

            return carga;
        }
        catch (error) {
            throw new Error("Error in atualizarCarga: " + error.message);
        }
    }

    async deletarCarga(id) {
        try {
            const carga = await cargaModel.findByIdAndRemove(id);

            return carga;
        }
        catch (error) {
            throw new Error("Error in deletarCarga: " + error.message);
        }
    }
}

module.exports = new Carga();