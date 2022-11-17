const routes = require('express').Router();
const { cargaControler } = require('./controller')

routes.post('/', cargaControler.criarCarga);
routes.get('/', cargaControler.listarCarga);
routes.get('/:id', cargaControler.pegarCargarPeloId);
routes.put('/:id', cargaControler.atualizarCarga);
routes.delete('/:id', cargaControler.deletarCarga);

module.exports = routes;