'use strict';

const express = require("express");
const router = express.Router();
const Receta = require('../models/RecetaModel');



router.post('/RegistrarReceta', (req, res) => {
    let body = req.body;
    let nuevaReceta = new Receta({
        Nombre: body.Nombre,
        Imagen: body.Imagen,
        TipoComida: body.TipoComida,
        Categoria: body.Categoria,
        Ingredientes: body.Ingredientes,
        Tiempo: body.Tiempo,
        Pasos: body.Pasos
    });
    nuevaReceta.save((err, recetaDB) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudo registrar la receta, ocurrió un error!: ',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Registro realizado de manera correcta',
                recetaDB
            });
        }
    });
});

router.get('/ListarRecetas', (req, res) => {
    Receta.find((err, ListaRecetasDB) => {
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
                ListaRecetasDB
            });
        }
    });
});

router.delete('/EliminarReceta', (req, res) => {
    let body = req.body;
    Receta.remove({ _id: body._id }, (err, result) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'Ocurrió un error inesperado y no se elimino a la receta',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Receta eliminada de manera correcta',
                result
            });
        }
    });
});

module.exports = router