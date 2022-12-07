'use strict';

/* Perfil - Sección Peso ---------------------------------------*/


/* Perfil - Seccion Enfermedades ---------------------------------------*/

/* Perfil - Seccion Actividades ---------------------------------------*/


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