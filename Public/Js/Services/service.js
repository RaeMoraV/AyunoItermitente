/* Perfil - Seccion Peso */
let listaPesoYFecha = [];
let listaPeso = [];
let listaFecha = [];

function registrarPesoYFecha (pnPeso, psFecha) {
    let nuevoPesoYFecha = [];
    nuevoPesoYFecha.push(pnPeso, psFecha);
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

function listarPesosYFechas() {
    return listaPesoYFecha;
}