'use strict';

/* SideMenu */

blockDisplay(null);

let btnSMInfo = document.getElementById('sideMenuInformacion');
let btnSMPeso = document.getElementById('sideMenuPeso');
let btnSMEnf = document.getElementById('sideMenuEnfermedades');
let btnSMAct = document.getElementById('sideMenuActividad');
let btnSMLog = document.getElementById('sideMenuLogros');
let btnSMPlan = document.getElementById('sideMenuPlan');
let btnSMRec = document.getElementById('sideMenuRecetas');

btnSMInfo.addEventListener('click', openInfo);
btnSMPeso.addEventListener('click', openPeso);
btnSMEnf.addEventListener('click', openEnfermedades);
btnSMAct.addEventListener('click', openActividades);
btnSMLog.addEventListener('click', openLogros);
btnSMPlan.addEventListener('click', openPlan);
btnSMRec.addEventListener('click', openRecetas);

function openInfo() {
    let option = 1;
    blockDisplay (option);
}

function openPeso() {
    let option = 2;
    blockDisplay (option);
}

function openEnfermedades() {
    let option = 3;
    blockDisplay (option);
}

function openActividades() {
    let option = 4;
    blockDisplay (option);
}

function openLogros() {
    let option = 5;
    blockDisplay (option);
}

function openPlan() {
    let option = 6;
    blockDisplay (option);
}

function openRecetas() {
    let option = 7;
    blockDisplay (option);
}


function blockDisplay(pOpcionSM){
    switch(pOpcionSM){
        case 1:
            document.getElementById('informacion').style.display='block';
            document.getElementById('peso').style.display='none';
            document.getElementById('enfermedades').style.display='none';
            document.getElementById('actividadFisica').style.display='none';
            document.getElementById('logroObjetivos').style.display='none';
            document.getElementById('planAyuno').style.display='none';
            document.getElementById('recetas').style.display='none';
            break;
        case 2:
            document.getElementById('informacion').style.display='none';
            document.getElementById('peso').style.display='block';
            document.getElementById('enfermedades').style.display='none';
            document.getElementById('actividadFisica').style.display='none';
            document.getElementById('logroObjetivos').style.display='none';
            document.getElementById('planAyuno').style.display='none';
            document.getElementById('recetas').style.display='none';
            break;
        case 3:
            document.getElementById('informacion').style.display='none';
            document.getElementById('peso').style.display='none';
            document.getElementById('enfermedades').style.display='block';
            document.getElementById('actividadFisica').style.display='none';
            document.getElementById('logroObjetivos').style.display='none';
            document.getElementById('planAyuno').style.display='none';
            document.getElementById('recetas').style.display='none';
            break;
        case 4:
            document.getElementById('informacion').style.display='none';
            document.getElementById('peso').style.display='none';
            document.getElementById('enfermedades').style.display='none';
            document.getElementById('actividadFisica').style.display='block';
            document.getElementById('logroObjetivos').style.display='none';
            document.getElementById('planAyuno').style.display='none';
            document.getElementById('recetas').style.display='none';
            break;
        case 5:
            document.getElementById('informacion').style.display='none';
            document.getElementById('peso').style.display='none';
            document.getElementById('enfermedades').style.display='none';
            document.getElementById('actividadFisica').style.display='none';
            document.getElementById('logroObjetivos').style.display='block';
            document.getElementById('planAyuno').style.display='none';
            document.getElementById('recetas').style.display='none';
            break;
        case 6:
            document.getElementById('informacion').style.display='none';
            document.getElementById('peso').style.display='none';
            document.getElementById('enfermedades').style.display='none';
            document.getElementById('actividadFisica').style.display='none';
            document.getElementById('logroObjetivos').style.display='none';
            document.getElementById('planAyuno').style.display='block';
            document.getElementById('recetas').style.display='none';
            break;
        case 7:
            document.getElementById('informacion').style.display='none';
            document.getElementById('peso').style.display='none';
            document.getElementById('enfermedades').style.display='none';
            document.getElementById('actividadFisica').style.display='none';
            document.getElementById('logroObjetivos').style.display='none';
            document.getElementById('planAyuno').style.display='none';
            document.getElementById('recetas').style.display='block';
            break;
        default:
            document.getElementById('informacion').style.display='block';
            document.getElementById('peso').style.display='none';
            document.getElementById('enfermedades').style.display='none';
            document.getElementById('actividadFisica').style.display='none';
            document.getElementById('logroObjetivos').style.display='none';
            document.getElementById('planAyuno').style.display='none';
            document.getElementById('recetas').style.display='none';
            break;
    }
}

/* Perfil - Seccion Informacion */


/* Perfil - Seccion Peso - Tabla */

let btnPeso = document.querySelector('#buttonRegistro');
let inputPeso = document.querySelector('#inputPeso');
let inputFechaPeso = document.querySelector('#inputFecha');

graficoPeso();

btnPeso.addEventListener('click', getPesoFecha);

function getPesoFecha() {
    let nPeso = Number(inputPeso.value);
    let sFecha = [];
    sFecha = inputFechaPeso.value;

    registrarPesoYFecha (nPeso, sFecha);
    registrarPeso (nPeso);
    registrarFecha (sFecha);

    imprimirPeso();
}

function imprimirPeso() {
    let tbody = document.querySelector('#datosPeso tbody');
    let listaPesos = listarPesosYFechas();

    tbody.innerHTML = '';

    for (let i = 0; i < listaPesos.length; i++) {
        let fila = tbody.insertRow();
        let celdaPeso = fila.insertCell();
        let celdaFecha = fila.insertCell();
        let celdaIMC = fila.insertCell();

        celdaFecha.innerHTML = listaPesos[i][0];
        celdaPeso.innerHTML = listaPesos[i][1];
        celdaIMC.innerHTML = listaPesos[i][2];
    }
}

/* Perfil - Seccion Peso - Grafico  */

function graficoPeso() {
    let graphPeso = document.getElementById('graphPeso');
    let yArray = listaPeso;
    let xArray = listaMeses;

    let data = [{
        x: xArray,
        y: yArray,
    }];

    let layout = {
        xaxis: {range: yArray, title: "Mes"},
        yaxis: {range: xArray, title: "Peso"}
    };

    Plotly.newPlot(graphPeso, data, layout);
}

/* Perfil - Seccion Ayuno - Tabla  ---------------------------------------*/
let btnAyuno = document.getElementById("buttonRegistroAyuno");
let totalHoras = document.getElementById("inputTotalHoras");
let horaInicioAyuno = document.getElementById("inputHoraInicioAyuno");
let fechaInicioAyuno = document.getElementById("inputFechaInicioAyuno");


btnAyuno.addEventListener('click',obtenerDatosAyuno);

function obtenerDatosAyuno(){
    let nTotalHoras = totalHoras.value;
    let nHoraInicioAyuno = horaInicioAyuno.value;
    let nFechaInicioAyuno = fechaInicioAyuno.value;
    let nValorHoraAyuno = nHoraInicioAyuno.split(":")[0];
    let nValorMinutoAyuno = nHoraInicioAyuno.split(":")[1];
    let nHoraFinalAyuno
    let nFechaFinalAyuno;
    let fechaIngresadaAyuno = new Date(nFechaInicioAyuno+","+nValorHoraAyuno+","+nValorMinutoAyuno);
    console.log(fechaIngresadaAyuno);
    //let fechaFinalAyuno = new Date();
    
   
    registrarAyuno(nTotalHoras,nHoraInicioAyuno,nFechaInicioAyuno);
       
    
}
