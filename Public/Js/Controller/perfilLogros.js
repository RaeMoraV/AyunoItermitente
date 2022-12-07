'use strict';

/* Perfil - Logros - Tabla  ---------------------------------------*/

let listaMetas = [];


let inputTipoMeta = document.querySelector('#inputNombreMeta');
let inputIndicador = document.querySelector('#inputIndicador');
let inputNombreLogro = document.querySelector('#inputNombreLogro');

let inputMedalla1 = document.querySelector('#tipoMedalla1');
let inputMedalla2 = document.querySelector('#tipoMedalla2');
let inputMedalla3 = document.querySelector('#tipoMedalla3');
let inputMedalla4 = document.querySelector('#tipoMedalla4');
let inputMedalla5 = document.querySelector('#tipoMedalla5');
let inputMedalla6 = document.querySelector('#tipoMedalla6');
let inputMedalla7 = document.querySelector('#tipoMedalla7');
let inputMedalla8 = document.querySelector('#tipoMedalla8');
let optionMedalla;

let btnMeta = document.getElementById('btnMeta');
btnMeta.addEventListener('click',getMeta);

GetListaLogros();

async function GetListaLogros() {
    let result = await ProcessGet('ListarLogros', null);
    if (result != null && result.resultado == true) {
        listaMetas = result.ListaLogrosDB;
        await ImprimirMetas();
        console.log(listaMetas);
    } else {
        ImprimirMsjError(result.msj);
        return;
    }
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

        celdaTipoLogro.innerHTML = traductorLogro(listaMetas[i].TipoLogro);
        celdaCondicionLogro.innerHTML = listaMetas[i].CondicionLogro;
        celdaNombreLogro.innerHTML = listaMetas[i].NombredeLogro;
        let iconoMedalla = document.createElement('i');
        iconoMedalla.className = traductorIconoMedalla(listaMetas[i].Medalla);
        celdaMedalla.appendChild(iconoMedalla)
        celdaEstado.innerHTML = listaMetas[i].Estado;
    }
}

async function getMeta() {
    let sTipoMeta = inputTipoMeta.value;
    let nIndicador = inputIndicador.value;
    let sNombreMeta = inputNombreLogro.value;
    let estadoPrueba = Number(0);
    revisarMedalla();

    let result = null;

    /*if (validarMeta(sTipoMeta) == true) {
        return;
    }*/

    //Acomodo para enviar el json con la información a la DB

    let data = {
        TipoLogro: sTipoMeta,
        CondicionLogro: nIndicador,
        NombredeLogro: sNombreMeta,
        Medalla: optionMedalla,
        Estado: estadoPrueba
    };

    result = await ProcessPost('RegistrarLogro', data, null);

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
            GetListaLogros();
        });
    }

    //Resetear valores en form
    inputTipoMeta.value = "";
    inputIndicador.value = "";
    inputNombreLogro.value = "";

    inputMedalla1.unchecked;
    inputMedalla2.unchecked;
    inputMedalla3.unchecked;
    inputMedalla4.unchecked;
    inputMedalla5.unchecked;
    inputMedalla6.unchecked;
    inputMedalla7.unchecked;
    inputMedalla8.unchecked;
}


//Validar meta valida

/*
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
}*/

function revisarMedalla() {
    if (inputMedalla1.checked) {
        optionMedalla = inputMedalla1.value;
    } else if (inputMedalla2.checked) {
        optionMedalla = inputMedalla2.value;
    } else if (inputMedalla3.checked) {
        optionMedalla = inputMedalla3.value;
    }
    else if (inputMedalla4.checked) {
        optionMedalla = inputMedalla4.value;
    }
    else if (inputMedalla5.checked) {
        optionMedalla = inputMedalla5.value;
    }
    else if (inputMedalla6.checked) {
        optionMedalla = inputMedalla6.value;
    }
    else if (inputMedalla7.checked) {
        optionMedalla = inputMedalla7.value;
    }
    else if (inputMedalla8.checked) {
        optionMedalla = inputMedalla8.value;
    } else {
        optionMedalla = 0;
    }
}