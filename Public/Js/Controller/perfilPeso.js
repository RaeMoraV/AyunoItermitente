'use strict';
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