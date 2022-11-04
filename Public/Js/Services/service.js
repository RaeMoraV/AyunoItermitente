/* Perfil - Seccion Peso */
let listaPeso = [];

function registrarPeso (pnPeso, psFecha) {
    let nuevoPeso = [];
    nuevoPeso.push(pnPeso, psFecha);
    listaPeso.push(nuevoPeso);
};

function listarPesos() {
    return listaPeso;
}