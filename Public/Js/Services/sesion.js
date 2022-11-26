'use strict';

function SetSesionActiva(pDatosPerfil){
    localStorage.setItem('DatosSesionActiva', JSON.stringify(pDatosPerfil));
}
function GetSesionActiva(){
    let datosSesionActiva = null;

    let localStorageData = localStorage.getItem('DatosSesionActiva');

    if (localStorageData != null && localStorageData != undefined && localStorageData != '') {
        datosSesionActiva = JSON.parse(localStorageData);
    }
    return datosSesionActiva;
}

function LimpiarSesionActiva(){
    localStorage.removeItem('DatosSesionActiva');
}