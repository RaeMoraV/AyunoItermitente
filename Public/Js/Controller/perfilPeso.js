'use strict';

/* Perfil - Sección Peso - Tabla */

let listaPesos = [];

let btnPeso = document.querySelector('#buttonRegistroPeso');
let inputPeso = document.querySelector('#inputPeso');
let inputFechaPeso = document.querySelector('#inputFecha');

btnPeso.addEventListener('click', getPesoFecha);

GetListaPeso();

async function GetListaPeso() {
    let result = await ProcessGet('ListarPesos', null);
    if (result != null && result.resultado == true) {
        listaPesos = result.ListaPesosDB;
        //Esto me acomoda las fechas en orden cronológico antes de imprimir/graficar
        listaPesos = listaPesos.sort(
            (objA, objB) => Number(new Date(objA.FechaRegistroPeso)) - Number(new Date(objB.FechaRegistroPeso)),
        );
        await ImprimirPesos();
        graficoPeso();
        console.log(listaPesos);
    } else {
        ImprimirMsjError(result.msj);
        return;
    }
}

async function ImprimirPesos() {
    let tbody = document.querySelector('#datosPeso tbody');
    tbody.innerHTML = '';

    for (let i = 0; i < listaPesos.length; i++) {

        let fila = tbody.insertRow();
        let celdaPeso = fila.insertCell();
        let celdaFechaRegistroPeso = fila.insertCell();
        let celdaIMC = fila.insertCell();

        celdaPeso.innerHTML = listaPesos[i].Peso;
        celdaFechaRegistroPeso.innerHTML = listaPesos[i].FechaRegistroPeso;
        celdaIMC.innerHTML = listaPesos[i].IMC;
    }
}


async function getPesoFecha() {
    let nPeso = Number(inputPeso.value);
    let sFecha = inputFechaPeso.value;
    let result = null;

    if (validarPeso() == true) {
        return;
    }
    
    let data = {
        Peso: nPeso,
        FechaRegistroPeso: sFecha,
        IMC: nPeso / Math.round(Math.pow(Number(document.getElementById('alturaUsuario').textContent), 2)),
    };

    result = await ProcessPost('RegistrarPeso', data, null);

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
            GetListaPeso();
        });
    }

    //Resetear valores en form
    inputPeso.value = "";
    inputFechaPeso.value = "";

}


/* Perfil - Sección Peso - Gráfico  */

function graficoPeso() {
    let graphPeso = document.getElementById('graphPeso');
    let graphIMC = document.getElementById('graphIMC');
    let yArray1 = [];
    let yArray2 = [];
    let xArray = [];
    for (let i = 0; i < listaPesos.length; i++) {
        yArray1.push(listaPesos[i].Peso);
        yArray2.push(listaPesos[i].IMC);
        xArray.push(listaPesos[i].FechaRegistroPeso);
    }
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
            titlefont: { size: 40 },
        },
        yaxis: {
            range: [0, Math.max(...yArray1) + 10],
            autorange: false,
            title: "Peso (kg)",
            automargin: true,
            titlefont: { size: 40 },
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
            titlefont: { size: 40 },

        },
        yaxis: {
            //range: yArray2,
            title: "IMC",
            automargin: true,
            titlefont: { size: 40 },
            range: [0, Math.max(...yArray2)],
            autorange: false,
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

//VALIDACIONES PENDIENTE UNIFICAR EN UNA SOLA FUNCIÓN
//Validar peso valido
function validarPeso() {
    let iPeso = Number(inputPeso.value);
    let sInputFechaPeso = inputFechaPeso.value;
    let anioPeso = sInputFechaPeso.split("-")[0];
    let mesPeso = Number(sInputFechaPeso.split("-")[1]) - 1; // Se le resta un dia al mes porque empieza en 0=Enero
    let diaPeso = sInputFechaPeso.split("-")[2];
    let nuevaFechaPeso = new Date(anioPeso, mesPeso, diaPeso, 0, 0, 0);

    if (iPeso == '' || iPeso == null || iPeso == 0) {
        document.getElementById("inputPeso").focus();
        Swal.fire({ icon: 'error', title: 'Información faltante', text: 'Ingrese un peso' });
        return true;
    }
    else if (iPeso < 25 || iPeso > 635) {
        document.getElementById("inputPeso").focus();
        Swal.fire({ icon: 'error', title: 'Información invalida', text: 'Ingrese un peso real' });
        inputPeso.focus();
        return true;
    }
    else if (sInputFechaPeso == '' || sInputFechaPeso == null) {
        document.getElementById("inputFecha").focus();
        Swal.fire({ icon: 'error', title: 'Información faltante', text: 'Ingrese una fecha' });
        return true;
    } else if (nuevaFechaPeso > new Date()) {
        document.getElementById("inputFecha").focus();
        Swal.fire({ icon: 'error', title: 'Información invalida', text: 'No se puede ingresar una fecha en el futuro' });
        return true;
    }
    return false;
}

