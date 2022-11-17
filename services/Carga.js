const { cargaModel } = require('../models');

class Carga {
    async criarCarga(bodyOfRequest) {
        try {
            const {
                cod_rastreamento,
                cidade_origem,
                cidade_destino,
                data_limite
            } = bodyOfRequest;

            const novaCarga = new cargaModel({
                cod_rastreamento,
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

            return carga;
        }
        catch (error) {
            throw new Error("Error in pegarCargarPeloId: " + error.message);
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