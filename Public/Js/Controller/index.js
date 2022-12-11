'use strict';
//Formulario Registro
let btnRegistrateYa = document.querySelector('#buttonRegistrate');
let btnCerrarRegistro = document.querySelector('#cerrarFormularioInscripcion');
let submitRegistrate = document.querySelector('#submitRegistrate');
let fotoPerfil = document.querySelector('#imgUserIndex');

let inputNombre = document.getElementById('txtNombre');
let inputApellido = document.getElementById('txtApellido');
let inputEmail = document.getElementById('txtEmail');
let inputEstatura = document.getElementById('txtEstatura');
let inputPesoDeseado = document.getElementById('txtPesoDeseado');
let inputGenero;

const anioInicio = 1900;//Anio limite para el formulario de registro

let inputDia = document.getElementById('numDia');
let inputMes = document.getElementById('numMes');
let inputAnio = document.getElementById('numAnio');
let inputFecha;

function selectSexo() {
    if (document.getElementById('optionMasculino').checked) {
        inputGenero = document.getElementById('optionMasculino').value;
    } else if (document.getElementById('optionFemenino').checked) {
        inputGenero = document.getElementById('optionFemenino').value;
    } else if (document.getElementById('optionOtroSexo').checked) {
        inputGenero = document.getElementById('optionOtroSexo').value;
    } else {
        inputGenero = '';
    }
    return inputGenero;
}
const fondoNegro = document.querySelector('.fondoNegro');

//Esto llena la parte de anios del registro
llenarSelectAnio();

//Formulario Registro
let listaUser = [];
submitRegistrate.addEventListener('click', getUser);


GetListaUser();

async function GetListaUser() {
    let result = await ProcessGet('ListarUsers', null);
    if (result != null && result.resultado == true) {
        listaUser = result.ListaUserDB;
        await ActualizarMenu();
        console.log(listaUser);
    } else {
        ImprimirMsjError(result.msj);
        return;
    }
}

async function ActualizarMenu() {
    if (listaUser != '') {
        document.getElementById("perfilOculto").removeAttribute("hidden");
        let aPerfil = document.createElement('a');
        aPerfil.href = "perfil.html";
        aPerfil.innerText = "Perfil";
        document.getElementById("buttonRegistrate").innerHTML = "";
        document.getElementById("buttonRegistrate").appendChild(aPerfil);
    }

}

async function getUser() {
    let sInputNombre = inputNombre.value;
    let sInputApellido = inputApellido.value;
    let sInputEmail = inputEmail.value;

    let iInputDia = inputDia.value;
    let iInputMes = inputMes.value;
    let iInputAnio = inputAnio.value;

    let sInputSexo = selectSexo();

    let iInputEstatura = inputEstatura.value;
    let iInputPesoDeseado = inputPesoDeseado.value;
    let sFotoPerfil = fotoPerfil.src;

    let sFechaNacimiento = iInputAnio + '-' + iInputMes + '-' + iInputDia;
    let dFechaNac = new Date(sFechaNacimiento);

    let result = null;

    /*
    if (validarUser() == true) {
        return;
    }*/

    let data = {
        Nombre: sInputNombre,
        Apellido: sInputApellido,
        FechaNacimiento: sFechaNacimiento,
        Correo: sInputEmail,
        Sexo: sInputSexo,
        Estatura: iInputEstatura,
        Foto: sFotoPerfil,
        PesoIdeal: iInputPesoDeseado
    };

    result = await ProcessPost('RegistrarUser', data, null);

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
            GetListaUser();
        });
    }

    //Resetear valores en form

}



//__________Funciones para abrir el formulario___________________________________________________
btnRegistrateYa.addEventListener('click', function () {
    document.querySelector('#formularioInscripcion').style.display = 'flex';
    document.querySelector('.fondoNegro').style.display = 'block';
    document.querySelector('body').style.overflowY = 'hidden';
});
btnRegistrateYa.addEventListener('click', function () {
    document.querySelector('#formularioInscripcion').style.display = 'flex';
    document.querySelector('.fondoNegro').style.display = 'block';
});

//Funciones para cerrar el formulario
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

/*
function actualizarFecha() {
    inputFecha = `${numDia.value},${numMes.value},${numAnio.value}`;
}

submitRegistrate.addEventListener('click', actualizarFecha);
*/




//Formulario Inicio Sesion NO ESTA EN USO
/*
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
*/

// Validation Functions
/*
function validarUser(inputNombre, inputApellido, inputEmail, inputEstatura, inputPesoDeseado, inputGenero, inputFecha, fotoPerfil) {
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
}
*/