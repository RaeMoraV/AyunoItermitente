

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
    blockDisplay (option);
}

function openPeso() {
    let option = 2;
    blockDisplay (option);
}

function openEnfermedades() {
    let option = 3;
    blockDisplay (option);
}

function openActividades() {
    let option = 4;
    blockDisplay (option);
}

function openLogros() {
    let option = 5;
    blockDisplay (option);
}

function openPlan() {
    let option = 6;
    blockDisplay (option);
}

function openRecetas() {
    let option = 7;
    blockDisplay (option);
}


function blockDisplay(pOpcionSM){
    switch(pOpcionSM){
        case 1:
            document.getElementById('informacion').style.display='block';
            document.getElementById('peso').style.display='none';
            document.getElementById('enfermedades').style.display='none';
            document.getElementById('actividadFisica').style.display='none';
            document.getElementById('logroObjetivos').style.display='none';
            document.getElementById('planAyuno').style.display='none';
            document.getElementById('recetas').style.display='none';
            break;
        case 2:
            document.getElementById('informacion').style.display='none';
            document.getElementById('peso').style.display='block';
            document.getElementById('enfermedades').style.display='none';
            document.getElementById('actividadFisica').style.display='none';
            document.getElementById('logroObjetivos').style.display='none';
            document.getElementById('planAyuno').style.display='none';
            document.getElementById('recetas').style.display='none';
            break;
        case 3:
            document.getElementById('informacion').style.display='none';
            document.getElementById('peso').style.display='none';
            document.getElementById('enfermedades').style.display='block';
            document.getElementById('actividadFisica').style.display='none';
            document.getElementById('logroObjetivos').style.display='none';
            document.getElementById('planAyuno').style.display='none';
            document.getElementById('recetas').style.display='none';
            break;
        case 4:
            document.getElementById('informacion').style.display='none';
            document.getElementById('peso').style.display='none';
            document.getElementById('enfermedades').style.display='none';
            document.getElementById('actividadFisica').style.display='block';
            document.getElementById('logroObjetivos').style.display='none';
            document.getElementById('planAyuno').style.display='none';
            document.getElementById('recetas').style.display='none';
            break;
        case 5:
            document.getElementById('informacion').style.display='none';
            document.getElementById('peso').style.display='none';
            document.getElementById('enfermedades').style.display='none';
            document.getElementById('actividadFisica').style.display='none';
            document.getElementById('logroObjetivos').style.display='block';
            document.getElementById('planAyuno').style.display='none';
            document.getElementById('recetas').style.display='none';
            break;
        case 6:
            document.getElementById('informacion').style.display='none';
            document.getElementById('peso').style.display='none';
            document.getElementById('enfermedades').style.display='none';
            document.getElementById('actividadFisica').style.display='none';
            document.getElementById('logroObjetivos').style.display='none';
            document.getElementById('planAyuno').style.display='block';
            document.getElementById('recetas').style.display='none';
            break;
        case 7:
            document.getElementById('informacion').style.display='none';
            document.getElementById('peso').style.display='none';
            document.getElementById('enfermedades').style.display='none';
            document.getElementById('actividadFisica').style.display='none';
            document.getElementById('logroObjetivos').style.display='none';
            document.getElementById('planAyuno').style.display='none';
            document.getElementById('recetas').style.display='block';
            break;
        default:
            document.getElementById('informacion').style.display='block';
            document.getElementById('peso').style.display='none';
            document.getElementById('enfermedades').style.display='none';
            document.getElementById('actividadFisica').style.display='none';
            document.getElementById('logroObjetivos').style.display='none';
            document.getElementById('planAyuno').style.display='none';
            document.getElementById('recetas').style.display='none';
            break;
    }
}

/* Perfil - Seccion Informacion */


/* Perfil - Seccion Peso - Tabla */

let btnPeso = document.querySelector('#buttonRegistroPeso');
let inputPeso = document.querySelector('#inputPeso');
let inputFechaPeso = document.querySelector('#inputFecha');

