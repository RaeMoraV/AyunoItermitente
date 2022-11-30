

/* SideMenu */

blockDisplay(null);

let btnSMInfo = document.getElementById('sideMenuInformacion');
let btnSMPeso = document.getElementById('sideMenuPeso');
let btnSMEnf = document.getElementById('sideMenuEnfermedades');
let btnSMAct = document.getElementById('sideMenuActividad');
let btnSMLog = document.getElementById('sideMenuLogros');
let btnSMPlan = document.getElementById('sideMenuPlan');
let btnSMRec = document.getElementById('sideMenuRecetas');

btnSMInfo.addEventListener('click', openInfo);
btnSMPeso.addEventListener('click', openPeso);
btnSMEnf.addEventListener('click', openEnfermedades);
btnSMAct.addEventListener('click', openActividades);
btnSMLog.addEventListener('click', openLogros);
btnSMPlan.addEventListener('click', openPlan);
btnSMRec.addEventListener('click', openRecetas);

function openInfo() {
    let option = 1;
    blockDisplay(option);
}

function openPeso() {
    let option = 2;
    blockDisplay(option);
}

function openEnfermedades() {
    let option = 3;
    blockDisplay(option);
}

function openActividades() {
    let option = 4;
    blockDisplay(option);
}

function openLogros() {
    let option = 5;
    blockDisplay(option);
}

function openPlan() {
    let option = 6;
    blockDisplay(option);
}

function openRecetas() {
    let option = 7;
    blockDisplay(option);
}


function blockDisplay(pOpcionSM) {
    switch (pOpcionSM) {
        case 1:
            document.getElementById('informacion').style.display = 'block';
            document.getElementById('peso').style.display = 'none';
            document.getElementById('enfermedades').style.display = 'none';
            document.getElementById('actividadFisica').style.display = 'none';
            document.getElementById('logroObjetivos').style.display = 'none';
            document.getElementById('planAyuno').style.display = 'none';
            document.getElementById('recetas').style.display = 'none';
            break;
        case 2:
            document.getElementById('informacion').style.display = 'none';
            document.getElementById('peso').style.display = 'block';
            document.getElementById('enfermedades').style.display = 'none';
            document.getElementById('actividadFisica').style.display = 'none';
            document.getElementById('logroObjetivos').style.display = 'none';
            document.getElementById('planAyuno').style.display = 'none';
            document.getElementById('recetas').style.display = 'none';
            break;
        case 3:
            document.getElementById('informacion').style.display = 'none';
            document.getElementById('peso').style.display = 'none';
            document.getElementById('enfermedades').style.display = 'block';
            document.getElementById('actividadFisica').style.display = 'none';
            document.getElementById('logroObjetivos').style.display = 'none';
            document.getElementById('planAyuno').style.display = 'none';
            document.getElementById('recetas').style.display = 'none';
            break;
        case 4:
            document.getElementById('informacion').style.display = 'none';
            document.getElementById('peso').style.display = 'none';
            document.getElementById('enfermedades').style.display = 'none';
            document.getElementById('actividadFisica').style.display = 'block';
            document.getElementById('logroObjetivos').style.display = 'none';
            document.getElementById('planAyuno').style.display = 'none';
            document.getElementById('recetas').style.display = 'none';
            break;
        case 5:
            document.getElementById('informacion').style.display = 'none';
            document.getElementById('peso').style.display = 'none';
            document.getElementById('enfermedades').style.display = 'none';
            document.getElementById('actividadFisica').style.display = 'none';
            document.getElementById('logroObjetivos').style.display = 'block';
            document.getElementById('planAyuno').style.display = 'none';
            document.getElementById('recetas').style.display = 'none';
            break;
        case 6:
            document.getElementById('informacion').style.display = 'none';
            document.getElementById('peso').style.display = 'none';
            document.getElementById('enfermedades').style.display = 'none';
            document.getElementById('actividadFisica').style.display = 'none';
            document.getElementById('logroObjetivos').style.display = 'none';
            document.getElementById('planAyuno').style.display = 'block';
            document.getElementById('recetas').style.display = 'none';
            break;
        case 7:
            document.getElementById('informacion').style.display = 'none';
            document.getElementById('peso').style.display = 'none';
            document.getElementById('enfermedades').style.display = 'none';
            document.getElementById('actividadFisica').style.display = 'none';
            document.getElementById('logroObjetivos').style.display = 'none';
            document.getElementById('planAyuno').style.display = 'none';
            document.getElementById('recetas').style.display = 'block';
            break;
        default:
            document.getElementById('informacion').style.display = 'none';
            document.getElementById('peso').style.display = 'block';
            document.getElementById('enfermedades').style.display = 'none';
            document.getElementById('actividadFisica').style.display = 'none';
            document.getElementById('logroObjetivos').style.display = 'none';
            document.getElementById('planAyuno').style.display = 'none';
            document.getElementById('recetas').style.display = 'none';
            break;
    }
}

