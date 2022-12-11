'use strict';

const express = require("express");
const router = express.Router();
const User = require('../models/UserModel');



router.post('/RegistrarUser', (req, res) => {
    let body = req.body;
    let nuevoUser = new User({
        Nombre: body.Nombre,
        Apellido: body.Apellido,
        FechaNacimiento: body.FechaNacimiento,
        Correo: body.Correo,
        Sexo: body.Sexo,
        Estatura: body.Estatura,
        Foto: body.Foto,
        PesoIdeal: body.PesoIdeal
    });
    nuevoUser.save((err, userDB) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudo registrar el usuario, ocurrió un error!: ',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Registro realizado de manera correcta',
                userDB
            });
        }
    });
});

router.get('/ListarUsers', (req, res) => {
    User.find((err, ListaUserDB) => {
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
                ListaUserDB
            });
        }
    });
});


module.exports = router