const { userModel } = require('../models');

class User {
    async criarUsario(bodyOfRequest) {
        try {
            const {
                user,
                senha
            } = bodyOfRequest;

            const novoUser = new userModel({
                user,
                senha
            });

            const usuario = await novoUser.save();

            return usuario;
        }
        catch (error) {
            throw new Error("Error in criarUsario: " + error.message);
        }
    }

    async listarUsuario() {
        try {
            const usuario = await userModel.find();

            return usuario;
        }
        catch (error) {
            throw new Error("Error in listarUsuario: " + error.message);
        }
    }

    async pegarUsuarioPeloId(id) {
        try {
            const usuario = await userModel.findById(id);

            if(!usuario) {
                throw new Error("Id not found");
            }

            return usuario;
        }
        catch (error) {
            throw new Error("Error in pegarUsuarioPeloId: " + error.message);
        }
    }

    async atualizarUsuario(bodyOfRequest) {
        try {
            const {
                id,
                user,
                senha
            } = bodyOfRequest;

            const usuario = await userModel.findByIdAndUpdate(id, {
                    user,
                    senha
                },
                {
                    new: true
                });

            return usuario;
        }
        catch (error) {
            throw new Error("Error in atualizarUsuario: " + error.message);
        }
    }

    async deletarUsuario(id) {
        try {
            const usuario = await cargaModel.findByIdAndRemove(id);

            return usuario;
        }
        catch (error) {
            throw new Error("Error in deletarUsuario: " + error.message);
        }
    }
}

module.exports = new User();