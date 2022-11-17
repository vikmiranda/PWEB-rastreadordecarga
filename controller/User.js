const {userService} = require('../services')

class User {
    async criarUsuario(req, res) {
        try {
            const bodyRequest = req.body;
            const usuario = await userService.criarUsario(bodyRequest);
            return res.status(201).send(usuario);
        }
        catch (error) {
            return res.status(500).send({error: error.message});
        }
    }

    async listarUsuario(req, res) {
        try {
            const usuario = await userService.listarUsuario();
            return res.status(200).send(usuario);
        }
        catch (error) {
            return res.status(500).send({error: error.message});
        }
    }

    async login(req, res) {
        try {
            console.log(req.body)
            const usuario = await userService.login(req.body);
            return res.status(200).json(usuario);
        }
        catch (error) {
            return res.status(500).send({error: error.message});
        }
    }

    async atualizarUsuario(req, res) {
        try {
            const bodyRequest = req.body;
            bodyRequest.id = req.params.id;

            const usuario = await userService.atualizarUsuario(bodyRequest);
            return res.status(200).send(usuario);
        }
        catch (error) {
            return res.status(500).send({error: error.message});
        }
    }

    //corrigir
    async deletarCarga(req, res) {
        try {
            const { id } = req.params;
            const usuario = await userService.deletarUsuario(id);
            return res.status(200).send(usuario);
        }
        catch (error) {
            return res.status(500).send({error: error.message});
        }
    }
}

module.exports = new User();