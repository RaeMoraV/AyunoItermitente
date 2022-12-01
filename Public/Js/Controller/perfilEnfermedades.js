'use strict';

/* Perfil - Sección Enfermedades - Tabla */

let btnEnfermedad = document.querySelector('#buttonRegistroEnfermedad');
let inputNombreEnfermedad = document.querySelector('#inputNombreEnfermedad');
let inputDescripcionEnfermedad = document.querySelector('#inputDescripcionEnfermedad');
let inputTratamientoEnfermedad = document.querySelector('#inputTratamientoEnfermedad');


function radioEstadoEval() {
    let option;
    if (document.getElementById('radioNoConcurrencia').checked) {
        option = document.getElementById('radioNoConcurrencia').value;
    } else {
        option = document.getElementById('radioConcurrencia').value;
    }

    return option;
} //Evalúa cual de los dos radio buttons fue seleccionado

btnEnfermedad.addEventListener('click', getEnfermedad);

function getEnfermedad() {
    let sNombre = inputNombreEnfermedad.value;
    let sDescripcion = inputDescripcionEnfermedad.value;
    let sEstado = radioEstadoEval();
    let sTratamiento = inputTratamientoEnfermedad.value;

    registrarEnfermedad(sNombre, sDescripcion, sEstado, sTratamiento);
    imprimirEnfermedad();
}

function imprimirEnfermedad() {
    let tbody = document.querySelector('#datosEnfermedad tbody');
    let listaEnfermedades = listarEnfermedades();

    tbody.innerHTML = '';

    for (let i = 0; i < listaEnfermedades.length; i++) {
        let fila = tbody.insertRow();
        let celdaNombre = fila.insertCell();
        let celdaDescripcion = fila.insertCell();
        let celdaEstado = fila.insertCell();
        let celdaTratamiento = fila.insertCell();

        celdaNombre.innerHTML = listaEnfermedades[i][0];
        celdaDescripcion.innerHTML = listaEnfermedades[i][1];
        celdaEstado.innerHTML = listaEnfermedades[i][2];
        celdaTratamiento.innerHTML = listaEnfermedades[i][3];
    }

    orderEnfermedadTable();
}

function orderEnfermedadTable() {
    let table;
    let rows;
    let switching;
    let i;
    let x;
    let y;
    let shouldSwitch;

    table = document.getElementById('datosEnfermedad');
    switching = true;

    while (switching) {
        switching = false;
        rows = table.rows;

        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;

            x = rows[i].getElementsByTagName('TD')[0];
            y = rows[i + 1].getElementsByTagName('TD')[0];

            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}