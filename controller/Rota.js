const { rotaService } = require('../services');

class Rota {
    async criarNavio(req, res) {
        try {
            const bodyRequest = req.body;
            const rota = await rotaService.criarRota(bodyRequest);
            return res.status(201).send(rota);
        }
        catch (error) {
            return res.status(500).send({error: error.message});
        }
    }

    async listarNavio(req, res) {
        try {
            const rotas = await rotaService.listarRotas();
            return res.status(200).send(rotas);
        }
        catch (error) {
            return res.status(500).send({error: error.message});
        }
    }

    async pegarNavioPeloId(req, res) {
        try {
            const { id } = req.params;
            const rota = await rotaService.pegarRotaPeloId(id);
            return res.status(200).send(rota);
        }
        catch (error) {
            return res.status(500).send({error: error.message});
        }
    }

    async atualizarNavio(req, res) {
        try {
            const bodyRequest = req.body;
            bodyRequest.id = req.params.id;

            const rota = await rotaService.atualizarRota(bodyRequest);
            return res.status(200).send(rota);
        }
        catch (error) {
            return res.status(500).send({error: error.message});
        }
    }

    async deletarNavio(req, res) {
        try {
            const { id } = req.params;
            const rota = await rotaService.deletarRota(id);
            return res.status(200).send(rota);
        }
        catch (error) {
            return res.status(500).send({error: error.message});
        }
    }
}

module.exports = new Rota();