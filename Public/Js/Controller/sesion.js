'use strict';

IdentificarUsuarioLogueado();

function IdentificarUsuarioLogueado(){
    let result = GetSesionActiva();
    if (result != null) {
        document.getElementById('adminTitulo').innerHTML = 'Bienvenid@ ' + result.Nombre + ' ' + result.Apellido +
        '<br> Usuario: '+ result.User +
        '<br> Apellido: '+ result.Rol;
    }
}

function CerrarSesion(){
    LimpiarSesionActiva();
    location.href='Login.html';
}