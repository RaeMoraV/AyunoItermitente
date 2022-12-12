'use strict';

/* Perfil - Seccion Recetas - Tabla */

let valorNombreReceta = document.getElementById("inputNombreReceta");

let valorIngrediente1 = document.getElementById("inputIngrediente1");
let valorIngrediente2 = document.getElementById("inputIngrediente2");
let valorIngrediente3 = document.getElementById("inputIngrediente3");
let valorIngrediente4 = document.getElementById("inputIngrediente4");
let valorIngrediente5 = document.getElementById("inputIngrediente5");
let valorIngrediente6 = document.getElementById("inputIngrediente6");

let valorPaso1 = document.getElementById("inputPaso1");
let valorPaso2 = document.getElementById("inputPaso2");
let valorPaso3 = document.getElementById("inputPaso3");
let valorPaso4 = document.getElementById("inputPaso4");
let valorPaso5 = document.getElementById("inputPaso5");
let valorPaso6 = document.getElementById("inputPaso6");

let valorTiempoPrep = document.getElementById("inputTiempoReceta");

let valorTipo = document.getElementById("inputTipoReceta");

let valorCategoria1 = document.getElementById("recetaCategoria1");
let valorCategoria2 = document.getElementById("recetaCategoria2");
let valorCategoria3 = document.getElementById("recetaCategoria3");
let valorCategoria4 = document.getElementById("recetaCategoria4");
let valorCategoria5 = document.getElementById("recetaCategoria5");
let valorCategoria6 = document.getElementById("recetaCategoria6");
let valorCategoria7 = document.getElementById("recetaCategoria7");

let valorImgReceta = document.getElementById("imgInputReceta");
let btnRegistrarReceta = document.getElementById("buttonRegistroReceta");

let listaRecetasAyuno = [];

btnRegistrarReceta.addEventListener("click", getReceta);

async function GetListaReceta() {
    let result = await ProcessGet('ListarRecetas', null);
    if (result != null && result.resultado == true) {
        listaRecetasAyuno = result.ListaRecetasDB;
        await ImprimirRecetas();
        cerrarFormularioRecetaFunc()
    } else {
        ImprimirMsjError(result.msj);
        return;
    }
}

