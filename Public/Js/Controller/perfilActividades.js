//'use strict';  Por alguna razon este Strict da errores en consola **Revisar

/* Perfil - Sección Actividades - Tabla */
'use strict';

let valorFechaActividad = document.getElementById("inputFechaActividad");
let valorHoraInicioActividad = document.getElementById("inputHoraInicioActividad");
let valorHoraFinActividad = document.getElementById("inputHoraFinActividad");
let valorActividad = document.getElementById("inputNombreActividad");
let btnRegistrarActividad = document.getElementById("buttonRegistroActividad");

let listaActividades = [];


btnRegistrarActividad.addEventListener("click", getActividad);

GetListaActividad();

async function GetListaActividad() {
    let result = await ProcessGet('ListarActividadRealizada', null);
    if (result != null && result.resultado == true) {
        listaActividades = result.ListaRegistrosActividadesDB;
        //Esto me acomoda las fechas en orden cronológico antes de imprimir/graficar
        listaActividades = listaActividades.sort(
            (objA, objB) => Number(new Date(objB.Fecha)) - Number(new Date(objA.Fecha)),
        );
        await ImprimirActividades();
        console.log(listaActividades);
    } else {
        ImprimirMsjError(result.msj);
        return;
    }
}

async function ImprimirActividades() {
    let tbody = document.querySelector('#datosActividad tbody');
    tbody.innerHTML = '';

    for (let i = 0; i < listaActividades.length; i++) {

        let fila = tbody.insertRow();
        let celdaFecha = fila.insertCell();
        let celdaHoraInicio = fila.insertCell();
        let celdaFechaFin = fila.insertCell();
        let celdaTiempoTotal = fila.insertCell();
        let celdaTipo = fila.insertCell();

        celdaFecha.innerHTML = listaActividades[i].Fecha;
        celdaHoraInicio.innerHTML = listaActividades[i].HoraInicio;
        celdaFechaFin.innerHTML = listaActividades[i].HoraFin;
        celdaTiempoTotal.innerHTML = listaActividades[i].TotalTiempo;
        celdaTipo.innerHTML = listaActividades[i].Tipo;
    }
}

async function getActividad() {
    //Datos extraídos de los inputs
    let sFecha = valorFechaActividad.value; //String 3 nov 2022 = 2022-11-03
    let sInicioHora = valorHoraInicioActividad.value;//String 12:22
    let sFinHora = valorHoraFinActividad.value;//String 12:24
    let sActividad = valorActividad.value;

    // Datos específicos sacados haciéndole split a la fecha
    let valorAnio = sFecha.split("-")[0];
    let valorMes = sFecha.split("-")[1];
    valorMes = Number(valorMes) - 1; // Hay que restarle 1 porque los meses empiezan en zero
    let valorDia = sFecha.split("-")[2];

    //Datos específicos sacados haciéndole split de Hora Inicio
    let valorHora = sInicioHora.split(":")[0];
    let valorMin = sInicioHora.split(":")[1];

    //Datos específicos sacados haciéndole split de FECHA FINAL
    let valorHoraF = sFinHora.split(":")[0];
    let valorMinF = sFinHora.split(":")[1];

    //Creación de los objetos date con los datos anteriores
    let InicioActividad = new Date(valorAnio, valorMes, valorDia, valorHora, valorMin);
    let FinActividad = new Date(valorAnio, valorMes, valorDia, valorHoraF, valorMinF);

    let result = null;

    /*if (validarActividad(sFecha, sInicioHora, sFinHora, sActividad, DateInicio, DateFinal) == true) {
        return;
    }*/

    let totalHoras = Math.round((FinActividad.getTime() - InicioActividad.getTime()) / (1000 * 60));


    //Acomodo para enviar el json con la información a la DB

    let data = {
        Fecha: sFecha,
        HoraInicio: sInicioHora,
        HoraFin: sFinHora,
        TotalTiempo: totalHoras,
        Tipo: sActividad
    };


    result = await ProcessPost('RegistrarActividadRealizada', data, null);

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
            GetListaActividad();
        });
    }

    //Resetear valores en form
    valorFechaActividad.value = "";
    valorHoraInicioActividad.value = "";
    valorHoraFinActividad.value = "";
    valorActividad.value = "";

    
}


/*function validarActividad(pDateInicio, pDateFinal) {

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
}*/





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