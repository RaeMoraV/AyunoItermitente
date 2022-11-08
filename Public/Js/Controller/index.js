'use strict';

let inputNombre = document.getElementById('txtNombre');
let inputApellido = document.getElementById('txtApellido');
let inputEmail = document.getElementById('txtEmail');
let inputGenero = document.getElementById('txtGenero');
let inputEstatura = document.getElementById('txtEstatura');
let inputPesoDeaseado = document.getElementById('txtPesoDeseado');

function Registrarse(){
    let Nombre = inputNombre.value;
    let Apellido = inputApellido.value;
    let Email = inputEmail.value;
    let Genero = inputGenero.val;
    let Estatura = inputEstatura.value;
    let PesoDeseado = inputPesoDeseado.value;

    if(ValidarInputs(Nombre, Apellido, Email, Genero, Estatura, PesoDeseado) == false){
        return;
    }

    let result = RegistroUsuario(Nombre, Apellido, Email, Genero, Estatura, PesoDeseado);

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
            text:'PeroDeseado es requerido!'
        });
        bandera = false;
    }
    return bandera;
}
