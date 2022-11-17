const { cargaModel } = require('../models')

async function codigoRastreamentoAleatorio() {
    let resultado = '';
    const tamanho = 5;
    const caracteristicas = 'ABCDEFGHIJLMNOPQRSTUVWXYZ1234567890';
    const tamanhoCaracteristicas = caracteristicas.length;

    for (let i=0; i < tamanho; i++) {
        resultado += caracteristicas.charAt(Math.floor(Math.random() * tamanhoCaracteristicas));
    }

    const novoCodigoRastreamento = await cargaModel.findOne({cod_rastreamento: resultado});
    if (novoCodigoRastreamento) {
        return codigoRastreamentoAleatorio();
    }
    return resultado;
}

module.exports = codigoRastreamentoAleatorio