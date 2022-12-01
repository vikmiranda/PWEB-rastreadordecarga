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

    async pegarCargarPeloCodRastreio(req, res) {
        try {
            const { cod_rastreio } = req.params;
            const carga = await cargaService.pegarCargarPeloCodRastreio(cod_rastreio);
            return res.status(200).send(carga);
        }
        catch (error) {
            return res.status(500).send({error: error.message});
        }
    }

    async pegarCargasRegistrada(req, res) {
        try {
            const carga = await cargaService.pegarCargasRegistrada();
            return res.status(200).send(carga);
        }
        catch (error) {
            return res.status(500).send({error: error.message});
        }
    }

    async pegarCargasCaminho(req, res) {
        try {
            const carga = await cargaService.pegarCargasCaminho();
            return res.status(200).send(carga);
        }
        catch (error) {
            return res.status(500).send({error: error.message});
        }
    }

    async pegarCargasEntregue(req, res) {
        try {
            const carga = await cargaService.pegarCargasEntregue();
            return res.status(200).send(carga);
        }
        catch (error) {
            return res.status(500).send({error: error.message});
        }
    }


    async atualizarCarga(req, res) {
        try {
            const bodyRequest = req.body;
            bodyRequest.cod_rastreamento = req.params.cod_rastreio;
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