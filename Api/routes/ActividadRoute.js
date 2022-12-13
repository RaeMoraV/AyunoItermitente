'use strict';

const express = require("express");
const router = express.Router();
const ActividadRealizada = require('../models/ActividadModel');

//post = insertar
//put = actualizar o desactivar
//delete = eliminar
//get = obtener o listar o buscar


router.post('/RegistrarActividadRealizada', (req, res) => {
    let body = req.body;
    let nuevoRegistroActividad = new ActividadRealizada({
        Fecha: body.Fecha,
        HoraInicio: body.HoraInicio,
        HoraFin: body.HoraFin,
        Tipo: body.Tipo,
        TotalTiempo: body.TotalTiempo
    });
    nuevoRegistroActividad.save((err, actividadRealizadaDB) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudo registrar la actividad, ocurrió un error!: ',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Registro realizado de manera correcta',
                actividadRealizadaDB
            });
        }
    });
});

router.get('/ListarActividadRealizada', (req, res) => {
    ActividadRealizada.find((err, ListaRegistrosActividadesDB) => {
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
                ListaRegistrosActividadesDB
            });
        }
    });
});
router.delete('/EliminarActividad', (req, res) => {
    let body = req.body;
    ActividadRealizada.remove({ _id: body._id }, (err, result) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'Ocurrió un error inesperado y no se elimino la actividad',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Actividad eliminada de manera correcta',
                result
            });
        }
    });
});

module.exports = router