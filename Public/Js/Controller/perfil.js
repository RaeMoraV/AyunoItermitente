'use strict';
/* NAV Mobile Menu */

document.getElementById('menuButton').addEventListener('click', mostrarMenu);
document.getElementById('backMenu').addEventListener('click', ocultarMenu);

let nav = document.getElementById('menu');
let backMenu = document.getElementById('backMenu');

function mostrarMenu() {
    nav.style.right = '0px';
    backMenu.style.display = 'block';
};

function ocultarMenu() {
    nav.style.right = '-250px';
    backMenu.style.display = 'none';
}

/* SideMenu */
/*
let btnSMInfo = document.getElementById('sideMenuInformacion');
let btnSMEst = document.getElementById('sideMenuEstadistica');
let btnSMPeso = document.getElementById('sideMenuPeso');
let btnSMEnf = document.getElementById('sideMenuEnfermedades');
let btnSMAct = document.getElementById('sideMenuActividad');
let btnSMLog = document.getElementById('sideMenuLogros');
let btnSMPlan = document.getElementById('sideMenuPlan');
let btnSMRec = document.getElementById('sideMenuRecetas');

btnSMInfo.addEventListener('click', blockDisplay(1));
btnSMEst.addEventListener('click', blockDisplay(2));
btnSMPeso.addEventListener('click', blockDisplay(3));
btnSMEnf.addEventListener('click', blockDisplay(4));
btnSMAct.addEventListener('click', blockDisplay(5));
btnSMLog.addEventListener('click', blockDisplay(6));
btnSMPlan.addEventListener('click', blockDisplay(7));
btnSMRec.addEventListener('click', blockDisplay(8));


function blockDisplay(pOpcionSM){
    console.log(pOpcionSM);
    
    switch(pOpcionSM){
        case 1:
            console.log('1');
            document.getElementById('informacion').style.display='flex';
            document.getElementById('peso').style.display='none';
            document.getElementById('estadisticas').style.display='none';
            document.getElementById('enfermedades').style.display='none';
            document.getElementById('actividadFisica').style.display='none';
            document.getElementById('logroObjetivos').style.display='none';
            document.getElementById('planAyuno').style.display='none';
            document.getElementById('recetas').style.display='none';
            break;
        case 2:
            console.log('2');
            document.getElementById('informacion').style.display='none';
            document.getElementById('peso').style.display='flex';
            document.getElementById('estadisticas').style.display='none';
            document.getElementById('enfermedades').style.display='none';
            document.getElementById('actividadFisica').style.display='none';
            document.getElementById('logroObjetivos').style.display='none';
            document.getElementById('planAyuno').style.display='none';
            document.getElementById('recetas').style.display='none';
            break;
        case 3:
            console.log('3');
            document.getElementById('informacion').style.display='none';
            document.getElementById('peso').style.display='none';
            document.getElementById('estadisticas').style.display='flex';
            document.getElementById('enfermedades').style.display='none';
            document.getElementById('actividadFisica').style.display='none';
            document.getElementById('logroObjetivos').style.display='none';
            document.getElementById('planAyuno').style.display='none';
            document.getElementById('recetas').style.display='none';
            break;
        case 4:
            console.log('4');
            document.getElementById('informacion').style.display='none';
            document.getElementById('peso').style.display='none';
            document.getElementById('estadisticas').style.display='none';
            document.getElementById('enfermedades').style.display='flex';
            document.getElementById('actividadFisica').style.display='none';
            document.getElementById('logroObjetivos').style.display='none';
            document.getElementById('planAyuno').style.display='none';
            document.getElementById('recetas').style.display='none';
            break;
        case 5:
            console.log(5);
            document.getElementById('informacion').style.display='none';
            document.getElementById('peso').style.display='none';
            document.getElementById('estadisticas').style.display='none';
            document.getElementById('enfermedades').style.display='none';
            document.getElementById('actividadFisica').style.display='flex';
            document.getElementById('logroObjetivos').style.display='none';
            document.getElementById('planAyuno').style.display='none';
            document.getElementById('recetas').style.display='none';
            break;
        case 6:
            console.log(6);
            document.getElementById('informacion').style.display='none';
            document.getElementById('peso').style.display='none';
            document.getElementById('estadisticas').style.display='none';
            document.getElementById('enfermedades').style.display='none';
            document.getElementById('actividadFisica').style.display='none';
            document.getElementById('logroObjetivos').style.display='flex';
            document.getElementById('planAyuno').style.display='none';
            document.getElementById('recetas').style.display='none';
            break;
        case 7:
            console.log(7);
            document.getElementById('informacion').style.display='none';
            document.getElementById('peso').style.display='none';
            document.getElementById('estadisticas').style.display='none';
            document.getElementById('enfermedades').style.display='none';
            document.getElementById('actividadFisica').style.display='none';
            document.getElementById('logroObjetivos').style.display='none';
            document.getElementById('planAyuno').style.display='flex';
            document.getElementById('recetas').style.display='none';
            break;
        case 8:
            console.log(8);
            document.getElementById('informacion').style.display='none';
            document.getElementById('peso').style.display='none';
            document.getElementById('estadisticas').style.display='none';
            document.getElementById('enfermedades').style.display='none';
            document.getElementById('actividadFisica').style.display='none';
            document.getElementById('logroObjetivos').style.display='none';
            document.getElementById('planAyuno').style.display='none';
            document.getElementById('recetas').style.display='flex';
            break;
        default:
            console.log("jeje");
            document.getElementById('informacion').style.display='flex';
            document.getElementById('peso').style.display='flex';
            document.getElementById('estadisticas').style.display='flex';
            document.getElementById('enfermedades').style.display='flex';
            document.getElementById('actividadFisica').style.display='flex';
            document.getElementById('logroObjetivos').style.display='flex';
            document.getElementById('planAyuno').style.display='flex';
            document.getElementById('recetas').style.display='flex';
            break;
    }
}
*/

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
