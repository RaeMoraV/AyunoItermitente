'use strict';

const mongoose = require("mongoose");
const schemaPeso = new mongoose.Schema({
    Peso: { type: Number, required: true, unique: false },
    FechaRegistroPeso: { type: String, required: true, unique: true },
    IMC: { type: Number, required: true, unique: false }
});

module.exports = mongoose.model('Peso', schemaPeso, 'Pesos');