'use strict';

/* Perfil - Sección Peso - Tabla */

let listaPeso = [];

let btnPeso = document.querySelector('#buttonRegistroPeso');
let inputPeso = document.querySelector('#inputPeso');
let inputFechaPeso = document.querySelector('#inputFecha');

btnPeso.addEventListener('click', getPesoFecha);



async function GetListaPeso() {
    let result = await ProcessGet('ListarPesos', null);
    if (result != null && result.resultado == true) {
        listaPeso = result.ListaPesosDB;
        //Esto me acomoda las fechas en orden cronológico antes de imprimir/graficar
        listaPeso = listaPeso.sort(
            (objA, objB) => Number(new Date(objB.FechaRegistroPeso)) - Number(new Date(objA.FechaRegistroPeso)),
        );
        console.log(listaPeso);
        ImprimirPesos();
        graficoPeso();
    } else {
        ImprimirMsjError(result.msj);
        return;
    }
}

async function ImprimirPesos() {
    let tbody = document.querySelector('#datosPeso tbody');
    tbody.innerHTML = '';

    for (let i = 0; i < listaPeso.length; i++) {

        let fila = tbody.insertRow();
        let celdaFechaRegistroPeso = fila.insertCell();
        let celdaPeso = fila.insertCell();
        let celdaIMC = fila.insertCell();
        let celdaClasificacionIMC = fila.insertCell();
        let celdaAcciones = fila.insertCell();

        let divButtonEliminar = document.createElement('div');
        divButtonEliminar.className = "buttonEliminar";
        let buttonbuttonEliminar = document.createElement("button");
        buttonbuttonEliminar.type = "button";

        buttonbuttonEliminar.onclick = async function () {
            let confirmacion = false;
            await Swal.fire({
                title: 'Eliminación de registro del peso',
                text: 'Desea eliminar el peso registrado el  ' + listaPeso[i].FechaRegistroPeso + '?',
                icon: 'warning',
                showDenyButton: true,
                denyButtonText: 'Cancelar',
                confirmButtonText: 'Confirmar'
            }).then((res) => {
                confirmacion = res.isConfirmed;
            });

            if (confirmacion == true) {
                let data = {
                    '_id': listaPeso[i]._id
                };
                let result = await ProcessDelete('EliminarPeso', data);
                if (result.resultado == true) {
                    ImprimirMsjSuccess(result.msj);
                } else {
                    ImprimirMsjError(result.msj);
                }
                await GetListaPeso();
            }
        };
        let iButtonEliminar = document.createElement("i");
        iButtonEliminar.className = "fa-solid fa-trash-can";
        buttonbuttonEliminar.appendChild(iButtonEliminar);
        divButtonEliminar.appendChild(buttonbuttonEliminar);

        celdaAcciones.appendChild(divButtonEliminar);





        celdaPeso.innerHTML = listaPeso[i].Peso;
        celdaFechaRegistroPeso.innerHTML = listaPeso[i].FechaRegistroPeso;
        celdaIMC.innerHTML = listaPeso[i].IMC;
        celdaClasificacionIMC.innerHTML = listaPeso[i].Clasificacion;
    }
}


