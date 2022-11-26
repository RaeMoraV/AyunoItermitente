'use strict';

let inputNombre = document.getElementById('txtNombre');
let inputApellido = document.getElementById('txtApellido');
let inputEmail = document.getElementById('txtEmail');
let inputEstatura = document.getElementById('txtEstatura');
let inputPesoDeseado = document.getElementById('txtPesoDeseado');
let inputGenero;

const anioInicio = 1900;
let inputDia = document.getElementById('numDia').value;
let inputMes = document.getElementById('numMes').value;
let inputAnio = document.getElementById('numAnio');
let inputFecha = new Date(`${numDia}, ${numMes}, ${numAnio}`);

const fondoNegro = document.querySelector('.fondoNegro');

llenarSelectAnio();
//Formulario
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

fondoNegro.addEventListener('click', cerrarRegistro);

btnCerrarRegistro.addEventListener('click', cerrarRegistro);

btnRegistrateYa.addEventListener('click', function(){
    document.querySelector('#formularioInscripcion').style.display = 'flex';
    document.querySelector('.fondoNegro').style.display = 'block';
});

fotoPerfil.addEventListener ('change', function(){
     const reader = new FileReader();
     reader.addEventListener('load', () => {
        fotoSubida = reader.result;
        document.querySelector("#showPhoto").style.backgroundImage = `url(${fotoSubida})`;
     });
     reader.readAsDataURL(this.files[0]);
});



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

submitRegistrate.addEventListener('click', function(inputNombre, inputApellido, inputEmail, inputGenero = genero(), inputEstatura, inputPesoDeseado, formularioFecha){

});

// submitRegistrate.addEventListener('click', function(){
    
// });

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