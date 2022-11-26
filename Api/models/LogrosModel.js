'use strict';

const mongoose = require("mongoose");
const schemaLogro = new mongoose.Schema({
    Logro: { type: Number, required: true, unique: false },
    TipoLogro: {type:String,required:true,unique:true},
    CondicionLogro: {type:String,required:true,unique:true},
    Medalla: {type:String,required:true,unique:true},
    Estado: {type:String,required:true,unique:true},

    
});

module.exports = mongoose.model('Logro', schemaLogro, 'Logros');