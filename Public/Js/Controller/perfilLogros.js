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


let btnMeta = document.getElementById('btnMeta');
btnMeta.addEventListener('click', getMeta);

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
        if (listaMetas[i].Estado == 1) {
            let iconoMedalla = document.createElement('i');
            iconoMedalla.className = traductorIconoMedalla(listaMetas[i].Medalla);
            celdaMedalla.appendChild(iconoMedalla)
        }
        else {
            celdaMedalla.innerHTML = '';
        }
        celdaEstado.innerHTML = traductorEstadoLogro(listaMetas[i].Estado);
    }
}

async function getMeta() {
    let sTipoMeta = inputTipoMeta.value;
    let nIndicador = inputIndicador.value;
    let sNombreMeta = inputNombreLogro.value;
    let optionMedalla = revisarMedalla();
    let estadoPrueba = revisarEstadoPrueba(sTipoMeta, nIndicador);


    let result = null;

    if (validarMeta(sTipoMeta, nIndicador, sNombreMeta, optionMedalla, estadoPrueba) == true) {
        return;
    }

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


function validarMeta(psTipoMeta, pnIndicador, psNombreMeta, pOptionMedalla, pEstadoPrueba) {

    if (psTipoMeta == '' || psTipoMeta == null || psTipoMeta == undefined) {
        document.getElementById("inputNombreMeta").focus();
        Swal.fire({ icon: 'error', title: 'Información requerida', text: 'Seleccione un tipo de meta' });
        return true;
    }
    else if (pnIndicador == '' || pnIndicador == null || pnIndicador == 0) {
        document.getElementById("inputIndicador").focus();
        Swal.fire({ icon: 'error', title: 'Información faltante', text: 'Ingrese un numero para la condición de la meta' });
        return true;
    }
    else if (pnIndicador <= 0) {
        document.getElementById("inputIndicador").focus();
        Swal.fire({ icon: 'error', title: 'Información invalida', text: 'Ingrese un numero real para la condición de la meta' });
        return true;
    }
    else if (psNombreMeta == '' || psNombreMeta == null || psNombreMeta == undefined) {
        document.getElementById("inputNombreLogro").focus();
        Swal.fire({ icon: 'error', title: 'Información faltante', text: 'Ingrese un nombre para la meta' });
        return true;
    }
    else if (pOptionMedalla == '' || pOptionMedalla == 0 || pOptionMedalla == null || pOptionMedalla == undefined) {
        document.getElementById("tipoMedalla1").focus();
        Swal.fire({ icon: 'error', title: 'Información faltante', text: 'Seleccione un tipo de medalla' });
        return true;
    }
    else {
        return false;
    }
}

function revisarMedalla() {
    let option;
    if (inputMedalla1.checked) {
        option = inputMedalla1.value;
    } else if (inputMedalla2.checked) {
        option = inputMedalla2.value;
    } else if (inputMedalla3.checked) {
        option = inputMedalla3.value;
    }
    else if (inputMedalla4.checked) {
        option = inputMedalla4.value;
    }
    else if (inputMedalla5.checked) {
        option = inputMedalla5.value;
    }
    else if (inputMedalla6.checked) {
        option = inputMedalla6.value;
    }
    else if (inputMedalla7.checked) {
        option = inputMedalla7.value;
    }
    else if (inputMedalla8.checked) {
        option = inputMedalla8.value;
    } else {
        option = 0;
    }
    return option;
}

function revisarEstadoPrueba(psTipoMeta, pnIndicador) {
    let estadoPrueba = 0;
    let sumaHoras = 0;
    let ayunoCompletados = 0;
    if (psTipoMeta == "peso") {
        if (Number(listaPeso[0].Peso) <= Number(pnIndicador)) {
            estadoPrueba = 1;
        }
        else {
            estadoPrueba = 0;
        }
    }
    else if (psTipoMeta == "imc") {
        if (Number(listaPeso[0].IMC) <= Number(pnIndicador)) {
            estadoPrueba = 1;
        }
        else {
            estadoPrueba = 0;
        }
    }
    else if (psTipoMeta == "cantidadHoras") {
        for (let i = 0; i < listaAyunos.length; i++) {
            sumaHoras += Number(listaAyunos[i].HorasAyunos);
        }
        if (Number(sumaHoras) >= Number(pnIndicador)) {
            estadoPrueba = 1;
        }
        else {
            estadoPrueba = 0;
        }
    }
    else if (psTipoMeta == "diasAyuno") {
        for (let i = 0; i < listaAyunos.length; i++) {
            if (listaAyunos[i].EstadoAyuno == "Logrado") {
                ayunoCompletados += 1;
            }
        }
        if (Number(ayunoCompletados) >= Number(pnIndicador)) {
            estadoPrueba = 1;
        }
        else {
            estadoPrueba = 0;
        }
    }
    return estadoPrueba;
}