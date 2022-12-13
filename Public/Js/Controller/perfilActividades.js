//'use strict';  Por alguna razon este Strict da errores en consola **Revisar

/* Perfil - Sección Actividades - Tabla */
'use strict';

let valorFechaActividad = document.getElementById("inputFechaActividad");
let valorHoraInicioActividad = document.getElementById("inputHoraInicioActividad");
let valorHoraFinActividad = document.getElementById("inputHoraFinActividad");
let valorActividad = document.getElementById("inputNombreActividad");
let btnRegistrarActividad = document.getElementById("buttonRegistroActividad");

let listaActividades = [];

let listaHorasActividad = [];
let listaCantidadActividad = [];
let listatipoActividad = [];


btnRegistrarActividad.addEventListener("click", getActividad);

async function GetListaActividad() {
    let result = await ProcessGet('ListarActividadRealizada', null);
    if (result != null && result.resultado == true) {
        listaActividades = result.ListaRegistrosActividadesDB;
        //Esto me acomoda las fechas en orden cronológico antes de imprimir/graficar
        listaActividades = listaActividades.sort(
            (objA, objB) => Number(new Date(objB.Fecha)) - Number(new Date(objA.Fecha)),
        );
        await ImprimirActividades();
        graficoActividades();
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
        let celdaAcciones = fila.insertCell();
        celdaFecha.innerHTML = listaActividades[i].Fecha;
        celdaHoraInicio.innerHTML = listaActividades[i].HoraInicio;
        celdaFechaFin.innerHTML = listaActividades[i].HoraFin;
        celdaTiempoTotal.innerHTML = listaActividades[i].TotalTiempo;
        celdaTipo.innerHTML = listaActividades[i].Tipo;

        let divButtonEliminar = document.createElement('div');
        divButtonEliminar.className = "buttonEliminar";
        let buttonbuttonEliminar = document.createElement("button");
        buttonbuttonEliminar.type = "button";

        buttonbuttonEliminar.onclick = async function () {
            let confirmacion = false;
            await Swal.fire({
                title: 'Eliminación de registro de actividad física',
                text: 'Desea eliminar la actividad ' + listaActividades[i].Tipo + ' registrada el ' + listaActividades[i].Fecha + '?',
                icon: 'warning',
                showDenyButton: true,
                denyButtonText: 'Cancelar',
                confirmButtonText: 'Confirmar'
            }).then((res) => {
                confirmacion = res.isConfirmed;
            });

            if (confirmacion == true) {
                let data = {
                    '_id': listaActividades[i]._id
                };
                let result = await ProcessDelete('EliminarActividad', data);
                if (result.resultado == true) {
                    ImprimirMsjSuccess(result.msj);
                } else {
                    ImprimirMsjError(result.msj);
                }
                await GetListaActividad();
            }
        };
        let iButtonEliminar = document.createElement("i");
        iButtonEliminar.className = "fa-solid fa-trash-can";
        buttonbuttonEliminar.appendChild(iButtonEliminar);
        divButtonEliminar.appendChild(buttonbuttonEliminar);
        celdaAcciones.appendChild(divButtonEliminar);
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

    if (validarActividad(sFecha, sInicioHora, sFinHora, sActividad, InicioActividad, FinActividad) == true) {
        return;
    }

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
            cerrarFormularioActividadFunc();
            GetListaActividad();
        });
    }

    //Resetear valores en form
    valorFechaActividad.value = "";
    valorHoraInicioActividad.value = "";
    valorHoraFinActividad.value = "";
    valorActividad.value = "";


}


function validarActividad(sFecha, sInicioHora, sFinHora, sActividad, DateInicio, DateFinal) {
    let bandera = false;
    let cadena = '';
    //Esta sección valida que haya información en las horas y fechas
    if (sFecha == '' || sFecha == null || sFecha == undefined) {
        resaltarInputIncorrecto("inputFechaActividad");
        cadena += 'Ingrese la fecha<br>';
        bandera = true;
    }
    else {
        corregirInputPeso("inputFechaActividad");
    }

    if (sFinHora == '' || sFinHora == null || sFinHora == undefined) {
        resaltarInputIncorrecto("inputHoraFinActividad");
        cadena += 'Ingrese la hora de fin<br>';
        bandera = true;
    }
    else {
        corregirInputPeso("inputHoraFinActividad");
    }

    if (sActividad == '' || sActividad == null || sActividad == undefined) {
        resaltarInputIncorrecto("inputNombreActividad");
        cadena += 'Seleccione un ejercicio<br>';
        bandera = true;
    }
    else {
        corregirInputPeso("inputNombreActividad");
    }
    if (sInicioHora == '' || sInicioHora == null || sInicioHora == undefined) {
        resaltarInputIncorrecto("inputHoraInicioActividad");
        cadena += 'Ingrese la hora de inicio<br>';
        bandera = true;
    }
    else {
        if (DateInicio >= DateFinal) {
            resaltarInputIncorrecto("inputHoraInicioActividad");
            cadena += 'La hora de fin no puede ser antes que la hora de inicio<br>';
            bandera = true;
        }
        else {
            if (DateInicio > new Date()) {
                resaltarInputIncorrecto("inputHoraInicioActividad");
                cadena += 'La fecha no puede ser en el futuro<br>';
                bandera = true;
            }
            else {
                corregirInputPeso("inputHoraInicioActividad");
            }
        }

    }

    if (bandera == true) {
        imprimirMsjError(cadena);
    }
    return bandera;
}

