'use strict';

/* Perfil - Sección Enfermedades - Tabla */

let btnEnfermedad = document.querySelector('#buttonRegistroEnfermedad');
let inputNombreEnfermedad = document.querySelector('#inputNombreEnfermedad');
let inputDescripcionEnfermedad = document.querySelector('#inputDescripcionEnfermedad');
let inputTratamientoEnfermedad = document.querySelector('#inputTratamientoEnfermedad');

let listaEnfermedades = [];
btnEnfermedad.addEventListener('click', getEnfermedad);


async function GetListaEnfermedades() {
    let result = await ProcessGet('ListarEnfermedades', null);
    if (result != null && result.resultado == true) {
        listaEnfermedades = result.ListaEnfermedadesDB;
        listaEnfermedades = listaEnfermedades.sort(function (a, b) {
            const nameA = a.Nombre.toUpperCase(); // ignore upper and lowercase
            const nameB = b.Nombre.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            // names must be equal
            return 0;
        });
        await ImprimirEnfermedades();
        console.log(listaEnfermedades);
    } else {
        ImprimirMsjError(result.msj);
        return;
    }
}

async function ImprimirEnfermedades() {
    let tbody = document.querySelector('#datosEnfermedad tbody');
    tbody.innerHTML = '';

    for (let i = 0; i < listaEnfermedades.length; i++) {

        let fila = tbody.insertRow();
        let celdaNombre = fila.insertCell();
        let celdaDescripcion = fila.insertCell();
        let celdaEstado = fila.insertCell();
        let celdaTratamiento = fila.insertCell();
        let celdaAcciones = fila.insertCell();

        celdaNombre.innerHTML = listaEnfermedades[i].Nombre;
        celdaDescripcion.innerHTML = listaEnfermedades[i].Descripcion;
        celdaEstado.innerHTML = listaEnfermedades[i].Estado;
        celdaTratamiento.innerHTML = listaEnfermedades[i].Tratamiento;

        let divButtonEliminar = document.createElement('div');
        divButtonEliminar.className = "buttonEliminar";
        let buttonbuttonEliminar = document.createElement("button");
        buttonbuttonEliminar.type = "button";

        buttonbuttonEliminar.onclick = async function () {
            let confirmacion = false;
            await Swal.fire({
                title: 'Eliminación de registro de enfermedad',
                text: 'Desea eliminar la enfermedad registrada ' + listaEnfermedades[i].Nombre + '?',
                icon: 'warning',
                showDenyButton: true,
                denyButtonText: 'Cancelar',
                confirmButtonText: 'Confirmar'
            }).then((res) => {
                confirmacion = res.isConfirmed;
            });

            if (confirmacion == true) {
                let data = {
                    '_id': listaEnfermedades[i]._id
                };
                let result = await ProcessDelete('EliminarEnfermedad', data);
                if (result.resultado == true) {
                    ImprimirMsjSuccess(result.msj);
                } else {
                    ImprimirMsjError(result.msj);
                }
                await GetListaEnfermedades();
            }
        };
        let iButtonEliminar = document.createElement("i");
        iButtonEliminar.className = "fa-solid fa-trash-can";
        buttonbuttonEliminar.appendChild(iButtonEliminar);
        divButtonEliminar.appendChild(buttonbuttonEliminar);
        celdaAcciones.appendChild(divButtonEliminar);
    }
}

async function getEnfermedad() {
    let sNombre = inputNombreEnfermedad.value;
    let sDescripcion = inputDescripcionEnfermedad.value;
    let sEstado = radioEstadoEval();
    let sTratamiento = inputTratamientoEnfermedad.value;
    let result = null;

    if (validarEnfermedades(sNombre, sDescripcion, sEstado, sTratamiento) == true) {
        return;
    }



    //Acomodo para enviar el json con la información a la DB

    let data = {
        Nombre: sNombre,
        Descripcion: sDescripcion,
        Estado: sEstado,
        Tratamiento: sTratamiento
    };

    result = await ProcessPost('RegistrarEnfermedad', data, null);

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
            GetListaEnfermedades();
            cerrarFormularioEnfermedadesFunc();
        });
    }

    //Resetear valores en form
    inputNombreEnfermedad.value = "";
    inputDescripcionEnfermedad.value = "";
    inputTratamientoEnfermedad.value = "";

    document.getElementById("radioNoConcurrencia").checked = false;
    document.getElementById("radioConcurrencia").checked = false;

}
//Evalúa cual de los dos radio buttons fue seleccionado
function radioEstadoEval() {
    let option;
    if (document.getElementById('radioNoConcurrencia').checked) {
        option = document.getElementById('radioNoConcurrencia').value;
    } else {
        option = document.getElementById('radioConcurrencia').value;
    }
    return option;
}

function validarEnfermedades(psNombre, psDescripcion, psEstado, pTratamiento) {
    let bandera = false;
    let cadena = '';

    if (psNombre == '' || psNombre == null || psNombre == undefined) {

        resaltarInputIncorrecto("inputNombreEnfermedad");
        cadena += 'Ingrese un nombre<br>';
        bandera = true;
    }
    else {
        corregirInputPeso("inputNombreEnfermedad");
    }

    if (psDescripcion == '' || psDescripcion == null || psDescripcion == undefined) {
        resaltarInputIncorrecto("inputDescripcionEnfermedad");
        cadena += 'Ingrese una descripción para la enfermedad<br>';
        bandera = true;
    }
    else {
        corregirInputPeso("inputDescripcionEnfermedad");

    }
    if (!document.getElementById("radioNoConcurrencia").checked && !document.getElementById("radioConcurrencia").checked) {
        resaltarInputIncorrecto("cajitaRadio");
        cadena += 'Elija una opción de estado de enfermedad<br>';
        bandera = true;
    }
    else {
        corregirInputPeso("cajitaRadio");
    }

    if (pTratamiento == '' || pTratamiento == null || pTratamiento == undefined) {
        resaltarInputIncorrecto("inputTratamientoEnfermedad");
        cadena += 'Ingrese el tratamiento a esta enfermedad<br>';
        bandera = true;
    }
    else {
        corregirInputPeso("inputTratamientoEnfermedad");
    }

    if (bandera == true) {
        imprimirMsjError(cadena);
    }
    return bandera;
}



// ABRIR Y CERRAR FORMULARIOS
const abrirFormularioEnfermedades = document.querySelector('#btnRegistroAbrirEnfermedad');
const fondoNegroEnfermedades = document.querySelector('.fondoNegro');
const xCerrarFormularioEnfermedades = document.querySelector('#xFormularioEnfermedades');

abrirFormularioEnfermedades.addEventListener('click', abrirFormularioEnfermedadesFunc);
fondoNegroEnfermedades.addEventListener('click', cerrarFormularioEnfermedadesFunc);
xCerrarFormularioEnfermedades.addEventListener('click', cerrarFormularioEnfermedadesFunc);

function abrirFormularioEnfermedadesFunc() {
    document.querySelector('#ingresoDatosEnfermedades').style.display = 'block';
    document.querySelector('.fondoNegro').style.display = 'block';
    document.querySelector('body').style.overflowY = 'hidden';

}

function cerrarFormularioEnfermedadesFunc() {
    document.querySelector('#ingresoDatosEnfermedades').style.display = 'none';
    document.querySelector('.fondoNegro').style.display = 'none';
    document.querySelector('body').style.overflowY = 'initial';
}