async function ImprimirRecetas() {
    let tbody = document.querySelector('#imprimirRecetas');
    tbody.innerHTML = '';
    for (let i = 0; i < listaRecetasAyuno.length; i++) {

        let divRecetaGrid = document.createElement('div');
        divRecetaGrid.classList.add('recetaLayout');

        let divnombreReceta = document.createElement('div');
        divnombreReceta.classList.add('nombreReceta');

        let h1NombreReceta = document.createElement("h1");
        h1NombreReceta.innerText = listaRecetasAyuno[i].Nombre;
        divnombreReceta.appendChild(h1NombreReceta);

        let divimgReceta = document.createElement('div');
        divimgReceta.classList.add('imgReceta');
        let imgReceta = document.createElement("img");
        imgReceta.src = listaRecetasAyuno[i].Imagen;
        divimgReceta.appendChild(imgReceta);

        let divcategoriaReceta = document.createElement('div');
        divcategoriaReceta.className = "categoriaReceta";
        let h3categoriaReceta = document.createElement("h3");
        h3categoriaReceta.innerText = "Tiempo de Preparacion:";
        let pcategoriaReceta = document.createElement("p");
        pcategoriaReceta.innerText = listaRecetasAyuno[i].Tiempo + " minutos";
        divcategoriaReceta.appendChild(h3categoriaReceta);
        divcategoriaReceta.appendChild(pcategoriaReceta);

        let divtipoReceta = document.createElement('div');
        divtipoReceta.className = "tipoReceta";
        let h3tipoReceta = document.createElement("h3");
        h3tipoReceta.innerText = "Tipo:";
        let ptipoReceta = document.createElement("p");
        ptipoReceta.innerText = listaRecetasAyuno[i].TipoComida;
        divtipoReceta.appendChild(h3tipoReceta);
        divtipoReceta.appendChild(ptipoReceta);

        let divtiempoReceta = document.createElement('div');
        divtiempoReceta.className = "tiempoReceta";
        let h3tiempoReceta = document.createElement("h3");
        h3tiempoReceta.innerText = "Categoria:";
        divtiempoReceta.appendChild(h3tiempoReceta);
        let cantidadCategorias = listaRecetasAyuno[i].Categoria.split(";");
        for (let i = 0; i < cantidadCategorias.length; i++) {
            let ptiempoReceta = document.createElement("p");
            ptiempoReceta.innerText = cantidadCategorias[i];
            divtiempoReceta.appendChild(ptiempoReceta);
        }

        let divpasosReceta = document.createElement('div');
        divpasosReceta.className = "pasosReceta";
        let h2pasosReceta = document.createElement("h2");
        h2pasosReceta.innerText = "Preparacion:";
        divpasosReceta.appendChild(h2pasosReceta);
        let cantidadPasos = listaRecetasAyuno[i].Pasos.split(";");
        for (let i = 0; i < cantidadPasos.length; i++) {
            let ppasosReceta = document.createElement("p");
            ppasosReceta.innerText = "Paso " + (Number(i) + 1) + ". " + cantidadPasos[i];
            divpasosReceta.appendChild(ppasosReceta);
        }

        let divingredientesReceta = document.createElement('div');
        divingredientesReceta.className = "ingredientesReceta";
        let h2ingredientesReceta = document.createElement("h2");
        h2ingredientesReceta.innerText = "Ingredientes:";
        divingredientesReceta.appendChild(h2ingredientesReceta);
        let cantidadIngredientes = listaRecetasAyuno[i].Ingredientes.split(";");
        for (let i = 0; i < cantidadIngredientes.length; i++) {
            let pingredientesReceta = document.createElement("p");
            pingredientesReceta.innerText = cantidadIngredientes[i];
            divingredientesReceta.appendChild(pingredientesReceta);
        }

        let divButtonEliminar = document.createElement('div');
        divButtonEliminar.className = "buttonEliminar";
        let buttonbuttonEliminar = document.createElement("button");
        buttonbuttonEliminar.type = "button";

        buttonbuttonEliminar.onclick = async function () {
            let confirmacion = false;
            await Swal.fire({
                title: 'Eliminación de receta',
                text: 'Desea eliminar la receta de ' + listaRecetasAyuno[i].Nombre + '?',
                icon: 'warning',
                showDenyButton: true,
                denyButtonText: 'Cancelar',
                confirmButtonText: 'Confirmar'
            }).then((res) => {
                confirmacion = res.isConfirmed;
            });

            if (confirmacion == true) {
                let data = {
                    '_id': listaRecetasAyuno[i]._id
                };
                let result = await ProcessDelete('EliminarReceta', data);
                if (result.resultado == true) {
                    ImprimirMsjSuccess(result.msj);
                } else {
                    ImprimirMsjError(result.msj);
                }
                await GetListaReceta();
            }
        };

        let iButtonEliminar = document.createElement("i");
        iButtonEliminar.className = "fa-solid fa-trash";
        buttonbuttonEliminar.appendChild(iButtonEliminar);
        divButtonEliminar.appendChild(buttonbuttonEliminar);

        divRecetaGrid.appendChild(divnombreReceta);
        divRecetaGrid.appendChild(divimgReceta);
        divRecetaGrid.appendChild(divcategoriaReceta);
        divRecetaGrid.appendChild(divtipoReceta);
        divRecetaGrid.appendChild(divtiempoReceta);
        divRecetaGrid.appendChild(divpasosReceta);
        divRecetaGrid.appendChild(divingredientesReceta);
        divRecetaGrid.appendChild(divButtonEliminar);
        tbody.appendChild(divRecetaGrid);
    }
}

