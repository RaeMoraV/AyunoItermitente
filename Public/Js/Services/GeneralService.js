'use strict';


// SECCIÓN DE PESO
// -------------------------------aca los métodos del protocolo http
async function ProcessGet(pRouterName, pParams) {
    let result = null;
    await axios({
        method: 'get',
        url: apiUrl + pRouterName,
        responseType: 'json',
        params: pParams
    }).then((res) => {
        result = res.data;
    }).catch((err) => {
        console.log(err);
    });
    return result;
}
async function ProcessDelete(pRouterName, pData) {
    let result = await ProcessAction('delete', pRouterName, pData);
    return result;
}
async function ProcessPost(pRouterName, pData, pSubDocuments) {
    let result = await ProcessAction('post', pRouterName, pData);
    if (pRouterName == 'RegistrarPeso') {
        if (result.resultado == false) {
            switch (result.err.code) {
                case 11000:
                    result.msj = 'No se pudo registrar el peso, ya que existe un peso registrado en esta fecha.';
                    console.log('No se pudo registrar por código 11000');
                    break;
                default:
                    break;
            }
        } else if (result.resultado == true) {
            //aca vamos a insertar intereses mediante subdocumentos...
        }
    }
    return result;
};
async function ProcessPut(pRouterName, pData, pSubDocuments) {
    let result = await ProcessAction('put', pRouterName, pData);
    if (pRouterName == 'ModificarPeso') { //Todavía no he creado esta opción
        if (result.resultado == false) {
            switch (result.err.code) {
                case 11000:
                    result.msj = 'No se pudo registrar el peso, ya que existe un peso registrado en esta fecha.';
                    console.log('No se pudo registrar por código 11000');
                    break;
                default:
                    break;
            }
        } else {
            //aca vamos a actualizar los intereses mediante subdocumentos...
        }
    }
    return result;
};

async function ProcessAction(pMethod, pRouterName, pData) {
    let result = null;
    await axios({
        method: pMethod,
        url: apiUrl + pRouterName,
        responseType: 'json',
        data: pData
    }).then((res) => {
        result = res.data;
    }).catch((err) => {
        console.log(err);
    });
    return result;
};


//---------------- metodos para el manejo del localStorage
function SetSesionActiva(pDatosPerfil) {
    localStorage.setItem('datosSesionActiva', JSON.stringify(pDatosPerfil));
}
function GetSesionActiva() {
    let datosSesionActiva = localStorage.getItem('datosSesionActiva');
    if (datosSesionActiva == null || datosSesionActiva == '' || datosSesionActiva == undefined) {
        datosSesionActiva = [];
    } else {
        datosSesionActiva = JSON.parse(datosSesionActiva);
    }
    return datosSesionActiva;
}
function LimpiarSesionActiva() {
    localStorage.removeItem('datosSesionActiva');
}