'use strict';

const mongoose = require("mongoose");
const schemaUser = new mongoose.Schema({
    Nombre: { type: String, required: true, unique: false },
    Apellido: { type: String, required: true, unique: false },
    FechaNacimiento: { type: String, required: true, unique: false },
    Correo: { type: String, required: true, unique: true },
    Sexo: { type: String, required: true, unique: false },
    Estatura: { type: Number, required: true, unique: false },
    Foto: { type: String, required: true, unique: true },
    PesoIdeal: { type: Number, required: true, unique: true }
});

module.exports = mongoose.model('User', schemaUser, 'Users');