async function getReceta() {

    let sValorNombreReceta = valorNombreReceta.value;
    let svalorIngrediente1 = valorIngrediente1.value;
    let svalorIngrediente2 = valorIngrediente2.value;
    let svalorIngrediente3 = valorIngrediente3.value;
    let svalorIngrediente4 = valorIngrediente4.value;
    let svalorIngrediente5 = valorIngrediente5.value;
    let svalorIngrediente6 = valorIngrediente6.value;

    let ingredientesTotal = acomodarArregloReceta(svalorIngrediente1, svalorIngrediente2,
        svalorIngrediente3, svalorIngrediente4, svalorIngrediente5, svalorIngrediente6, "");

    let svalorPaso1 = valorPaso1.value;
    let svalorPaso2 = valorPaso2.value;
    let svalorPaso3 = valorPaso3.value;
    let svalorPaso4 = valorPaso4.value;
    let svalorPaso5 = valorPaso5.value;
    let svalorPaso6 = valorPaso6.value;

    let pasosTotal = acomodarArregloReceta(svalorPaso1, svalorPaso2,
        svalorPaso3, svalorPaso4, svalorPaso5, svalorPaso6, "");

    let svalorTiempoPrep = valorTiempoPrep.value;

    let svalorTipo = valorTipo.value;

    let sCategoriaTotal = leerCheckBoxCategorias();


    let svalorImgReceta = valorImgReceta.src;

    let result = null;

    if (validarReceta(sValorNombreReceta, ingredientesTotal, pasosTotal, svalorTiempoPrep, svalorTipo, sCategoriaTotal, svalorImgReceta) == true) {
        return;
    }

    //Acomodo para enviar el json con la información a la DB

    let data = {
        Nombre: sValorNombreReceta,
        Imagen: svalorImgReceta,
        TipoComida: svalorTipo,
        Categoria: sCategoriaTotal,
        Ingredientes: ingredientesTotal,
        Tiempo: svalorTiempoPrep,
        Pasos: pasosTotal
    };

    result = await ProcessPost('RegistrarReceta', data, null);

    if (result == null || result == undefined) {
        ImprimirMsjError('Ocurrió un error, intente de nuevo');
    } else if (result.resultado == false) {
        ImprimirMsjError(result.msj);
        console.log(result);
    } else {
        swal.fire({
            title: 'Excelente!',
            text: result.msj,
            icon: 'success',
            confirmButtonText: 'Ok'
        }).then(res => {
            GetListaReceta();
        });
    }

    //Resetear valores en form

    document.getElementById("inputNombreReceta").value = "";
    document.getElementById("imgInputReceta").value = "";
    document.getElementById("inputTipoReceta").value = "";
    document.getElementById("inputPaso6").value = "";
    document.getElementById("inputPaso5").value = "";
    document.getElementById("inputPaso4").value = "";
    document.getElementById("inputPaso3").value = "";
    document.getElementById("inputPaso2").value = "";
    document.getElementById("inputPaso1").value = "";
    document.getElementById("inputIngrediente6").value = "";
    document.getElementById("inputIngrediente5").value = "";
    document.getElementById("inputIngrediente4").value = "";
    document.getElementById("inputIngrediente3").value = "";
    document.getElementById("inputIngrediente2").value = "";
    document.getElementById("inputIngrediente1").value = "";
    document.getElementById("inputNombreReceta").value = "";
    document.getElementById("inputTiempoReceta").value = "";
    document.getElementById("recetaCategoria1").checked = false;
    document.getElementById("recetaCategoria2").checked = false;
    document.getElementById("recetaCategoria3").checked = false;
    document.getElementById("recetaCategoria4").checked = false;
    document.getElementById("recetaCategoria5").checked = false;
    document.getElementById("recetaCategoria6").checked = false;
    document.getElementById("recetaCategoria7").checked = false;
    
}

function acomodarArregloReceta(p1, p2, p3, p4, p5, p6, p7) {
    let cadena = p1;
    if (p2 != "") {
        cadena += ";" + p2;
    }
    if (p3 != "") {
        cadena += ";" + p3;
    }
    if (p4 != "") {
        cadena += ";" + p4;
    }
    if (p5 != "") {
        cadena += ";" + p5;
    }
    if (p6 != "") {
        cadena += ";" + p6;
    }
    if (p7 != "") {
        cadena += ";" + p7;
    }
    return cadena;
}

