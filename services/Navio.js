const { navioModel } = require('../models');

class Navio {
    async criarNavio(bodyOfRequest) {
        try {
            const {
                nome_navio,
                rota: [cidade, dias]
            } = bodyOfRequest;

            const novoNavio = new navioModel({
                nome_navio,
                rota: [cidade, dias]
            });

            const navio = await novoNavio.save();

            return navio;
        }
        catch (error) {
            throw new Error("Error in criarNavio: " + error.message);
        }
    }

    async listarNavio() {
        try {
            const navio = await navioModel.find();

            return navio;
        }
        catch (error) {
            throw new Error("Error in listarNavio: " + error.message);
        }
    }

    async pegarNavioPeloId(id) {
        try {
            const navio = await navioModel.findById(id);

            if(!navio) {
                throw new Error("Id not found");
            }

            return navio;
        }
        catch (error) {
            throw new Error("Error in pegarNavioPeloId: " + error.message);
        }
    }

    async atualizarNavio(bodyOfRequest) {
        try {
            const {
                id,
                nome_navio,
                rota: [cidade, dias]
            } = bodyOfRequest;

            const navio = await navioModel.findByIdAndUpdate(id, {
                    nome_navio,
                    rota: [cidade, dias]
                },
                {
                    new: true
                });

            return navio;
        }
        catch (error) {
            throw new Error("Error in atualizarNavio: " + error.message);
        }
    }

    async deletarNavio(id) {
        try {
            const navio = await navioModel.findByIdAndRemove(id);

            return navio;
        }
        catch (error) {
            throw new Error("Error in deletarNavio: " + error.message);
        }
    }
}

module.exports = new Navio();