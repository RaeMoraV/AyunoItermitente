'use strict';

/* Perfil - Sección Peso ---------------------------------------*/


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
    listaActividades.push(nuevaActividad);
};

function listarActividades() {
    return listaActividades;
}

/* Perfil - Seccion Ayuno - Tabla  ---------------------------------------*/

let listaRegistroAyuno=[];

function registrarAyuno(pFechaInicio,pHoraInicio,pFechaFin,pHoraFin,pTipoAyuno,pEstadoAyuno){
    let nuevoRegistroAyuno =[];
    nuevoRegistroAyuno.push(pFechaInicio,pHoraInicio,pFechaFin,pHoraFin,pTipoAyuno,pEstadoAyuno);
    listaRegistroAyuno.push(nuevoRegistroAyuno);
}

function listarRegistroAyuno() {
    return listaRegistroAyuno;
}

/* Perfil - Seccion Recetas ---------------------------------------*/
let listaRecetas = [];

function registrarRecetas (sNombre, sIngredientes, sPreparacion, sTiempoReceta, sTipo) {
    let nuevaReceta = [];
    nuevaReceta.push(sNombre, sIngredientes, sPreparacion, sTiempoReceta, sTipo);
    listaRecetas.push(nuevaReceta);
};

function listarRecetas() {
    return listaRecetas;
}