/* Perfil - Sección Información */


/* Perfil - Sección Peso - Tabla */

let btnPeso = document.querySelector('#buttonRegistroPeso');
let inputPeso = document.querySelector('#inputPeso');
let inputFechaPeso = document.querySelector('#inputFecha');
let validacionProcesoPeso = 0;

btnPeso.addEventListener('click', getPesoFecha);

graficoPeso();

//Validar peso valido
function validarPeso() {
    let iPeso = Number(inputPeso.value);
    if (iPeso == '' || iPeso == null || iPeso == 0) {
        document.getElementById("inputPeso").focus();
        Swal.fire({ icon: 'error', title: 'Información faltante', text: 'Ingrese un peso' });
        validacionProcesoPeso = 1;
    }
    else if (iPeso < 25 || iPeso > 635) {
        document.getElementById("inputPeso").focus();
        Swal.fire({ icon: 'error', title: 'Información invalida', text: 'Ingrese un peso real' });
        inputPeso.focus();
        validacionProcesoPeso = 1;
    }
}

//Validar fecha valida
function validarFecha() {
    let sInputFechaPeso = inputFechaPeso.value;
    let anioPeso = sInputFechaPeso.split("-")[0];
    let mesPeso = Number(sInputFechaPeso.split("-")[1]) - 1; // Se le resta un dia al mes porque empieza en 0=Enero
    let diaPeso = sInputFechaPeso.split("-")[2];
    let nuevaFechaPeso = new Date(anioPeso, mesPeso, diaPeso, 0, 0, 0);

    if (sInputFechaPeso == '' || sInputFechaPeso == null) {
        document.getElementById("inputFecha").focus();
        Swal.fire({ icon: 'error', title: 'Información faltante', text: 'Ingrese una fecha' });
        validacionProcesoPeso = 1;
    } else if (nuevaFechaPeso > new Date()) {
        document.getElementById("inputFecha").focus();
        Swal.fire({ icon: 'error', title: 'Información invalida', text: 'No se puede ingresar una fecha en el futuro' });
        validacionProcesoPeso = 1;
    }
}

function getPesoFecha() {
    validacionProcesoPeso = 0;
    let nPeso = Number(inputPeso.value);
    let sFecha = inputFechaPeso.value;

    validarPeso(nPeso);

    if (validacionProcesoPeso == 0) {
        validarFecha();
    }

    if (validacionProcesoPeso == 0) {

        //Registro a distintos arrays en el js de services
        registrarPFI(nPeso, sFecha);

        //Actualiza la tabla de pesos
        imprimirPeso();

        //Actualiza el gráfico
        graficoPeso();

        //Resetear valores en form
        inputPeso.value = "";
        inputFechaPeso.value = "";
    }
}

