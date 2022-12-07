'use strict';
'use strict';

const apiUrl = 'http://localhost:3000/api/';

function ImprimirMsjError(pMsj) {
    Swal.fire({
        title: 'Error!',
        text: pMsj,
        icon: 'error',
        confirmButtonText: 'Ok'
    });
}
function ImprimirMsjSuccess(pMsj) {
    Swal.fire({
        title: 'Excelente!',
        text: pMsj,
        icon: 'success',
        confirmButtonText: 'Ok'
    });
}

function traductorLogro(pLogro) {
    if (pLogro == "peso") {
        return "Reducción de peso";
    }
    else if (pLogro == "imc") {
        return "Reducción o aumento del IMC";
    }
    else if (pLogro == "cantidadHoras") {
        return "Cantidad de hora de ayuno";
    }
    else if (pLogro == "diasAyuno") {
        return "Días de ayuno finalizados";
    }
}
function traductorIconoMedalla(pMedalla) {
    switch (pMedalla) {
        case 1:
            return "fa-solid fa-weight-scale";
            break;
        case 2:
            return "fa-solid fa-heart";
            break;
        case 3:
            return "fa-solid fa-utensils";
            break;
        case 4:
            return "fa-solid fa-feather-pointed";
            break;
        case 5:
            return "fa-solid fa-medal";
            break;
        case 6:
            return "fa-solid fa-apple-whole";
            break;
        case 7:
            return "fa-solid fa-dumbbell";
            break;
        case 8:
            return "fa-solid fa-heart-pulse";
            break;


    }
}

