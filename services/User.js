const { userModel } = require('../models');

class User {

    async login(body) {

        try {
            const { email, password} = body
            const usuario = await userModel.findOne({ user: email});

            if(!usuario) {
                throw new Error("Id not found");
            }

            if (usuario.password !== password){
                throw new Error("Invalid Credentials");
            }

            return true;
        }
        catch (error) {
            throw new Error("Error in pegarUsuarioPeloId: " + error.message);
        }
    }

   
}

module.exports = new User();