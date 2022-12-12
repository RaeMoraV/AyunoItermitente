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
        document.getElementById("buttonPerfilIndex").removeAttribute("hidden");
        document.getElementById("buttonRegistrate").setAttribute("hidden", "");
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


    if (validarUser(sInputNombre, sInputApellido, sInputEmail, iInputDia, iInputMes
        , iInputAnio, sInputSexo, iInputEstatura, iInputPesoDeseado, sFotoPerfil, dFechaNac) == true) {
        return;
    }

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
            cerrarRegistro()
            GetListaUser();
        });
    }

    //Resetear valores en form
    //En index no hace falta porque solo se registra un usuario
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

function validarUser(nombre, apellido, email, dia, mes
    , anio, sexo, estatura, peso, foto, fecha) {
    let bandera = false;
    let bandera2 = false;
    let cadena = '';
    let cadena2 = '';
    let hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    let fechaInput = new Date(fecha);
    fechaInput.setHours(0, 0, 0, 0);

    if (nombre == '' || nombre == null || nombre == undefined) {
        resaltarInputIncorrecto("txtNombre");
        cadena += 'El campo Nombre es requerido<br>';
        bandera = true;
    }
    else {
        corregirInputcorrecto("txtNombre");
    }

    if (apellido == '' || apellido == null || apellido == undefined) {
        resaltarInputIncorrecto("txtApellido");
        cadena += 'El campo Apellido es requerido<br>';
        bandera = true;
    }
    else {
        corregirInputcorrecto("txtApellido");
    }

    if (email == '' || email == null || email == undefined) {
        resaltarInputIncorrecto("txtEmail");
        cadena += 'El campo Correo es requerido<br>';
        bandera = true;
    }
    else {
        corregirInputcorrecto("txtEmail");
    }

    if (dia == '' || dia == null || dia == undefined) {
        resaltarInputIncorrecto("numDia");
        cadena += 'El campo Dia es requerido<br>';
        bandera = true;
    }
    else {
        corregirInputcorrecto("numDia");
    }

    if (mes == '' || mes == null || mes == undefined) {
        resaltarInputIncorrecto("numMes");
        cadena += 'El campo Mes es requerido<br>';
        bandera = true;
    }
    else {
        corregirInputcorrecto("numMes");
    }

    if (anio == '' || anio == null || anio == undefined) {
        resaltarInputIncorrecto("numAnio");
        cadena += 'El campo Año es requerido<br>';
        bandera = true;
    }
    else {
        corregirInputcorrecto("numAnio");
    }

    if (sexo == '' || sexo == null || sexo == undefined) {
        resaltarInputIncorrecto("selectorGenero");
        cadena += 'Selección un genero<br>';
        bandera = true;
    }
    else {
        corregirInputcorrecto("selectorGenero");
    }

    if (estatura == '' || estatura == null || estatura == undefined) {
        resaltarInputIncorrecto("txtEstatura");
        cadena += 'El campo Estatura es requerido<br>';
        bandera = true;
    }
    else {
        corregirInputcorrecto("txtEstatura");
    }
    if (estatura<=0 ||estatura>4) {
        resaltarInputIncorrecto("txtEstatura");
        cadena += 'Estatura invalida, ingrese una estatura real<br>';
        bandera = true;
    }
    else {
        corregirInputcorrecto("txtEstatura");
    }

    if (peso == '' || peso == null || peso == undefined) {
        resaltarInputIncorrecto("txtPesoDeseado");
        cadena += 'El campo Peso deseado es requerido<br>';
        bandera = true;
    }
    else {
        corregirInputcorrecto("txtPesoDeseado");
    }
    if (peso<=0 ||peso>1000) {
        resaltarInputIncorrecto("txtPesoDeseado");
        cadena += 'Peso invalido, ingrese un peso real<br>';
        bandera = true;
    }
    else {
        corregirInputcorrecto("txtPesoDeseado");
    }

    if (fechaInput >= hoy) {
        resaltarInputIncorrecto("inputFechaNacimiento");
        cadena += 'La fecha ingresa es invalida, es en el futuro<br>';
        bandera = true;
    }
    else {
        corregirInputcorrecto("inputFechaNacimiento");
    }


    if (bandera == true) {
        imprimirMsjError(cadena);
    } 

    return bandera;
}