function crearArreglosActividad() {
    let position;
    listaHorasActividad = [];
    listaCantidadActividad = [];
    listatipoActividad = [];
    for (let i = 0; i < listaActividades.length; i++) {
        if (listatipoActividad.includes(listaActividades[i].Tipo)) {
            position = listatipoActividad.indexOf(listaActividades[i].Tipo);
            listaHorasActividad[position] = Number(listaActividades[i].TotalTiempo) + Number(listaHorasActividad[position])
            listaCantidadActividad[position] += 1;
        }
        else {
            listatipoActividad.push(listaActividades[i].Tipo);
            listaHorasActividad.push(listaActividades[i].TotalTiempo);
            listaCantidadActividad.push(1);
        }
    }
}
function graficoActividades() {

    let graphPeso = document.getElementById('graphActividad1');
    let graphIMC = document.getElementById('graphActividad2');

    crearArreglosActividad();

    let yArray1 = listaHorasActividad;
    let yArray2 = listaCantidadActividad;
    let xArray = listatipoActividad;

    let trace1 = [{
        type: 'bar',
        name: 'Peso',
        x: xArray,
        y: yArray1,
        marker: {
            color: 'rgba(119,194,137,.5)',
            line: {
                color: 'rgb(8,48,107)',
                width: 1
            }

        }
    }];

    let trace2 = [{
        type: 'bar',
        name: 'IMC',
        x: xArray,
        y: yArray2,
        marker: {
            color: 'rgba(119,194,137,.5)',
            line: {
                color: 'rgb(8,48,107)',
                width: 1
            }
        }

    }];

    let layout1 = {
        title: 'Total de tiempo por actividad',
        titlefont: { size: 40 },
        xaxis: {
            range: -xArray,
            title: "Tipo de actividad",
            automargin: true,
            titlefont: { size: 30 },
        },
        yaxis: {
            autorange: true,
            title: "Minutos",
            automargin: true,
            titlefont: { size: 30 },
        },
        font: {
            family: 'Noto Serif',
            size: 20,
            color: '#286412'
        },
    };

    let layout2 = {
        title: 'Cantidad de repeticiones por actividad ',
        titlefont: { size: 40 },
        margin: 40,
        xaxis: {
            range: xArray,
            title: "Tipo de actividad",
            automargin: true,
            titlefont: { size: 30 }
        },
        yaxis: {
            //range: yArray2,
            title: "Repeticiones",
            automargin: true,
            titlefont: { size: 30 },
            autorange: true
        },
        font: {
            family: 'Noto Serif',
            size: 20,
            color: '#286412'
        },
    };

    let config = {
        scrollZoom: true,
        responsive: true,
        displaylogo: false
    }
    Plotly.newPlot(graphPeso, trace1, layout1, config);
    Plotly.newPlot(graphIMC, trace2, layout2, config);
}


// ABRIR Y CERRAR FORMULARIOS
const abrirFormularioActividad = document.querySelector('#btnRegistroAbrirEjercicio');
const fondoNegroActividad = document.querySelector('.fondoNegro');
const xCerrarFormularioActividad = document.querySelector('#xFormularioActividad');

abrirFormularioActividad.addEventListener('click', abrirFormularioActividadFunc);
fondoNegroActividad.addEventListener('click', cerrarFormularioActividadFunc);
xCerrarFormularioActividad.addEventListener('click', cerrarFormularioActividadFunc);

function abrirFormularioActividadFunc() {
    document.querySelector('#ingresoDatosActividades').style.display = 'block';
    document.querySelector('.fondoNegro').style.display = 'block';
    document.querySelector('body').style.overflowY = 'hidden';

}

function cerrarFormularioActividadFunc() {
    document.querySelector('#ingresoDatosActividades').style.display = 'none';
    document.querySelector('.fondoNegro').style.display = 'none';
    document.querySelector('body').style.overflowY = 'initial';
}