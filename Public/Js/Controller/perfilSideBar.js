'use strict';
/* SideMenu */

blockDisplay(null);

let btnSMInfo = document.getElementById('sideMenuInformacion');
let btnSMPeso = document.getElementById('sideMenuPeso');
let btnSMEnf = document.getElementById('sideMenuEnfermedades');
let btnSMAct = document.getElementById('sideMenuActividad');
let btnSMLog = document.getElementById('sideMenuLogros');
let btnSMPlan = document.getElementById('sideMenuPlan');
let btnSMRec = document.getElementById('sideMenuRecetas');

const toggle = document.querySelector(".toggle")
const menuDashboard = document.querySelector(".menu-dashboard")
const iconoMenu = toggle.querySelector("i")
const enlacesMenu = document.querySelectorAll(".enlace")

btnSMInfo.addEventListener('click', openInfo);
btnSMPeso.addEventListener('click', openPeso);
btnSMEnf.addEventListener('click', openEnfermedades);
btnSMAct.addEventListener('click', openActividades);
btnSMLog.addEventListener('click', openLogros);
btnSMPlan.addEventListener('click', openPlan);
btnSMRec.addEventListener('click', openRecetas);
toggle.addEventListener("click", abrirSidebar);

cargarTodo();
function cargarTodo() {
    GetListaUser();
    GetListaPeso();
    GetListaActividad();
    GetListaAyuno();
    GetListaLogros();
    GetListaReceta();
    GetListaEnfermedades();
    

}
function openInfo() {
    let option = 1;
    GetListaUser();
    blockDisplay(option);
}

function openPeso() {
    let option = 2;
    GetListaPeso();
    blockDisplay(option);
}

function openEnfermedades() {
    GetListaEnfermedades();
    let option = 3;
    blockDisplay(option);
}

function openActividades() {
    GetListaActividad();
    let option = 4;
    blockDisplay(option);
}

function openLogros() {
    let option = 5;
    actualizarMetas();
    GetListaLogros();
    blockDisplay(option);
}

function openPlan() {
    let option = 6;
    GetListaAyuno();
    blockDisplay(option);
}

function openRecetas() {
    let option = 7;
    GetListaReceta();
    blockDisplay(option);
}


function blockDisplay(pOpcionSM) {
    switch (pOpcionSM) {
        case 1:
            document.getElementById('informacion').style.display = 'block';
            document.getElementById('peso').style.display = 'none';
            document.getElementById('enfermedades').style.display = 'none';
            document.getElementById('actividadFisica').style.display = 'none';
            document.getElementById('logroObjetivos').style.display = 'none';
            document.getElementById('planAyuno').style.display = 'none';
            document.getElementById('recetas').style.display = 'none';
            break;
        case 2:
            document.getElementById('informacion').style.display = 'none';
            document.getElementById('peso').style.display = 'block';
            document.getElementById('enfermedades').style.display = 'none';
            document.getElementById('actividadFisica').style.display = 'none';
            document.getElementById('logroObjetivos').style.display = 'none';
            document.getElementById('planAyuno').style.display = 'none';
            document.getElementById('recetas').style.display = 'none';
            break;
        case 3:
            document.getElementById('informacion').style.display = 'none';
            document.getElementById('peso').style.display = 'none';
            document.getElementById('enfermedades').style.display = 'block';
            document.getElementById('actividadFisica').style.display = 'none';
            document.getElementById('logroObjetivos').style.display = 'none';
            document.getElementById('planAyuno').style.display = 'none';
            document.getElementById('recetas').style.display = 'none';
            break;
        case 4:
            document.getElementById('informacion').style.display = 'none';
            document.getElementById('peso').style.display = 'none';
            document.getElementById('enfermedades').style.display = 'none';
            document.getElementById('actividadFisica').style.display = 'block';
            document.getElementById('logroObjetivos').style.display = 'none';
            document.getElementById('planAyuno').style.display = 'none';
            document.getElementById('recetas').style.display = 'none';
            break;
        case 5:
            document.getElementById('informacion').style.display = 'none';
            document.getElementById('peso').style.display = 'none';
            document.getElementById('enfermedades').style.display = 'none';
            document.getElementById('actividadFisica').style.display = 'none';
            document.getElementById('logroObjetivos').style.display = 'block';
            document.getElementById('planAyuno').style.display = 'none';
            document.getElementById('recetas').style.display = 'none';
            break;
        case 6:
            document.getElementById('informacion').style.display = 'none';
            document.getElementById('peso').style.display = 'none';
            document.getElementById('enfermedades').style.display = 'none';
            document.getElementById('actividadFisica').style.display = 'none';
            document.getElementById('logroObjetivos').style.display = 'none';
            document.getElementById('planAyuno').style.display = 'block';
            document.getElementById('recetas').style.display = 'none';
            break;
        case 7:
            document.getElementById('informacion').style.display = 'none';
            document.getElementById('peso').style.display = 'none';
            document.getElementById('enfermedades').style.display = 'none';
            document.getElementById('actividadFisica').style.display = 'none';
            document.getElementById('logroObjetivos').style.display = 'none';
            document.getElementById('planAyuno').style.display = 'none';
            document.getElementById('recetas').style.display = 'block';
            break;
        default:
            document.getElementById('informacion').style.display = 'none';
            document.getElementById('peso').style.display = 'none';
            document.getElementById('enfermedades').style.display = 'none';
            document.getElementById('actividadFisica').style.display = 'block';
            document.getElementById('logroObjetivos').style.display = 'none';
            document.getElementById('planAyuno').style.display = 'none';
            document.getElementById('recetas').style.display = 'none';
            break;
    }
}

function abrirSidebar() {
    menuDashboard.classList.toggle("open")

    if (iconoMenu.classList.contains("fa-caret-right")) {
        iconoMenu.classList.replace("fa-caret-right", "fa-xmark")
    } else {
        iconoMenu.classList.replace("fa-xmark", "fa-caret-right")
    }
}



enlacesMenu.forEach(enlace => {
    enlace.addEventListener("click", () => {
        menuDashboard.classList.add("open")
        iconoMenu.classList.replace("fa-caret-right", "fa-xmark")
    })
})