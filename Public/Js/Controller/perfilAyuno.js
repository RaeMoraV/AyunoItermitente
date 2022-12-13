'use strict';

/* Perfil - Sección Ayuno - Tabla  ---------------------------------------*/

let valorHoraInicioAyuno = document.getElementById("inputHoraInicioAyuno");
let valorInicioFechaAyuno = document.getElementById("inputInicioFechaAyuno");
let valorHoraFinAyuno = document.getElementById("inputHoraFinAyuno");
let valorFinFechaAyuno = document.getElementById("inputFinFechaAyuno");
let btnRegistroAyuno = document.getElementById("buttonRegistroAyuno");
let btnRegistroAbrirAyuno = document.getElementById("btnRegistroAbrirAyuno");
let listaAyunos = [];
let optionRadioCheckAyuno;
let estadoAyuno;

btnRegistroAyuno.addEventListener("click", getAyuno);


async function GetListaAyuno() {
    let result = await ProcessGet('ListarAyunos', null);
    if (result != null && result.resultado == true) {
        listaAyunos = result.ListaAyunosDB;
        //Esto me acomoda las fechas en orden cronológico antes de imprimir/graficar
        listaAyunos = listaAyunos.sort(
            (objA, objB) => Number(new Date(objB.FechaInicioAyuno)) - Number(new Date(objA.FechaInicioAyuno)),
        );
        await ImprimirAyunos();
        cerrarFormularioAyunoFunc();
    } else {
        ImprimirMsjError(result.msj);
        return;
    }
}

async function ImprimirAyunos() {
    let tbody = document.querySelector('#tablaRegistroAyuno tbody');
    tbody.innerHTML = '';

    for (let i = 0; i < listaAyunos.length; i++) {

        let fila = tbody.insertRow();
        let celdaFechaInicioAyuno = fila.insertCell();
        let celdaHoraInicioAyuno = fila.insertCell();
        let celdaFechaFinAyuno = fila.insertCell();
        let celdaHoraFinAyuno = fila.insertCell();
        let celdaTipoAyuno = fila.insertCell();
        let celdaHorasAyunos = fila.insertCell();
        let celdaEstadoAyuno = fila.insertCell();

        celdaFechaInicioAyuno.innerHTML = listaAyunos[i].FechaInicioAyuno;
        celdaHoraInicioAyuno.innerHTML = listaAyunos[i].HoraInicioAyuno;
        celdaFechaFinAyuno.innerHTML = listaAyunos[i].FechaFinAyuno;
        celdaHoraFinAyuno.innerHTML = listaAyunos[i].HoraFinAyuno;
        celdaTipoAyuno.innerHTML = listaAyunos[i].TipoAyuno;
        celdaHorasAyunos.innerHTML = Math.floor(listaAyunos[i].HorasAyunos);
        celdaEstadoAyuno.innerHTML = listaAyunos[i].EstadoAyuno;
    }
}

async function getAyuno() {
    //Datos extraídos de los inputs
    let sInicioHoraAyuno = valorHoraInicioAyuno.value;//String 12:22
    let sInicioFechaAyuno = valorInicioFechaAyuno.value; //String 3 nov 2022 = 2022-11-03
    let sFinHoraAyuno = valorHoraFinAyuno.value;//String 12:24
    let sFinFechaAyuno = valorFinFechaAyuno.value; //String 3 nov 2022 = 2022-11-03

    //Datos específicos sacados haciéndole split de FECHA INICIO
    let valorHora = sInicioHoraAyuno.split(":")[0];
    let valorMin = sInicioHoraAyuno.split(":")[1];

    let valorAnio = sInicioFechaAyuno.split("-")[0];
    let valorMes = sInicioFechaAyuno.split("-")[1];
    valorMes = Number(valorMes) - 1; // Hay que restarle 1 porque los meses empiezan en zero
    let valorDia = sInicioFechaAyuno.split("-")[2];

    //Datos específicos sacados haciéndole split de FECHA FINAL
    let valorHoraF = sFinHoraAyuno.split(":")[0];
    let valorMinF = sFinHoraAyuno.split(":")[1];

    let valorAnioF = sFinFechaAyuno.split("-")[0];
    let valorMesF = sFinFechaAyuno.split("-")[1];
    valorMesF = Number(valorMesF) - 1; // Hay que restarle 1 porque los meses empiezan en zero
    let valorDiaF = sFinFechaAyuno.split("-")[2];

    //Creación de los objetos date con los datos anteriores
    let DateInicio = new Date(valorAnio, valorMes, valorDia, valorHora, valorMin);
    let DateFinal = new Date(valorAnioF, valorMesF, valorDiaF, valorHoraF, valorMinF);

    let result = null;

    if (validarAyuno(DateInicio, DateFinal) == true) {
        return;
    }
    let totalHorasAyunadas = (DateFinal.getTime() - DateInicio.getTime()) / (1000 * 60 * 60);

    if (optionRadioCheckAyuno == "14-10") {
        if (totalHorasAyunadas >= 14) {
            estadoAyuno = "Logrado";
        }
        else {
            estadoAyuno = "No logrado";
        }
    }
    else if (optionRadioCheckAyuno == "16-8") {
        if (totalHorasAyunadas >= 16) {
            estadoAyuno = "Logrado";
        }
        else {
            estadoAyuno = "No logrado";
        }
    }
    else if (optionRadioCheckAyuno == "18-6") {
        if (totalHorasAyunadas >= 18) {
            estadoAyuno = "Logrado";
        }
        else {
            estadoAyuno = "No logrado";
        }
    }
    else if (optionRadioCheckAyuno == "20-4") {
        if (totalHorasAyunadas >= 20) {
            estadoAyuno = "Logrado";
        }
        else {
            estadoAyuno = "No logrado";
        }
    }

    //Acomodo para enviar el json con la información a la DB
    
    let data = {
        FechaInicioAyuno: sInicioFechaAyuno,
        HoraInicioAyuno: sInicioHoraAyuno,
        FechaFinAyuno: sFinFechaAyuno,
        HoraFinAyuno: sFinHoraAyuno,
        TipoAyuno: optionRadioCheckAyuno,
        HorasAyunos: totalHorasAyunadas,
        EstadoAyuno: estadoAyuno
    };

    result = await ProcessPost('RegistrarAyuno', data, null);

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
            GetListaAyuno();
        });
    }

    //Resetear valores en form
    valorHoraInicioAyuno.value = "";
    valorInicioFechaAyuno.value = "";
    valorHoraFinAyuno.value = "";
    valorFinFechaAyuno.value = "";
    document.getElementById("radio1410").checked = false;
    document.getElementById("radio168").checked = false;
    document.getElementById("radio186").checked = false;
    document.getElementById("radio204").checked = false;
}


