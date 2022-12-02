'use strict';
'use strict';

const apiUrl = 'http://localhost:3000/api/';

function ImprimirMsjError(pMsj){
    Swal.fire({
        title: 'Error!',
        text: pMsj,
        icon: 'error',
        confirmButtonText: 'Ok'
    });
}
function ImprimirMsjSuccess(pMsj){
    Swal.fire({
        title: 'Excelente!',
        text: pMsj,
        icon: 'success',
        confirmButtonText: 'Ok'
    });
}