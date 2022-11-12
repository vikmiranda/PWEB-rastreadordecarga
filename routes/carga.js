const express = require('express');
const router = express.Router();
const Carga = require('./../models/Carga');

router.route('/')
    .get(async (req, res) => {
        try {
            const allCarga = await Carga.find();
            res.status(200).json(allCarga);
        } catch (e) {
            res.status(500).json({error: e})
        }
    })
    .post( async (req, res) => {
        const {cod_rastreamento, cidade_origem, cidade_destino, data_limite } = req.body;
        if (!cod_rastreamento || !cidade_origem || !cidade_destino || !data_limite) {
            res.status(422).json({error: 'Informação faltando'})
            return;
        }
        const carga = {
            cod_rastreamento,
            cidade_origem,
            cidade_destino,
            data_limite
        }
        try {
            await Carga.create(carga);
            res.status(201).json({message: 'Nova Carga inserido com sucesso.'})
        } catch (e) {
            res.status(500).json({error: e});
        }
    })

router.route('/:id')
    .get( async (req, res) => {
        const id = req.params.id;

        try {
            const thisCarga = await Carga.findOne({
                _id: id
            });
            if(!thisCarga) {
                res.status(422).json({message: 'A carga não foi encontrada.'});
                return;
            }
            res.status(200).json(thisCarga);
        } catch (e) {
            res.status(500).json({error: e})
        }
    })
    .patch( async (req, res) => {
        const id = req.params.id;
        const {cod_rastreamento, cidade_origem, cidade_destino, data_limite } = req.body;
        const editedCarga = {
            cod_rastreamento,
            cidade_origem,
            cidade_destino,
            data_limite
        }

        try {
            const updatedCarga = await Carga.updateOne(
                {_id: id},
                editedCarga
            );
            if(updatedCarga.matchedCount === 0) {
                res.status(422).json({message: 'Carga não foi encontrado'});
                return;
            }
            res.status(200).json(editedCarga);
        } catch (e) {
            res.status(500).json({error: e})
        }
    })
    .delete( async (req, res) => {
        const id = req.params.id;
        const thisCarga = await Carga.findOne({_id: id});
        if(!thisCarga) {
            res.status(422).json({message: 'A carga não foi encontrado.'});
            return;
        }
        try {
            await Carga.deleteOne({_id: id});
            res.status(200).json({message: 'Carga removido com sucesso'});
        } catch (e) {
            res.status(500).json({error: e})
        }
    })

module.exports = router;