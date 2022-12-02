'use strict';

const express = require("express");
const router = express.Router();
const Ayuno = require('../models/AyunoModel');

//post = insertar
//put = actualizar o desactivar
//delete = eliminar
//get = obtener o listar o buscar


router.post('/RegistrarAyuno', (req, res) => {
    let body = req.body;
    let nuevoAyuno = new Ayuno({
        FechaInicioAyuno: body.FechaInicioAyuno,
        HoraInicioAyuno: body.HoraInicioAyuno,
        FechaFinAyuno: body.FechaFinAyuno,
        HoraFinAyuno: body.HoraFinAyuno,
        TipoAyuno: body.TipoAyuno,
        HorasAyunos: body.HorasAyunos,
        EstadoAyuno: body.EstadoAyuno
    });
    nuevoAyuno.save((err, ayunoDB) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudo registrar el ayuno, ocurrió un error!: ',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Registro realizado de manera correcta',
                ayunoDB
            });
        }
    });
});

router.get('/ListarAyunos', (req, res) => {
    Ayuno.find((err, ListaAyunosDB) => {
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
                ListaAyunosDB
            });
        }
    });
});

module.exports = router