'use strict';

const mongoose = require("mongoose");
const schemaActividadRealizada = new mongoose.Schema({
    Fecha: { type: String, required: true, unique: false },
    HoraInicio: { type: String, required: true, unique: false },
    HoraFin: { type: String, required: true, unique: false },
    Tipo: { type: String, required: true, unique: false },
    TotalTiempo: { type: String, required: true, unique: false }
});

module.exports = mongoose.model('ActividadRealizada', schemaActividadRealizada, 'ActividadesRealizadas');