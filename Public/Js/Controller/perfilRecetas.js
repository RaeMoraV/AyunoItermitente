'use strict';

/* Perfil - Seccion Recetas - Tabla */

let btnReceta = document.querySelector('#buttonRegistroReceta');
let inputNombreReceta = document.querySelector('#inputNombreReceta');
let inputIngredientesReceta = document.querySelector('#inputIngredientesReceta');
let inputPreparacionReceta = document.querySelector('#inputPreparacionReceta');
let inputTiempoReceta = document.querySelector('#inputTiempoReceta');


function radioTipoReceta() {
    let option;
    if (document.getElementById('inputRecetaDesayuno').checked) {
        option = document.getElementById('inputRecetaDesayuno').value;
    } else if (document.getElementById('inputRecetaAlmuerzo').checked) {
        option = document.getElementById('inputRecetaAlmuerzo').value;
    } else if (document.getElementById('inputRecetaCena').checked) {
        option = document.getElementById('inputRecetaCena').value;
    } else {
        option = document.getElementById('inputRecetaMerienda').value;
    }

    return option;
} //Evalua cual de los dos radio buttons fue seleccionado

btnReceta.addEventListener('click', getReceta);

function getReceta() {
    let sNombre = inputNombreReceta.value;
    let sIngredientes = inputIngredientesReceta.value;
    let sPreparacion = inputPreparacionReceta.value;
    let sTiempoReceta = inputTiempoReceta.value;
    let sTipo = radioTipoReceta();

    registrarRecetas(sNombre, sIngredientes, sPreparacion, sTiempoReceta, sTipo);
    imprimirReceta();
}

function imprimirReceta() {
    let tbody = document.querySelector('#datosReceta tbody');
    let listaRecetas = listarRecetas();

    tbody.innerHTML = '';

    for (let i = 0; i < listaRecetas.length; i++) {
        let fila = tbody.insertRow();
        let celdaNombre = fila.insertCell();
        let celdaIngredientes = fila.insertCell();
        let celdaPreparacion = fila.insertCell();
        let celdaTiempoReceta = fila.insertCell();
        let celdaTipo = fila.insertCell();

        celdaNombre.innerHTML = listaRecetas[i][0];
        celdaIngredientes.innerHTML = listaRecetas[i][1];
        celdaPreparacion.innerHTML = listaRecetas[i][2];
        celdaTiempoReceta.innerHTML = listaRecetas[i][3];
        celdaTipo.innerHTML = listaRecetas[i][4];
    }

    orderRecetaTable();
}

function orderRecetaTable() {
    let table;
    let rows;
    let switching;
    let i;
    let x;
    let y;
    let shouldSwitch;

    table = document.getElementById('datosReceta');
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

