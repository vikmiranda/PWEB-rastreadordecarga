const routes = require('express').Router();
const { cargaControler } = require('./controller')
const { navioControler } = require('./controller')
const { userControler } = require('./controller')


routes.post('/', cargaControler.criarCarga);
routes.get('/', cargaControler.listarCarga);
routes.get('/:id', cargaControler.pegarCargarPeloId);
routes.get('/cod_rastreio/:cod_rastreio', cargaControler.pegarCargarPeloCodRastreio);
routes.put('/:id', cargaControler.atualizarCarga);
routes.delete('/:id', cargaControler.deletarCarga);

routes.post('/user', userControler.login);

routes.post('/navio', navioControler.criarNavio);
routes.get('/navio/get', navioControler.listarNavio);
routes.get('/navio/:id', navioControler.pegarNavioPeloId);
routes.put('/navio/:id', navioControler.atualizarNavio);
routes.delete('/navio/:id', navioControler.deletarNavio);

module.exports = routes;