graficoPeso();

btnPeso.addEventListener('click', getPesoFecha);

function getPesoFecha() {
    let nPeso = Number(inputPeso.value);
    let sFecha = [];
    sFecha = inputFechaPeso.value;

    registrarPesoYFecha (nPeso, sFecha);
    registrarPeso (nPeso);
    registrarFecha (sFecha);

    imprimirPeso();
}

function imprimirPeso() {
    let tbody = document.querySelector('#datosPeso tbody');
    let listaPesos = listarPesosYFechas();

    tbody.innerHTML = '';

    for (let i = 0; i < listaPesos.length; i++) {
        let fila = tbody.insertRow();
        let celdaPeso = fila.insertCell();
        let celdaFecha = fila.insertCell();
        let celdaIMC = fila.insertCell();

        celdaFecha.innerHTML = listaPesos[i][0];
        celdaPeso.innerHTML = listaPesos[i][1];
        celdaIMC.innerHTML = listaPesos[i][2];
    }

    orderPesoYFechaTable ();
}

function orderPesoYFechaTable () {
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

/* Perfil - Seccion Peso - Grafico  */

function graficoPeso() {
    let graphPeso = document.getElementById('graphPeso');
    let yArray = listaPeso;
    let xArray = listaMeses;

    let data = [{
        x: xArray,
        y: yArray,
    }];

    let layout = {
        xaxis: {range: yArray, title: "Mes"},
        yaxis: {range: xArray, title: "Peso"}
    };

    Plotly.newPlot(graphPeso, data, layout);
}


/* Perfil - Seccion Enfermedades - Tabla */

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
} //Evalua cual de los dos radio buttons fue seleccionado

btnEnfermedad.addEventListener('click', getEnfermedad);

function getEnfermedad() {
    let sNombre = inputNombreEnfermedad.value;
    let sDescripcion = inputDescripcionEnfermedad.value;
    let sEstado = radioEstadoEval();
    let sTratamiento = inputTratamientoEnfermedad.value;

    registrarEnfermedad (sNombre, sDescripcion, sEstado, sTratamiento);
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

    orderEnfermedadTable ();
}

function orderEnfermedadTable () {
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

/* Perfil - Seccion Actividades - Tabla */

let btnSActividad = document.querySelector('#buttonRegistroActividad');
let inputFechaActividad = document.querySelector('#inputFechaActividad');
let inputNombreActividad = document.querySelector('#inputNombreActividad');
let inputInicioActividad = document.querySelector('#inputInicioActividad');
let inputFinActividad = document.querySelector('#inputFinActividad');

//Constantes para obtener el total de tiempo invertido en una actividad
const startHour = document.getElementById("s_h"),
  startMinute = document.getElementById("s_m"),
  startSecond = document.getElementById("s_s"),
  endHour = document.getElementById("e_h"),
  endMinute = document.getElementById("e_m"),
  endSecond = document.getElementById("e_s"),
  button = document.getElementById("button"),
  output = document.getElementById("output");

   
function radioEstadoEval() {
    let option;
    if (document.getElementById('radioNoConcurrencia').checked) {
        option = document.getElementById('radioNoConcurrencia').value;
    } else {
        option = document.getElementById('radioConcurrencia').value;
    }

    return option;
} //Evalua cual de los dos radio buttons fue seleccionado

btnEnfermedad.addEventListener('click', getEnfermedad);

function getEnfermedad() {
    let sNombre = inputNombreEnfermedad.value;
    let sDescripcion = inputDescripcionEnfermedad.value;
    let sEstado = radioEstadoEval();
    let sTratamiento = inputTratamientoEnfermedad.value;

    registrarEnfermedad (sNombre, sDescripcion, sEstado, sTratamiento);
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

    orderEnfermedadTable ();
}

function orderEnfermedadTable () {
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


/* Perfil - Seccion Ayuno - Tabla  ---------------------------------------*/
let 