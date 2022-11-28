const { rotaModel } = require('../models');

class Rota {
    async criarRota(bodyOfRequest) {
        try {
            const {
                nome,
                cidade
            } = bodyOfRequest;

            const novaRota = new rotaModel({
                nome,
                cidade
            });

            const rota = await novaRota.save();
            return rota;
        }
        catch (error) {
            throw new Error("Error in criarRota: " + error.message);
        }
    }

    async listarRotas() {
        try {
            const rotas = await rotaModel.find();

            return rotas;
        }
        catch (error) {
            throw new Error("Error in listarRotas: " + error.message);
        }
    }

    async pegarRotaPeloId(id) {
        try {
            const rota = await rotaModel.findById(id);

            if(!rota) {
                throw new Error("Id not found");
            }

            return rota;
        }
        catch (error) {
            throw new Error("Error in pegarRotaPeloId: " + error.message);
        }
    }

    async atualizarRota(bodyOfRequest) {
        try {
            const {
                id,
                nome,
                cidade: [posicao_cidade, nome_cidade]
            } = bodyOfRequest;

            const rota = await rotaModel.findByIdAndUpdate(id, {
                    nome,
                    cidade: [posicao_cidade, nome_cidade]
                },
                {
                    new: true
                });

            return rota;
        }
        catch (error) {
            throw new Error("Error in atualizarRota: " + error.message);
        }
    }

    async deletarRota(id) {
        try {
            const rota = await rotaModel.findByIdAndRemove(id);

            return rota;
        }
        catch (error) {
            throw new Error("Error in deletarRota: " + error.message);
        }
    }
}

module.exports = new Rota();