function leerCheckBoxCategorias() {
    let cadena = "";
    if (valorCategoria1.checked) {
        cadena += valorCategoria1.value + ";";
    }
    if (valorCategoria2.checked) {
        cadena += valorCategoria2.value + ";";
    }
    if (valorCategoria3.checked) {
        cadena += valorCategoria3.value + ";";
    }
    if (valorCategoria4.checked) {
        cadena += valorCategoria4.value + ";";
    }
    if (valorCategoria5.checked) {
        cadena += valorCategoria5.value + ";";
    }
    if (valorCategoria6.checked) {
        cadena += valorCategoria6.value + ";";
    }
    if (valorCategoria7.checked) {
        cadena += valorCategoria7.value;
    }
    if (cadena[cadena.length - 1] == ";") {
        cadena.slice(0, -1);
    }
    return cadena;
}

function validarReceta(nombre, ingredientes, pasos, tiempo, tipo, categoria, img) {
    if (nombre == '' || nombre == null || nombre == undefined) {
        document.getElementById("inputNombreReceta").focus();
        Swal.fire({ icon: 'error', title: 'Información faltante', text: 'Ingrese el nombre de la receta' });
        return true;
    } else if (ingredientes == '' || ingredientes == null || ingredientes == undefined) {
        document.getElementById("inputIngrediente1").focus();
        Swal.fire({ icon: 'error', title: 'Información faltante', text: 'La receta debe incluir al menos un ingrediente' });
        return true;
    } else if (pasos == '' || pasos == null || pasos == undefined) {
        document.getElementById("inputPaso1").focus();
        Swal.fire({ icon: 'error', title: 'Información faltante', text: 'La receta debe incluir al menos un paso o instrucción' });
        return true;
    }
    else if (tiempo == '' || tiempo == null || tiempo == undefined) {
        document.getElementById("inputTiempoReceta").focus();
        Swal.fire({ icon: 'error', title: 'Información faltante', text: 'Ingrese el tiempo estimado de preparación' });
        return true;
    }
    else if (tipo == '' || tipo == null || tipo == undefined) {
        document.getElementById("inputTipoReceta").focus();
        Swal.fire({ icon: 'error', title: 'Información faltante', text: 'Seleccione el tipo de comida' });
        return true;
    }
    else if (categoria == '' || categoria == null || categoria == undefined) {
        document.getElementById("recetaCategoria1").focus();
        Swal.fire({ icon: 'error', title: 'Información faltante', text: 'Seleccione al menos una categoria para la receta' });
        return true;
    }
    else if (img == '' || img == null || img == undefined) {
        document.getElementById("showReceta").focus();
        Swal.fire({ icon: 'error', title: 'Imagen faltante', text: 'Suba una imagen para la receta' });
        return true;
    }
    else if (tiempo <= 0 || tiempo > 10000) {
        document.getElementById("inputTiempoReceta").focus();
        Swal.fire({ icon: 'error', title: 'Valor invalido', text: 'Ingrese un tiempo real para la preparacion de la receta' });
        return true;
    }

}

// ABRIR Y CERRAR FORMULARIOS
const abrirFormularioReceta = document.querySelector('#btnRegistroAbrirReceta');
const fondoNegroReceta = document.querySelector('.fondoNegro');
const xCerrarFormularioReceta = document.querySelector('#xFormularioRecetas');

abrirFormularioReceta.addEventListener('click', abrirFormularioRecetaFunc);
fondoNegroReceta.addEventListener('click', cerrarFormularioRecetaFunc);
xCerrarFormularioReceta.addEventListener('click', cerrarFormularioRecetaFunc);

function abrirFormularioRecetaFunc() {
    document.querySelector('#ingresoDatosRecetas').style.display = 'block';
    document.querySelector('.fondoNegro').style.display = 'block';
    document.querySelector('body').style.overflowY = 'hidden';

}

function cerrarFormularioRecetaFunc() {
    document.querySelector('#ingresoDatosRecetas').style.display = 'none';
    document.querySelector('.fondoNegro').style.display = 'none';
    document.querySelector('body').style.overflowY = 'initial';
}
