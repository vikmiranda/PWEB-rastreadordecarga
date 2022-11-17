const routes = require('express').Router();
const { cargaControler } = require('./controller')
const { userControler } = require('./controller')


routes.post('/', cargaControler.criarCarga);
routes.get('/', cargaControler.listarCarga);
routes.get('/:id', cargaControler.pegarCargarPeloId);
routes.get('/cod_rastreio/:cod_rastreio', cargaControler.pegarCargarPeloCodRastreio);
routes.put('/:id', cargaControler.atualizarCarga);
routes.delete('/:id', cargaControler.deletarCarga);

routes.post('/user', userControler.login);

module.exports = routes;