'use strict';

const express = require("express");
const router = express.Router(); 
const Peso = require('../models/PesoModel');

//post = insertar
//put = actualizar o desactivar
//delete = eliminar
//get = obtener o listar o buscar


router.post('/RegistrarPeso', (req, res) => {
    let body = req.body;
    let nuevoPeso = new Peso({
        Peso: body.Peso,
        FechaRegistroPeso: body.FechaRegistroPeso,
        IMC: body.IMC
    });
    nuevoPeso.save((err, pesoDB) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudo registrar el peso, ocurrió un error!: ',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Registro realizado de manera correcta',
                pesoDB
            });
        }
    });
});

router.get('/ListarPesos', (req, res) => {
    Peso.find((err, ListaPesosDB) => {
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
                ListaPesosDB
            });
        }
    });
});

module.exports = router