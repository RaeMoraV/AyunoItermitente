'use strict';

const mongoose = require("mongoose");
const schemaLogro = new mongoose.Schema({
    TipoLogro: { type: String, required: true, unique: false },
    CondicionLogro: { type: Number, required: true, unique: false },
    NombredeLogro: { type: String, required: true, unique: false },
    Medalla: { type: Number, required: true, unique: false },
    Estado: { type: Number, required: true, unique: false }
});

module.exports = mongoose.model('Logro', schemaLogro, 'Logros');