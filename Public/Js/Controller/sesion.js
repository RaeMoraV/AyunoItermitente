'use strict';

IdentificarUsuarioLogueado();

function IdentificarUsuarioLogueado(){
    let result = GetSesionActiva();
    if (result != null) {
        document.getElementById('adminTitulo').innerHTML = 'Bienvenid@ ' + result.Nombre + ' ' + result.Apellido1 +
        '<br> su usuario es: '+ result.User +
        '<br> su rol es: '+ result.Rol;
    }
}

function CerrarSesion(){
    LimpiarSesionActiva();
    location.href='Login.html';
}