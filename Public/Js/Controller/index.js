'use strict';

let inputNombre = document.getElementById('txtNombre');
let inputApellido = document.getElementById('txtApellido');
let inputEmail = document.getElementById('txtEmail');
let inputGenero = document.getElementById('txtGenero');
let inputEstatura = document.getElementById('txtEstatura');
let inputPesoDeseado = document.getElementById('txtPesoDeseado');

function Registrarse(){
    let nombre = inputNombre.value;
    let apellido = inputApellido.value;
    let email = inputEmail.value;
    let genero = inputGenero.val;
    let estatura = inputEstatura.value;
    let pesoDeseado = inputPesoDeseado.value;

    if(ValidarInputs(nombre, apellido, email, genero, estatura, pesoDeseado) == false){
        return;
    }

    let result = RegistroUsuario(nombre, apellido, email, genero, estatura, pesoDeseado);

    if (result != null) {
        RedireccionarUsuario(result);
    }else{
        Swal.fire({
            icon:'error',
            title:'Error',
            text:'Usuario y Contraseña incorrectos!'
        });
    }
}

function ValidarInputs(pNombre, pApellido, pEmail, pGenero, pEstatura, pPesoDeseado){
    let bandera = true;
    if (pNombre == null || pNombre == undefined || pNombre == '') {        
        Swal.fire({
            icon:'error',
            title:'Error',
            text:'Nombre es requerido!'
        });
        bandera = false;
    }
    if (pApellido == null || pApellido == undefined || pApellido == '') {        
        Swal.fire({
            icon:'error',
            title:'Error',
            text:'Apellido es requerido!'
        });
        bandera = false;
    }
    if (pEmail == null || pEmail == undefined || pEmail == '') {        
        Swal.fire({
            icon:'error',
            title:'Error',
            text:'Email es requerido!'
        });
        bandera = false;
    }
    if (pGenero == null || pGenero == undefined || pGenero == '') {        
        Swal.fire({
            icon:'error',
            title:'Error',
            text:'Genero es requerido!'
        });
        bandera = false;
    }
    if (pEstatura == null || pEstatura == undefined || pEstatura == '') {        
        Swal.fire({
            icon:'error',
            title:'Error',
            text:'Estatura es requerida!'
        });
        bandera = false;
    }
    if (pPesoDeseado == null || pPesoDeseado == undefined || pPesoDeseado == '') {        
        Swal.fire({
            icon:'error',
            title:'Error',
            text:'PesoDeseado es requerido!'
        });
        bandera = false;
    }
    return bandera;
}
