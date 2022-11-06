'use strict';

/* Perfil - Seccion Peso */
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

/* Perfil - Seccion Ayuno - Tabla  ---------------------------------------*/
let listaRegistroAyuno=[];

function registrarAyuno(pnTotalHoras,pnHoraInicioAyuno,pnFechaInicioAyuno){
    let nuevoRegistroAyuno =[];
    nuevoRegistroAyuno.push(pnTotalHoras,pnHoraInicioAyuno,pnFechaInicioAyuno);
    listaRegistroAyuno.push(nuevoRegistroAyuno);
}