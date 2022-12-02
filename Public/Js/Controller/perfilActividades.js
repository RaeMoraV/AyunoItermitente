//'use strict';  Por alguna razon este Strict da errores en consola **Revisar

/* Perfil - Sección Actividades - Tabla */




let btnActividad = document.querySelector('#buttonRegistroActividad');
let inputFechaActividad = document.querySelector('#inputFechaActividad');
let inputNombreActividad = document.querySelector('#inputNombreActividad');
let inputInicioActividad = document.querySelector('#inicioHora').value + ':' + document.querySelector('#inicioMinutos').value + ':' + document.querySelector('#inicioSegundos').value;
let inputFinActividad = document.querySelector('#finHora').value + ':' + document.querySelector('#finMinutos').value + ':' + document.querySelector('#finSegundos').value;
let totalHoras = '';
//Variables para obtener el total de tiempo invertido en una actividad
let startHour = document.getElementById("inicioHora");
let startMinute = document.getElementById("inicioMinutos");
let startSecond = document.getElementById("inicioSegundos");
let endHour = document.getElementById("finHora");
let endMinute = document.getElementById("finMinutos");
let endSecond = document.getElementById("finSegundos");


btnActividad.addEventListener("click", () => {
    totalHoras = getTotalHoras();
    getActividad();
});

function getTotalHoras() {
    let startDate = new Date(2020, 05, 05, startHour.value, startMinute.value, startSecond.value);
    let endDate = new Date(2020, 05, 05, endHour.value, endMinute.value, endSecond.value);
    let difference = endDate.getTime() - startDate.getTime();
    if (difference > 0) {
        difference = difference / 1000;
        let hourDifference = Math.floor(difference / 3600);
        difference -= hourDifference * 3600;
        let minuteDifference = Math.floor(difference / 60);
        difference -= minuteDifference * 60;
        return `${hourDifference}:${minuteDifference}:${difference}`;
    };


}

function getActividad() {
    let sFecha = [];
    sFecha = inputFechaActividad.value;
    let sNombre = inputNombreActividad.value;
    let sInicio = inputInicioActividad;
    let sFin = inputFinActividad;
    let sTotal = totalHoras;

    registrarActividad(sFecha, sNombre, sInicio, sFin, sTotal);
    imprimirActividad();
}

function imprimirActividad() {
    let tbody = document.querySelector('#datosActividad tbody');
    let listaActividades = listarActividades();

    tbody.innerHTML = '';

    for (let i = 0; i < listaActividades.length; i++) {
        let fila = tbody.insertRow();
        let celdaFecha = fila.insertCell();
        let celdaNombre = fila.insertCell();
        let celdaInicio = fila.insertCell();
        let celdaFin = fila.insertCell();
        let celdaTotal = fila.insertCell();

        celdaFecha.innerHTML = listaActividades[i][0];
        celdaNombre.innerHTML = listaActividades[i][1];
        celdaInicio.innerHTML = listaActividades[i][2];
        celdaFin.innerHTML = listaActividades[i][3];
        celdaTotal.innerHTML = listaActividades[i][4];
    }

    orderActividadTable();
}

function orderActividadTable() {
    let table;
    let rows;
    let switching;
    let i;
    let x;
    let y;
    let shouldSwitch;

    table = document.getElementById('datosActividad');
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