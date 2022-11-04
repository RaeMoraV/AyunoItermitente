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


/* Perfil - Seccion Informacion */


/* Perfil - Seccion Peso */

let btnPeso = document.querySelector('#buttonRegistro');
let inputPeso = document.querySelector('#inputPeso');
let inputFechaPeso = document.querySelector('#inputFecha');
// let ims = document.querySelector('#buttonRegistro');

btnPeso.addEventListener('click', getPeso)

function getPeso() {
    let nPeso = Number(inputPeso.value);
    let sFecha = inputFechaPeso.value;

    registrarPeso (nPeso, sFecha);
    imprimirPeso();
}

function imprimirPeso() {
    let tbody = document.querySelector('#datosPeso tbody');
    let listaPesos = listarPesos();

    tbody.innerHTML = '';

    for (let i = 0; i < listaPesos.length; i++) {
        let fila = tbody.insertRow();
        let celdaPeso = fila.insertCell();
        let celdaFecha = fila.insertCell();

        celdaFecha.innerHTML = listaPesos[i][0];
        celdaPeso.innerHTML = listaPesos[i][1];
    }
}

/* Perfil - Seccion Enfermedades */