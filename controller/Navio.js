const { navioService } = require('../services');

class Navio {
    async criarNavio(req, res) {
        try {
            const bodyRequest = req.body;
            const navio = await navioService.criarNavio(bodyRequest);
            return res.status(201).send(navio);
        }
        catch (error) {
            return res.status(500).send({error: error.message});
        }
    }

    async listarNavio(req, res) {
        try {
            const navios = await navioService.listarNavio();
            return res.status(200).send(navios);
        }
        catch (error) {
            return res.status(500).send({error: error.message});
        }
    }

    async pegarNavioPeloId(req, res) {
        try {
            const { id } = req.params;
            const navio = await navioService.pegarNavioPeloId(id);
            return res.status(200).send(navio);
        }
        catch (error) {
            return res.status(500).send({error: error.message});
        }
    }

    async atualizarNavio(req, res) {
        try {
            const bodyRequest = req.body;
            bodyRequest.id = req.params.id;

            const navio = await navioService.atualizarNavio(bodyRequest);
            return res.status(200).send(navio);
        }
        catch (error) {
            return res.status(500).send({error: error.message});
        }
    }

    async deletarNavio(req, res) {
        try {
            const { id } = req.params;
            const navio = await navioService.deletarNavio(id);
            return res.status(200).send(navio);
        }
        catch (error) {
            return res.status(500).send({error: error.message});
        }
    }
}

module.exports = new Navio();