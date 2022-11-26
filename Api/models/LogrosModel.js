'use strict';

const mongoose = require("mongoose");
const schemaLogro = new mongoose.Schema({
    Logro: { type: Number, required: true, unique: false },
    NombredeLogro: {type:String,required:true,unique:true},
    TipoLogro: {type:String,required:true,unique:true},
    CondicionLogro: {type:String,required:true,unique:true},
    Medalla: {type:String,required:true,unique:true},
    Estado: {type:Number,required:true,unique:false},

    
});

module.exports = mongoose.model('Logro', schemaLogro, 'Logros');