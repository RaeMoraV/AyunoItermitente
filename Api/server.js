'use strict';

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.static(__dirname + '/Public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINOTHER, X-CSRF-Token, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


//Se crea la variable db, que almacena la instancia de la base de datos, para ser reutilizada en el 'callback'
let db;

//Se conecta la base de datos antes de levantar el servidor, mediante los datos del archivo .env en la raíz del proyecto
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, database) {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    //Guarda el objeto para que el callback lo pueda reutilizar
    db = database;
    console.log('Se estableció la conexión con la base de datos');

    const server = app.listen(process.env.PORT || 8000, function () {
        let port = server.address().port;
        console.log('La aplicación esta levantada en el puerto: ', port);
    });
});

//Error general en caso de que falle en endpoint
function handleError(res, reason, message, code) {
    console.log('ERROR: ', reason);
    res.status(code || 500).json({ "error": message });
}

//conexión a todas las rutas del backend

/*FORMATO DE EJEMPLO
const personas =  require('./routes/PersonaRoute');
app.use('/api', personas);
*/

//Conexión a ruta de pesos
const pesos = require('./routes/PesoRoute');
app.use('/api', pesos);

//Conexión a ruta de enfermedades
const enfermedades = require('./routes/EnfermedadRoute');
app.use('/api', enfermedades);

//Conexión a ruta de Actividades
const registroActividad = require('./routes/ActividadRoute');
app.use('/api', registroActividad);

//Conexión a ruta de logros
const logros = require('./routes/LogrosRoute');
app.use('/api', logros);

//Conexión a ruta de ayunos
const ayunos = require('./routes/AyunoRoute');
app.use('/api', ayunos);

//Conexión a ruta de recetas
const recetas = require('./routes/RecetaRoute');
app.use('/api', recetas);
