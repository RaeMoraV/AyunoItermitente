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


/* Perfil - Seccion Peso - Tabla */

let btnPeso = document.querySelector('#buttonRegistro');
let inputPeso = document.querySelector('#inputPeso');
let inputFechaPeso = document.querySelector('#inputFecha');
// let ims = document.querySelector('#buttonRegistro');

graficoPeso();

btnPeso.addEventListener('click', getPesoFecha)

function getPesoFecha() {
    let nPeso = Number(inputPeso.value);
    let sFecha = inputFechaPeso.value;

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

        celdaFecha.innerHTML = listaPesos[i][0];
        celdaPeso.innerHTML = listaPesos[i][1];
    }

    graficoPeso();
}

/* Perfil - Seccion Peso - Grafico  */

function graficoPeso() {
    let graphPeso = document.getElementById('graphPeso');
    let yArray = [1,2,3,4,5,6,7,8,9,10,11,12];
    let xArray = [1,2,3,4,5,6,7,8,9,10,11,12];

    let data = [{
        x: xArray,
        y: yArray,
    }];

    let layout = {
        xaxis: {range: [1, 24], title: "Mes"},
        yaxis: {range: [20, 500], title: "Peso"},
        title: "Peso a travez de la historia"
      };

    Plotly.newPlot(graphPeso, data, layout);
}


