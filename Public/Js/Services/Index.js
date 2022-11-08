'use strict';

let users = [
    { Nombre: 'Broco', Apellido: 'Brocoli', Email: 'BrocoBrocolin@gmail.com', Genero: 'Brocolino', Estatura: '0,08', PesoDeseado: '2', Rol: 'Admin' },

    { Nombre: 'Brocolin', Apellido1: 'Brocolon', Email: 'BrocoBrocolon@gmail.com', Genero: 'Brocolino', Estatura: '0,07', PesoDeseado: '1.9', Rol: 'Client' },
];

function AutenticarUsuario() {
    let result = null;

//    for (let i = 0; i < users.length; i++) {
//        if (users[i].Password == pPass && users[i].User == pUser) {
//            result = users[i];
//            break;
//        }
//    }

    if (result != null) {
        SetSesionActiva(result);
    }

    return result;
}