'use strict';

let inputNombre = document.getElementById('txtNombre');
let inputApellido = document.getElementById('txtApellido');
let inputEmail = document.getElementById('txtEmail');
let inputEstatura = document.getElementById('txtEstatura');
let inputPesoDeseado = document.getElementById('txtPesoDeseado');
let inputGenero;

const anioInicio = 1900;
let inputDia = document.getElementById('numDia');
let inputMes = document.getElementById('numMes');
let inputAnio = document.getElementById('numAnio');
let inputFecha;


const fondoNegro = document.querySelector('.fondoNegro');

llenarSelectAnio();
//Formulario Registro
const btnRegistrateYa = document.querySelector('#buttonRegistrate');
const btnCerrarRegistro = document.querySelector('#cerrarFormularioInscripcion');
const submitRegistrate = document.querySelector('#submitRegistrate');
const fotoPerfil = document.querySelector('#fotoPerfil');
let fotoSubida = "";

btnRegistrateYa.addEventListener('click', function(){
    document.querySelector('#formularioInscripcion').style.display = 'flex';
    document.querySelector('.fondoNegro').style.display = 'block';
    document.querySelector('body').style.overflowY = 'hidden';
});

btnRegistrateYa.addEventListener('click', function(){
    document.querySelector('#formularioInscripcion').style.display = 'flex';
    document.querySelector('.fondoNegro').style.display = 'block';
});

// fotoPerfil.addEventListener ('change', function(){
//     const reader = new FileReader();
//     reader.addEventListener('load', () => {
//        fotoSubida = reader.result;
//        document.querySelector("#showPhoto").style.backgroundImage = `url(${fotoSubida})`;
//     });
//     reader.readAsDataURL(this.files[0]);
// });

fondoNegro.addEventListener('click', cerrarRegistro);

btnCerrarRegistro.addEventListener('click', cerrarRegistro);



function cerrarRegistro() {
    document.querySelector('#formularioInscripcion').style.display = 'none';
    document.querySelector('.fondoNegro').style.display = 'none';
    document.querySelector('body').style.overflowY = 'initial';
}

function llenarSelectAnio() { 
    let anioActual = Number(new Date().getFullYear());
    for (let index = anioActual; index > anioInicio - 1; index--) {
        let select = inputAnio.innerHTML;
        let newYear = '<option value="' + index + '">' + index + '</option>';
        document.getElementById('numAnio').innerHTML = select + newYear;
    }
}

function genero() {
    let grupoRadio = document.getElementsByName('generoRadio');
    let checkedRadio = Array.from(grupoRadio).find((radio) => radio.checked);

    return checkedRadio;
};

function actualizarFecha(){
    inputFecha = `${numDia.value},${numMes.value},${numAnio.value}`;
}



submitRegistrate.addEventListener('click', actualizarFecha);

submitRegistrate.addEventListener('click', function(inputNombre, inputApellido, inputEmail, inputEstatura, inputPesoDeseado, inputGenero, inputFecha, fotoPerfil){
    if (inputNombre.value == '' || inputNombre.value == null || inputNombre.value == undefined) {
        imprimirMsjError('El campo Nombre es requerido');
    }
    if (inputApellido.value == '' || inputApellido.value == null || inputApellido.value == undefined) {
        imprimirMsjError('El campo Apellido es requerido');
    }
    if (inputEmail.value == '' || inputEmail.value == null || inputEmail.value == undefined) {
        imprimirMsjError('El campo Correo es requerido');
    }
    if (inputEstatura.value == '' || inputEstatura.value == null || inputEstatura.value == undefined) {
        imprimirMsjError('El campo Estatura es requerido');
    }
    if (inputPesoDeseado.value == '' || inputPesoDeseado.value == null || inputPesoDeseado.value == undefined) {
        imprimirMsjError('El campo Peso es requerido');
    }
    if (inputGenero.value == '' || inputGenero.value == null || inputGenero.value == undefined) {
        imprimirMsjError('El campo Genero es requerido');
    }
    if (inputDia.value == '' || inputDia.value == null || inputDia.value == undefined) {
        imprimirMsjError('El campo Dia es requerido');
    }
    if (inputMes.value == '' || inputMes.value == null || inputMes.value == undefined) {
        imprimirMsjError('El campo Mes es requerido');
    }
    if (inputAnio.value == '' || inputAnio.value == null || inputAnio.value == undefined) {
        imprimirMsjError('El campo Año es requerido');
    }
    if (fotoPerfil.value == '' || fotoPerfil.value == null || fotoPerfil.value == undefined) {
        imprimirMsjError('Por favor ingrese una foto de perfil!');
    }
});


// submitRegistrate.addEventListener('click', function(){
    
// });

//Formulario Inicio Sesion
const inicioSesion = document.getElementById('iniciarSesion');
const cerrarFormInicioSesion = document.getElementById('cerrarFormularioInicioSesion');

inicioSesion.addEventListener('click', abrirInicioSesion);
cerrarFormInicioSesion.addEventListener('click', cerrarInicioSesion);
fondoNegro.addEventListener('click', cerrarInicioSesion);

function abrirInicioSesion() {
    document.querySelector('#formularioInicioSesion').style.display = 'flex';
    document.querySelector('.fondoNegro').style.display = 'block';
    document.querySelector('body').style.overflowY = 'hidden';
};

function cerrarInicioSesion() {
    document.querySelector('#formularioInicioSesion').style.display = 'none';
    document.querySelector('.fondoNegro').style.display = 'none';
    document.querySelector('body').style.overflowY = 'initial';
};

// Validation Functions


function imprimirMsjError(pmensaje) {
    Swal.fire({
        title: 'Error',
        text: pmensaje,
        icon: 'error',
        confirmButtonText: 'OK'
    });
}

function imprimirMsjCorrecto(pmensaje) {
    Swal.fire({
        title: 'Genial!',
        text: pmensaje,
        icon: 'success',
        confirmButtonText: 'OK'
    });
}

function resaltarLabelIncorrecto(pLabelID) {
    let elementLabel = document.getElementById(pLabelID);
    let sytleOrigin = elementLabel.style;

    elementLabel.style = 'color:red;';
}

function resaltarInputIncorrecto(pInputID) {
    let elementInput = document.getElementById(pInputID);
    let sytleOrigin = elementInput.style;

    elementInput.style = 'border: 1px solid red;';
}


//Formulario Registro