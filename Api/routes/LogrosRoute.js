'use strict';

const express = require("express");
const router = express.Router();
const Logro = require('../models/LogrosModel');

router.post('/RegistrarLogro', (req, res) => {
    let body = req.body;
    let nuevoLogro = new Logro({
        TipoLogro: body.TipoLogro,
        CondicionLogro: body.CondicionLogro,
        NombredeLogro: body.NombredeLogro,
        Medalla: body.Medalla,
        Estado: body.Estado
    });
    nuevoLogro.save((err, logroDB) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudo registrar el logro, ocurrió un error!: ',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Registro realizado de manera correcta',
                logroDB
            });
        }
    });
});

router.get('/ListarLogros', (req, res) => {
    Logro.find((err, ListaLogrosDB) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudo obtener los datos: ',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Los datos se obtuvieron de manera correcta: ',
                ListaLogrosDB
            });
        }
    });
});

module.exports = router