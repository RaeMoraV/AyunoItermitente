'use strict';
/* Perfil - Sección Información */
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



//Formulario Registro
let listaUser = [];
submitRegistrate.addEventListener('click', getUser);


GetListaUser();

async function GetListaUser() {
    let result = await ProcessGet('ListarUsers', null);
    if (result != null && result.resultado == true) {
        listaUser = result.ListaUserDB;
        console.log(listaUser);
        imprimirUser();
    } else {
        ImprimirMsjError(result.msj);
        return;
    }
}


function imprimirUser() {
    let fecha = listaUser[0].FechaNacimiento;
    let edad = Math.floor((new Date() - new Date(fecha)) / (1000 * 60 * 60 * 24 * 365));
    document.getElementById("perfilNombre").innerText = listaUser[0].Nombre;
    document.getElementById("perfilApellidos").innerText = listaUser[0].Apellido;
    document.getElementById("perfilEdad").innerText = edad;
    document.getElementById("perfilSexo").innerText = listaUser[0].Sexo;
    document.getElementById("alturaUsuario").innerText = listaUser[0].Estatura;
    if (listaPeso.length == 0) {
        document.getElementById("perfilIMC").innerText = "No se ha ingresado un peso";
    }
    else {
        document.getElementById("perfilIMC").innerText = listaPeso[0].IMC;
    }
    document.getElementById("perfilCorreo").innerText = listaUser[0].Correo;
    document.getElementById("perfilPeso").innerText = listaUser[0].PesoIdeal;
    document.getElementById("perfilFoto").src = listaUser[0].Foto;

    document.getElementById("txtNombre").value = listaUser[0].Nombre;
    document.getElementById("txtApellido").value = listaUser[0].Apellido;
    document.getElementById("txtEmail").value = listaUser[0].Correo;
    document.getElementById("numDia").selectedIndex = Number(listaUser[0].FechaNacimiento.split('-')[2]);
    document.getElementById("numMes").selectedIndex = Number(listaUser[0].FechaNacimiento.split('-')[1]);
    document.getElementById("numAnio").value = Number(listaUser[0].FechaNacimiento.split('-')[0]);

    let inputSexoperfil = document.querySelectorAll('#selectorGenero input[type=radio]');
    for (let i = 0; i < inputSexoperfil.length; i++) {
        if (listaUser[0].Sexo == inputSexoperfil[i].value) {
            inputSexoperfil[i].checked = true;
        }
    }
    document.getElementById("txtEstatura").value = listaUser[0].Estatura;
    document.getElementById("txtPesoDeseado").value = listaUser[0].PesoIdeal;
    document.getElementById("imgUserIndex").src = listaUser[0].Foto;

    if (listaUser[0].Sexo == "Hombre") {
        document.getElementById("proteCon").innerText = "entre " + 1.7 * listaPeso[0].Peso + "g y " + 2.5 * listaPeso[0].Peso + "g";
    } else if (listaUser[0].Sexo == "Mujer") {
        document.getElementById("proteCon").innerText = "entre " + 1.6 * listaPeso[0].Peso + "g y " + 1.8 * listaPeso[0].Peso + "g";
    } else {
        document.getElementById("proteCon").innerText = "entre " + 1.6 * listaPeso[0].Peso + "g y " + 2.5 * listaPeso[0].Peso + "g";
    }
    document.getElementById("proteSin").innerText = 0.8 * listaPeso[0].Peso + "g";
    document.getElementById("agua").innerText = Math.round(listaPeso[0].Peso / 7) + ' vasos de 250ml';

    /*
- No actividad física - Ambos Sexos: (0.8g de proteína) *(peso usuario en kg)
- Si actividad física - Hombre: (entre 1.7g y 2.5g de proteína) * (peso usuario en kg)
- Si actividad física - Mujer: (entre 1.6g y 1.8g de proteína) * (peso usuario en kg)
La aplicación debe calcular la cantidad de vasos de 250ml requerida por día con base a la siguiente formula:
peso en kilogramos dividido entre siete
    */

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
    let s_id = listaUser[0]._id;
    let result = null;


    if (validarUser(sInputNombre, sInputApellido, sInputEmail, iInputDia, iInputMes
        , iInputAnio, sInputSexo, iInputEstatura, iInputPesoDeseado, sFotoPerfil, dFechaNac) == true) {
        return;
    }

    let data = {
        _id: s_id,
        Nombre: sInputNombre,
        Apellido: sInputApellido,
        FechaNacimiento: sFechaNacimiento,
        Correo: sInputEmail,
        Sexo: sInputSexo,
        Estatura: iInputEstatura,
        Foto: sFotoPerfil,
        PesoIdeal: iInputPesoDeseado
    };

    result = await ProcessPut('ModificarUser', data, null);

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
    if (estatura <= 0 || estatura > 4) {
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
    if (peso <= 0 || peso > 1000) {
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