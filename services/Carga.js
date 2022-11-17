const { cargaModel } = require('../models');
const cod_rastreio = require('../script/codigoRastreamentoAleatorio');

class Carga {
    async criarCarga(bodyOfRequest) {
        try {
            const new_cod_rastreio = await cod_rastreio();
            const {
                cidade_origem,
                cidade_destino,
                data_limite
            } = bodyOfRequest;

            const novaCarga = new cargaModel({
                cod_rastreamento: new_cod_rastreio,
                cidade_origem,
                cidade_destino,
                data_limite
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

    async atualizarCarga(bodyOfRequest) {
        try {
            const {
                id,
                cod_rastreamento,
                cidade_origem,
                cidade_destino,
                data_limite
            } = bodyOfRequest;

            const carga = await cargaModel.findByIdAndUpdate(id, {
                    cod_rastreamento,
                    cidade_origem,
                    cidade_destino,
                    data_limite
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