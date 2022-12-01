'use strict';

/* Perfil - Sección Ayuno - Tabla  ---------------------------------------*/

let valorHoraInicioAyuno = document.getElementById("inputHoraInicioAyuno");
let valorInicioFechaAyuno = document.getElementById("inputInicioFechaAyuno");
let valorHoraFinAyuno = document.getElementById("inputHoraFinAyuno");
let valorFinFechaAyuno = document.getElementById("inputFinFechaAyuno");
let btnRegistroAyuno = document.getElementById("buttonRegistroAyuno");

let validacionTotalAyuno = 0;
let optionRadioCheckAyuno = 0;
let estadoAyuno = '';

btnRegistroAyuno.addEventListener("click", getAyunoData);

//Esta función valida que haya informacion en las horas y fechas

function validarFechasAyuno() {
    validacionTotalAyuno = 0;
    if (valorHoraInicioAyuno.value == '') {
        Swal.fire({ icon: 'error', title: 'Información requerida', text: 'Ingrese la hora de inicio' });
        validacionTotalAyuno = 1;
    }
    else if (valorInicioFechaAyuno.value == '') {
        Swal.fire({ icon: 'error', title: 'Información requerida', text: 'Ingrese la fecha de inicio' });
        validacionTotalAyuno = 1;
    }
    else if (valorHoraFinAyuno.value == '') {
        Swal.fire({ icon: 'error', title: 'Información requerida', text: 'Ingrese la hora de fin' });
        validacionTotalAyuno = 1;
    }
    else if (valorFinFechaAyuno.value == '') {
        Swal.fire({ icon: 'error', title: 'Información requerida', text: 'Ingrese la fecha de fin' });
        validacionTotalAyuno = 1;
    }
}

//Esta función obtiene el valor de los radiocheck y valida que haya un opción seleccionada
function radioCheckAyuno() {
    validacionTotalAyuno = 0;
    if (document.getElementById("radio1410").checked) {
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
        validacionTotalAyuno = 1;
        Swal.fire({ icon: 'error', title: 'Información requerida', text: 'Ingrese el tipo de ayuno' });
    }
}

function getAyunoData() {
    validacionTotalAyuno = 0;

    validarFechasAyuno();

    if (validacionTotalAyuno == 0) {
        radioCheckAyuno();
    }

    let sInicioHoraAyuno = valorHoraInicioAyuno.value;//String 12:22
    let sInicioFechaAyuno = valorInicioFechaAyuno.value; //String 3 nov 2022 = 2022-11-03

    let sFinHoraAyuno = valorHoraFinAyuno.value;//String 12:24
    let sFinFechaAyuno = valorFinFechaAyuno.value; //String 3 nov 2022 = 2022-11-03

    let valorHora = sInicioHoraAyuno.split(":")[0];
    let valorMin = sInicioHoraAyuno.split(":")[1];

    let valorAnio = sInicioFechaAyuno.split("-")[0];
    let valorMes = sInicioFechaAyuno.split("-")[1];
    valorMes = Number(valorMes) - 1; // Hay que restarle 1 porque los meses empiezan en zero
    let valorDia = sInicioFechaAyuno.split("-")[2];

    let valorHoraF = sFinHoraAyuno.split(":")[0];
    let valorMinF = sFinHoraAyuno.split(":")[1];

    let valorAnioF = sFinFechaAyuno.split("-")[0];
    let valorMesF = sFinFechaAyuno.split("-")[1];
    valorMesF = Number(valorMesF) - 1; // Hay que restarle 1 porque los meses empiezan en zero
    let valorDiaF = sFinFechaAyuno.split("-")[2];


    let DateInicio = new Date(valorAnio, valorMes, valorDia, valorHora, valorMin);
    let DateFinal = new Date(valorAnioF, valorMesF, valorDiaF, valorHoraF, valorMinF);

    if (DateInicio > DateFinal) {
        Swal.fire({ icon: 'error', title: 'Información requerida', text: 'Fechas invalidas', footer: 'La fecha de fin no puede ser antes que la fecha de inicio' });
        validacionTotalAyuno = 1;
    }

    if (validacionTotalAyuno == 0) {
        let totalHorasAyunadas;
        totalHorasAyunadas = (DateFinal.getTime() - DateInicio.getTime()) / (1000 * 60 * 60);
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
        registrarAyuno(sInicioFechaAyuno, sInicioHoraAyuno, sFinFechaAyuno, sFinHoraAyuno, optionRadioCheckAyuno, estadoAyuno);
        imprimirRegistroAyuno();
    }
}

function imprimirRegistroAyuno() {
    let tbody = document.querySelector('#tablaRegistroAyuno tbody');
    let listaRegistroAyunos = listarRegistroAyuno();

    tbody.innerHTML = '';

    for (let i = 0; i < listaRegistroAyunos.length; i++) {
        let fila = tbody.insertRow();
        let celdaFechaInico = fila.insertCell();
        let celdaHoraInicio = fila.insertCell();
        let celdaFechaFin = fila.insertCell();
        let celdaHoraFin = fila.insertCell();
        let celdaTipo = fila.insertCell();
        let celdaEstado = fila.insertCell();

        celdaFechaInico.innerHTML = listaRegistroAyunos[i][0];
        celdaHoraInicio.innerHTML = listaRegistroAyunos[i][1];
        celdaFechaFin.innerHTML = listaRegistroAyunos[i][2];
        celdaHoraFin.innerHTML = listaRegistroAyunos[i][3];
        celdaTipo.innerHTML = listaRegistroAyunos[i][4];
        celdaEstado.innerHTML = listaRegistroAyunos[i][5];
    }

    orderRegistroAyuno();
}

function orderRegistroAyuno() {
    let table;
    let rows;
    let switching;
    let i;
    let x;
    let y;
    let shouldSwitch;

    table = document.getElementById('tablaRegistroAyuno');
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
