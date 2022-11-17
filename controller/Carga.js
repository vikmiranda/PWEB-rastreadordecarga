const {cargaService} = require('../services')

class Carga {
    async criarCarga(req, res) {
        try {
            const bodyRequest = req.body;
            const carga = await cargaService.criarCarga(bodyRequest);
            return res.status(201).send(carga);
        }
        catch (error) {
            return res.status(500).send({error: error.message});
        }
    }

    async listarCarga(req, res) {
        try {
            const cargas = await cargaService.listarCarga();
            return res.status(200).send(cargas);
        }
        catch (error) {
            return res.status(500).send({error: error.message});
        }
    }

    async pegarCargarPeloId(req, res) {
        try {
            const { id } = req.params;
            const carga = await cargaService.pegarCargarPeloId(id);
            return res.status(200).send(carga);
        }
        catch (error) {
            return res.status(500).send({error: error.message});
        }
    }

    async atualizarCarga(req, res) {
        try {
            const bodyRequest = req.body;
            bodyRequest.id = req.params.id;

            const carga = await cargaService.atualizarCarga(bodyRequest);
            return res.status(200).send(carga);
        }
        catch (error) {
            return res.status(500).send({error: error.message});
        }
    }

    async deletarCarga(req, res) {
        try {
            const { id } = req.params;
            const carga = await cargaService.deletarCarga(id);
            return res.status(200).send(carga);
        }
        catch (error) {
            return res.status(500).send({error: error.message});
        }
    }
}

module.exports = new Carga();