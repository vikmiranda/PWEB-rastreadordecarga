const { cargaModel, rotaModel } = require('../models');
const cod_rastreio = require('../script/codigoRastreamentoAleatorio');
const Rota = require('./Rota');
const moment = require('moment-timezone');


class Carga {
    async criarCarga(bodyOfRequest) {
        try {
            const new_cod_rastreio = await cod_rastreio();
            const dataatual = moment().tz("America/Maceio").format();
            
            const {
                cidade_origem,
                cidade_destino,
                data_limite,
            } = bodyOfRequest;
            

            const novaCarga = new cargaModel({
                cod_rastreamento: new_cod_rastreio,
                cidade_origem,
                cidade_destino,
                data_limite,
                status: 'registrado',
                Rota,
                historico: [
                    {
                        "nome_local": cidade_origem,
                        "data_local": dataatual,
                        "evento_local": "carga registrada",
                    }
                ]
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

            if(!carga) {
                throw new Error("Id not found");
            }

            return carga;
        }
        catch (error) {
            throw new Error("Error in pegarCargarPeloId: " + error.message);
        }
    }


    async pegarCargarPeloCodRastreio(cod_rastreio) {
        try {
            const carga = await cargaModel.findOne({
                cod_rastreamento: cod_rastreio
            });

            if(!carga) {
                throw new Error("Tracking code not found");
            }

            return carga;
        }
        catch (error) {
            throw new Error("Error in pegarCargarPeloCodRastreio: " + error.message);
        }
    }

    async pegarCargasRegistrada() {
        try {
            const carga = await cargaModel.find({
                status: 'registrado'
            });

            if(!carga) {
                throw new Error("Nenhuma Carga com Status 'Registrado' ");
            }

            return carga;
        }
        catch (error) {
            throw new Error("Error in pegarCargasRegistrada: " + error.message);
        }
    }

    async pegarCargasCaminho() {
        try {
            const carga = await cargaModel.find({
                status: 'em caminho'
            });

            if(!carga) {
                throw new Error("Nenhuma Carga com Status 'Em Caminho' ");
            }

            return carga;
        }
        catch (error) {
            throw new Error("Error in pegarCargasCaminho: " + error.message);
        }
    }

    
    async pegarCargasEntregue() {
        try {
            const carga = await cargaModel.find({
                status: 'entregue'
            });

            if(!carga) {
                throw new Error("Nenhuma Carga com Status 'Entregue' ");
            }

            return carga;
        }
        catch (error) {
            throw new Error("Error in pegarCargasEntregue: " + error.message);
        }
    }




    async atualizarCarga(bodyOfRequest) {
        try {
            const {
                id,
                cod_rastreamento,
                cidade_origem,
                cidade_destino,
                data_limite,
                status,
                rota,
                historico
            } = bodyOfRequest;

            const dadosrota = await rotaModel.findById(rota);

            //pegando historico anterior e atualizando com nova informacao vindo do body
            const historicoanterior = await cargaModel.findById(id)
            const novohistorico = historicoanterior.historico
            novohistorico.push(historico)

            
            //quando o evento registrado for 'reivindicar' o status da carga mudará para 'entregue'
            var novostatus = status
            if (historico.evento_local == "Reivindicar"){
                novostatus = 'entregue'
            }
          
            const carga = await cargaModel.findByIdAndUpdate(id, {
                cod_rastreamento,
                cidade_origem,
                cidade_destino,
                data_limite,
                status: novostatus,
                rota: dadosrota,
                historico: novohistorico
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