function imprimirPeso() {
    let tbody = document.querySelector('#datosPeso tbody');
    let listaPesos = listarPFI();

    tbody.innerHTML = '';

    for (let i = 0; i < listaPesos[0].length; i++) {
        let fila = tbody.insertRow();
        let celdaPeso = fila.insertCell();
        let celdaFecha = fila.insertCell();
        let celdaIMC = fila.insertCell();

        celdaFecha.innerHTML = listaPesos[0][i];
        celdaPeso.innerHTML = listaPesos[1][i];
        celdaIMC.innerHTML = listaPesos[2][i];
    }
    orderPesoYFechaTable();
}

function orderPesoYFechaTable() {
    let table;
    let rows;
    let switching;
    let i;
    let x;
    let y;
    let shouldSwitch;

    table = document.getElementById('datosPeso');
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


/* Perfil - Sección Peso - Gráfico  */

function graficoPeso() {
    let graphPeso = document.getElementById('graphPeso');
    let graphIMC = document.getElementById('graphIMC');

    //ordenarPFI();

    let yArray1 = listarPesos();
    let yArray2 = listarIMC();

    let xArray = listarFechas();

    let trace1 = [{
        type: 'scatter',
        name: 'Peso',
        x: xArray,
        y: yArray1,
    }];

    let trace2 = [{
        type: 'scatter',
        name: 'IMC',
        x: xArray,
        y: yArray2,

    }];

    let layout1 = {
        xaxis: {
            range: xArray,
            title: "Fecha",
            automargin: true,
            titlefont: { size:40 },
        },
        yaxis: {
            range: yArray1,
            title: "Peso (kg)",
            automargin: true,
            titlefont: { size:40 },
        },
        font: {
            family: 'Noto Serif',
            size: 20,
            color: '#286412'
        },
    };

    let layout2 = {
        xaxis: {
            range: xArray,
            title: "Fecha",
            automargin: true,
            titlefont: { size:40 },
        },
        yaxis: {
            range: yArray2,
            title: "IMC",
            automargin: true,
            titlefont: { size:40 },
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

//Función para ordenar los datos antes de hacer gráficos
function ordenarPFI() {
    let posicionMin;
    let valorFechaMin;
    let tempFecha = [];
    let tempPeso = [];
    let tempIMC = [];
    let repetir = listaPFI[0].length;
    for (let i = 0; i < repetir; i++) {
        posicionMin = 0;
        valorFechaMin = listaPFI[1][0];
        for (let j = 1; j < repetir; j++) {
            if (new Date(listaPFI[1][j]) <= new Date(valorFechaMin)) {
                posicionMin = j;
                valorFechaMin = listaPFI[1][j];
            }
        }
        tempPeso.push(listaPFI[0].splice(posicionMin, 1)[0]);
        tempFecha.push(listaPFI[1].splice(posicionMin, 1)[0]);
        tempIMC.push(listaPFI[2].splice(posicionMin, 1)[0]);
    }
    listaPFI.push(tempPeso, tempFecha, tempIMC);
    listaFecha = tempFecha;
    listaPeso = tempPeso;
}



/* Perfil - Sección Enfermedades - Tabla */

let btnEnfermedad = document.querySelector('#buttonRegistroEnfermedad');
let inputNombreEnfermedad = document.querySelector('#inputNombreEnfermedad');
let inputDescripcionEnfermedad = document.querySelector('#inputDescripcionEnfermedad');
let inputTratamientoEnfermedad = document.querySelector('#inputTratamientoEnfermedad');


function radioEstadoEval() {
    let option;
    if (document.getElementById('radioNoConcurrencia').checked) {
        option = document.getElementById('radioNoConcurrencia').value;
    } else {
        option = document.getElementById('radioConcurrencia').value;
    }

    return option;
} //Evalúa cual de los dos radio buttons fue seleccionado

btnEnfermedad.addEventListener('click', getEnfermedad);

function getEnfermedad() {
    let sNombre = inputNombreEnfermedad.value;
    let sDescripcion = inputDescripcionEnfermedad.value;
    let sEstado = radioEstadoEval();
    let sTratamiento = inputTratamientoEnfermedad.value;

    registrarEnfermedad(sNombre, sDescripcion, sEstado, sTratamiento);
    imprimirEnfermedad();
}

function imprimirEnfermedad() {
    let tbody = document.querySelector('#datosEnfermedad tbody');
    let listaEnfermedades = listarEnfermedades();

    tbody.innerHTML = '';

    for (let i = 0; i < listaEnfermedades.length; i++) {
        let fila = tbody.insertRow();
        let celdaNombre = fila.insertCell();
        let celdaDescripcion = fila.insertCell();
        let celdaEstado = fila.insertCell();
        let celdaTratamiento = fila.insertCell();

        celdaNombre.innerHTML = listaEnfermedades[i][0];
        celdaDescripcion.innerHTML = listaEnfermedades[i][1];
        celdaEstado.innerHTML = listaEnfermedades[i][2];
        celdaTratamiento.innerHTML = listaEnfermedades[i][3];
    }

    orderEnfermedadTable();
}

function orderEnfermedadTable() {
    let table;
    let rows;
    let switching;
    let i;
    let x;
    let y;
    let shouldSwitch;

    table = document.getElementById('datosEnfermedad');
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

/* Perfil - Logros - Tabla  ---------------------------------------*/


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


/* Perfil - Seccion Recetas - Tabla */

let btnReceta = document.querySelector('#buttonRegistroReceta');
let inputNombreReceta = document.querySelector('#inputNombreReceta');
let inputIngredientesReceta = document.querySelector('#inputIngredientesReceta');
let inputPreparacionReceta = document.querySelector('#inputPreparacionReceta');
let inputTiempoReceta = document.querySelector('#inputTiempoReceta');


function radioTipoReceta() {
    let option;
    if (document.getElementById('inputRecetaDesayuno').checked) {
        option = document.getElementById('inputRecetaDesayuno').value;
    } else if (document.getElementById('inputRecetaAlmuerzo').checked) {
        option = document.getElementById('inputRecetaAlmuerzo').value;
    } else if (document.getElementById('inputRecetaCena').checked) {
        option = document.getElementById('inputRecetaCena').value;
    } else {
        option = document.getElementById('inputRecetaMerienda').value;
    }

    return option;
} //Evalua cual de los dos radio buttons fue seleccionado

btnReceta.addEventListener('click', getReceta);

function getReceta() {
    let sNombre = inputNombreReceta.value;
    let sIngredientes = inputIngredientesReceta.value;
    let sPreparacion = inputPreparacionReceta.value;
    let sTiempoReceta = inputTiempoReceta.value;
    let sTipo = radioTipoReceta();

    registrarRecetas(sNombre, sIngredientes, sPreparacion, sTiempoReceta, sTipo);
    imprimirReceta();
}

function imprimirReceta() {
    let tbody = document.querySelector('#datosReceta tbody');
    let listaRecetas = listarRecetas();

    tbody.innerHTML = '';

    for (let i = 0; i < listaRecetas.length; i++) {
        let fila = tbody.insertRow();
        let celdaNombre = fila.insertCell();
        let celdaIngredientes = fila.insertCell();
        let celdaPreparacion = fila.insertCell();
        let celdaTiempoReceta = fila.insertCell();
        let celdaTipo = fila.insertCell();

        celdaNombre.innerHTML = listaRecetas[i][0];
        celdaIngredientes.innerHTML = listaRecetas[i][1];
        celdaPreparacion.innerHTML = listaRecetas[i][2];
        celdaTiempoReceta.innerHTML = listaRecetas[i][3];
        celdaTipo.innerHTML = listaRecetas[i][4];
    }

    orderRecetaTable();
}

function orderRecetaTable() {
    let table;
    let rows;
    let switching;
    let i;
    let x;
    let y;
    let shouldSwitch;

    table = document.getElementById('datosReceta');
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