'use strict';

/* Perfil - Seccion Peso ---------------------------------------*/
let listaPesoYFecha = [];
let listaPeso = [];
let listaFecha = [];
let listaMeses = [];


function registrarPesoYFecha (pnPeso, psFecha) {
    let nuevoPesoYFecha = [];
    let imc = pnPeso / Math.round(Math.pow(Number(document.getElementById('alturaUsuario').textContent), 2));
    nuevoPesoYFecha.push(pnPeso, psFecha, imc);
    listaPesoYFecha.push(nuevoPesoYFecha);
};

function registrarPeso (pnPeso) {
    let nuevoPeso = [];
    nuevoPeso.push(pnPeso);
    listaPeso.push(nuevoPeso);
};

function registrarFecha (psFecha) {
    let nuevaFecha = [];
    nuevaFecha.push(psFecha);
    listaFecha.push(nuevaFecha);
};


function listarPesos() {
    return listaPeso;
}

function listarFechas() {
    return listaFecha;
}

function listarMeses() {
    let fecha = 0;
    let newMonth = null;

    for (let i = 0; i < listaFecha.length; i++) {
        fecha = new Date(listaFecha[i]);
        newMonth = fecha.getMonth() + 1;

        listaMeses.push(newMonth);
    };

    return listaMeses;
}

function listarPesosYFechas() {
    return listaPesoYFecha;
}

/* Perfil - Seccion Enfermedades ---------------------------------------*/
let listaEnfermedades = [];

function registrarEnfermedad (sNombre, sDescripcion, sEstado, sTratamiento) {
    let nuevaEnfermedad = [];
    nuevaEnfermedad.push(sNombre, sDescripcion, sEstado, sTratamiento);
    listaEnfermedades.push(nuevaEnfermedad);
};

function listarEnfermedades() {
    return listaEnfermedades;
}

/* Perfil - Seccion Actividades ---------------------------------------*/
let listaActividades = [];

function registrarActividad (sFecha, sNombre, sInicio, sFin, total) {
    let nuevaActividad = [];
    nuevaActividad.push(sFecha, sNombre, sInicio, sFin, total);
    listaActividades.push(listaActividades);
};

function listarActividades() {
    return listaActividades;
}

/* Perfil - Seccion Ayuno - Tabla  ---------------------------------------*/

let listaRegistroAyuno=[];

function registrarAyuno(pnTotalHoras,pnHoraInicioAyuno,pnFechaInicioAyuno){
    let nuevoRegistroAyuno =[];
    nuevoRegistroAyuno.push(pnTotalHoras,pnHoraInicioAyuno,pnFechaInicioAyuno);
    listaRegistroAyuno.push(nuevoRegistroAyuno);
}