async function getPesoFecha() {
    let nPeso = Number(inputPeso.value);
    let sFecha = inputFechaPeso.value;
    let result = null;

    if (validarPeso() == true) {
        return;
    }

    let IMCCalculado = Math.round(nPeso / Math.pow(Number(document.getElementById('alturaUsuario').textContent), 2));
    let ClasificacionCalculado;
    if (IMCCalculado < 18.5) {
        ClasificacionCalculado = 'Bajo peso'
    } else if (IMCCalculado >= 18.5 && IMCCalculado < 25) {
        ClasificacionCalculado = 'Peso saludable'
    }
    else if (IMCCalculado >= 25 && IMCCalculado < 30) {
        ClasificacionCalculado = 'Sobre peso'
    }
    else {
        ClasificacionCalculado = 'Obesidad'
    }

    let data = {
        Peso: nPeso,
        FechaRegistroPeso: sFecha,
        IMC: IMCCalculado,
        Clasificacion: ClasificacionCalculado
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
            cerrarFormularioPesoFunc();
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
    for (let i = 0; i < listaPeso.length; i++) {
        yArray1.push(listaPeso[i].Peso);
        yArray2.push(listaPeso[i].IMC);
        xArray.push(listaPeso[i].FechaRegistroPeso);
    }
    let trace1 = [{
        type: 'scatter',
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
        type: 'scatter',
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
        xaxis: {
            range: -xArray,
            title: "Fecha",
            automargin: true,
            titlefont: { size: 40 },
        },
        yaxis: {
            range: [0, Math.max(...yArray1) + 20],
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
            range: -xArray,
            title: "Fecha",
            automargin: true,
            titlefont: { size: 40 },

        },
        yaxis: {
            //range: yArray2,
            title: "IMC",
            automargin: true,
            titlefont: { size: 40 },
            range: [0, Math.max(...yArray2) + 20],
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

//Validar peso valido
function validarPeso() {
    let iPeso = Number(inputPeso.value);
    let sInputFechaPeso = inputFechaPeso.value;
    let anioPeso = sInputFechaPeso.split("-")[0];
    let mesPeso = Number(sInputFechaPeso.split("-")[1]) - 1; // Se le resta un dia al mes porque empieza en 0=Enero
    let diaPeso = sInputFechaPeso.split("-")[2];
    let nuevaFechaPeso = new Date(anioPeso, mesPeso, diaPeso, 0, 0, 0);
    let cadena = '';
    let bandera = false;


    if (iPeso < 25 || iPeso > 635) {
        resaltarInputIncorrecto("inputPeso");
        cadena += 'Ingrese un peso real<br>';
        bandera = true;
    }
    else {
        if (iPeso == '' || iPeso == null || iPeso == 0) {
            resaltarInputIncorrecto("inputPeso");
            cadena += 'Ingrese un peso<br>';
            bandera = true;
        }
        else {
            corregirInputPeso("inputPeso");
        }
    }

    if (nuevaFechaPeso > new Date()) {
        resaltarInputIncorrecto("inputFecha");
        cadena += 'No se puede ingresar una fecha en el futuro';
        bandera = true;
    }
    else {
        if (sInputFechaPeso == '' || sInputFechaPeso == null) {
            resaltarInputIncorrecto("inputFecha");
            cadena += 'Ingrese una fecha<br>';
            bandera = true;
        } else {
            corregirInputPeso("inputFecha");
        }
    }

    if (bandera == true) {
        Swal.fire({ icon: 'error', title: 'Información faltante', html: cadena });
    }
    return bandera;
}

// ABRIR Y CERRAR FORMULARIOS
const abrirFormularioPeso = document.querySelector('#btnRegistroAbrirPeso');
const fondoNegroPeso = document.querySelector('.fondoNegro');
const xCerrarFormularioPeso = document.querySelector('#xFormularioPeso');

abrirFormularioPeso.addEventListener('click', abrirFormularioPesoFunc);
fondoNegroPeso.addEventListener('click', cerrarFormularioPesoFunc);
xCerrarFormularioPeso.addEventListener('click', cerrarFormularioPesoFunc);

function abrirFormularioPesoFunc() {
    document.querySelector('#ingresoDatosPeso').style.display = 'block';
    document.querySelector('.fondoNegro').style.display = 'block';
    document.querySelector('body').style.overflowY = 'hidden';

}

function cerrarFormularioPesoFunc() {
    document.querySelector('#ingresoDatosPeso').style.display = 'none';
    document.querySelector('.fondoNegro').style.display = 'none';
    document.querySelector('body').style.overflowY = 'initial';
}