function validarAyuno(pDateInicio, pDateFinal) {

    //Esta sección valida que haya información en las horas y fechas
    if (valorHoraInicioAyuno.value == '') {
        document.getElementById("inputHoraInicioAyuno").focus();
        Swal.fire({ icon: 'error', title: 'Información requerida', text: 'Ingrese la hora de inicio' });
        return true;
    }
    else if (valorInicioFechaAyuno.value == '') {
        document.getElementById("inputInicioFechaAyuno").focus();
        Swal.fire({ icon: 'error', title: 'Información requerida', text: 'Ingrese la fecha de inicio' });
        return true;
    }
    else if (valorHoraFinAyuno.value == '') {
        document.getElementById("inputHoraFinAyuno").focus();
        Swal.fire({ icon: 'error', title: 'Información requerida', text: 'Ingrese la hora de fin' });
        return true;
    }
    else if (valorFinFechaAyuno.value == '') {
        document.getElementById("inputFinFechaAyuno").focus();
        Swal.fire({ icon: 'error', title: 'Información requerida', text: 'Ingrese la fecha de fin' });
        return true;
    }
    //Esta sección obtiene el valor de los radiocheck y valida que haya un opción seleccionada
    else if (document.getElementById("radio1410").checked) {
        optionRadioCheckAyuno = document.getElementById("radio1410").value;
    }
    else if (document.getElementById("radio168").checked) {
        optionRadioCheckAyuno = document.getElementById("radio168").value;
    }
    else if (document.getElementById("radio186").checked) {
        optionRadioCheckAyuno = document.getElementById("radio186").value;
    }
    else if (document.getElementById("radio204").checked) {
        optionRadioCheckAyuno = document.getElementById("radio204").value;
    }
    else {
        document.getElementById("radio1410").focus();
        Swal.fire({ icon: 'error', title: 'Información requerida', text: 'Seleccione un tipo de ayuno' });
        return true;
    }
    //Valida que la fecha Inicial no sea mayor a la fecha final
    if (pDateInicio > pDateFinal) {
        document.getElementById("inputFinFechaAyuno").focus();
        Swal.fire({ icon: 'error', title: 'Fechas invalidas', text: 'La fecha de fin no puede ser antes que la fecha de inicio' });
        return true;
    }
}

// ABRIR Y CERRAR FORMULARIOS
const abrirFormularioAyuno = document.querySelector('#btnRegistroAbrirAyuno');
const fondoNegroAyuno = document.querySelector('.fondoNegro');
const xCerrarFormularioAyuno = document.querySelector('#xFormularioAyuno');

abrirFormularioAyuno.addEventListener('click', abrirFormularioAyunoFunc);
fondoNegroAyuno.addEventListener('click', cerrarFormularioAyunoFunc);
xCerrarFormularioAyuno.addEventListener('click', cerrarFormularioAyunoFunc);

function abrirFormularioAyunoFunc() {
    document.querySelector('#ingresoDatosAyuno').style.display = 'block';
    document.querySelector('.fondoNegro').style.display = 'block';
    document.querySelector('body').style.overflowY = 'hidden';

}

function cerrarFormularioAyunoFunc() {
    document.querySelector('#ingresoDatosAyuno').style.display = 'none';
    document.querySelector('.fondoNegro').style.display = 'none';
    document.querySelector('body').style.overflowY = 'initial';
}













