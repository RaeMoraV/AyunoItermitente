'use strict';

const mongoose = require("mongoose");
const schemaEnfermedad = new mongoose.Schema({
    Nombre: { type: String, required: true, unique: false },
    Descripcion: {type: String, required: true, unique: false },
    Estado: {type: String, required: true, unique: false },
    Tratamiento: {type: String, required: false, unique: false}
});

module.exports = mongoose.model('Enfermedad', schemaEnfermedad, 'Enfermedades');