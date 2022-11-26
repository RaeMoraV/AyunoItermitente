'use strict';

const mongoose = require("mongoose");
const schemaAyuno = new mongoose.Schema({
    FechaInicioAyuno: { type: String, required: true, unique: false },
    HoraInicioAyuno:{ type: String, required: true, unique: false},
    FechaFinAyuno: { type: String, required: true, unique: false },
    HoraFinAyuno:{ type: String, required: true, unique: false},
    TipoAyuno: { type: Number, required: true, unique: false },
    EstadoAyuno: { type: Number, required: true, unique: false }
});
module.exports = mongoose.model('Ayuno', schemaAyuno, 'Ayunos');
