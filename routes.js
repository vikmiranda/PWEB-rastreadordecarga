const routes = require('express').Router();
const { cargaControler } = require('./controller')
const { rotaControler } = require('./controller')
const { userControler } = require('./controller')


routes.get('/', cargaControler.listarCarga);
routes.get('/registradas', cargaControler.pegarCargasRegistrada);
routes.get('/emcaminho', cargaControler.pegarCargasCaminho);
routes.get('/entregue', cargaControler.pegarCargasEntregue);

routes.get('/:id', cargaControler.pegarCargarPeloId);
routes.get('/cod_rastreio/:cod_rastreio', cargaControler.pegarCargarPeloCodRastreio);

routes.post('/', cargaControler.criarCarga);
routes.put('/:id', cargaControler.atualizarCarga);
routes.delete('/:id', cargaControler.deletarCarga);

routes.post('/user', userControler.login);

routes.post('/rota', rotaControler.criarRota);
routes.get('/rota/get', rotaControler.listarRota);
routes.get('/rota/:id', rotaControler.pegarRotaPeloId);
routes.put('/rota/:id', rotaControler.atualizarRota);
routes.delete('/rota/:id', rotaControler.deletarRota);

module.exports = routes;