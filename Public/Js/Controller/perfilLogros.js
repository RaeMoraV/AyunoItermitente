'use strict';

/* Perfil - Logros - Tabla  ---------------------------------------*/

let listaMetas = [];

let btnMeta = document.querySelector('#buttonRegistroMeta');
let inputTipoMeta = document.querySelector('#inputNombreMeta');
let inputIndicadorPeso = document.querySelector('#inputIndicadorPeso');

btnMeta.addEventListener('click', getMetaTipo);

function getMeta() {
    let sTipo = inputTipoMeta.value;
    let nIndicadorPeso = Number(inputIndicadorPeso.value);

}

async function ImprimirMetas() {
    let tbody = document.querySelector('#datosLogros tbody');
    tbody.innerHTML = '';

    for (let i = 0; i < listaMetas.length; i++) {

        let fila = tbody.insertRow();
        let celdaTipoLogro = fila.insertCell();
        let celdaCondicionLogro = fila.insertCell();
        let celdaNombreLogro = fila.insertCell();
        let celdaMedalla = fila.insertCell();
        let celdaEstado = fila.insertCell();

        celdaTipoLogro.innerHTML = listaMetas[i].TipoLogro;
        celdaCondicionLogro.innerHTML = listaMetas[i].celdaCondicionLogro;
        celdaNombreLogro.innerHTML = listaMetas[i].NombreLogro;
        celdaMedalla.innerHTML = listaMetas[i].Medalla;
        celdaEstado.innerHTML = listaMetas[i].Estado;
    }
}

async function getMeta() {
    let sTipoMeta = inputNombreMeta.value;
    let nIndicadorPeso = Number(inputIndicadorPeso.value);
    let result = null;

    if (validarMeta(sTipoMeta) == true) {
        return;
    }



    //Acomodo para enviar el json con la información a la DB

    let data = {
        TipoLogro: sTipoMeta,
        IndicadorPeso: nIndicadorPeso,
    };

    result = await ProcessPost('RegistrarMeta', data, null);

    if (result == null || result == undefined) {
        ImprimirMsjError('Ocurrió un error, intente de nuevo');
    } else if (result.resultado == false) {
        ImprimirMsjError(result.msj);
        console.log(result);
    } else {
        swal.fire({
            title: 'Excelente!',
            text: result.msj,
            icon: 'success',
            confirmButtonText: 'Ok'
        }).then(res => {
            GetListaMetas();
        });
    }

    //Resetear valores en form
    inputTipoMeta.value = "";
    inputIndicatorPeso.value = "";

}

//Validar meta valida

function validarMeta(psTipoMeta) {
    let inputIndicadorPeso = Number(inputIndicadorPeso.value);
    if (psTipoMeta == '' || psTipoMeta == null || psTipoMeta == undefined) {
        document.getElementById("inputNombreMeta").focus();
        Swal.fire({ icon: 'error', title: 'Información requerida', text: 'Seleccione un tipo de meta' });
        return true;
    }

    if (iIndicadorPeso == '' || iIndicadorPeso == null || iIndicadorPeso == 0) {
        document.getElementById("inputIndicadorPeso").focus();
        Swal.fire({ icon: 'error', title: 'Información faltante', text: 'Ingrese una cantidad' });
        return true;
    }
    else if (iIndicadorPeso < 1 || iIndicadorPeso > 1000) {
        document.getElementById("inputIndicadorPeso").focus();
        Swal.fire({ icon: 'error', title: 'Información invalida', text: 'Ingrese una cantidad valida' });
        inputPeso.focus();
        return true;
    }
}