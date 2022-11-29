'use strict';

const express = require("express");
const router = express.Router();
const Enfermedad = require('../models/EnfermedadModel');

//post = insertar
//put = actualizar o desactivar
//delete = eliminar
//get = obtener o listar o buscar


router.post('/RegistrarEnfermedad', (req, res) => {
    let body = req.body;
    let nuevaEnfermedad = new Enfermedad({
        Nombre: body.Nombre,
        Descripcion: body.Descripcion,
        Estado: body.Estado,
        Tratamiento: body.Tratamiento
    });
    nuevaEnfermedad.save((err, enfermedadDB) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudo registrar la enfermedad, ocurrió un error!: ',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Registro realizado de manera correcta',
                enfermedadDB
            });
        }
    });
});

router.get('/ListarEnfermedades', (req, res) => {
    Enfermedad.find((err, ListaEnfermedadesDB) => {
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
                ListaEnfermedadesDB
            });
        }
    });
});

module.exports = router