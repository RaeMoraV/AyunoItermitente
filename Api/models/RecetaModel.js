'use strict';

const mongoose = require("mongoose");
const schemaReceta = new mongoose.Schema({
    Nombre: { type: String, required: true, unique: true },
    Imagen: { type: String, required: true, unique: true },
    TipoComida: { type: String, required: true, unique: false },
    Categoria: { type: String, required: true, unique: false },
    Ingredientes: { type: String, required: true, unique: false },
    Tiempo: { type: Number, required: true, unique: false },
    Pasos: { type: String, required: true, unique: false }
});

module.exports = mongoose.model('Receta', schemaReceta, 'Recetas');