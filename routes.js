const routes = require('express').Router();
const { cargaControler } = require('./controller')
const { rotaControler } = require('./controller')
const { userControler } = require('./controller')


routes.post('/', cargaControler.criarCarga);
routes.get('/', cargaControler.listarCarga);
routes.get('/:id', cargaControler.pegarCargarPeloId);
routes.get('/cod_rastreio/:cod_rastreio', cargaControler.pegarCargarPeloCodRastreio);
routes.put('/:id', cargaControler.atualizarCarga);
routes.delete('/:id', cargaControler.deletarCarga);

routes.post('/user', userControler.login);

routes.post('/rota', rotaControler.criarRota);
routes.get('/rota/get', rotaControler.listarRota);
routes.get('/rota/:id', rotaControler.pegarRotaPeloId);
routes.put('/rota/:id', rotaControler.atualizarRota);
routes.delete('/rota/:id', rotaControler.deletarRota);

module.exports = routes;