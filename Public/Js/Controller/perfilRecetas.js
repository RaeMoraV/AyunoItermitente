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

GetListaReceta();


async function GetListaReceta() {
    let result = await ProcessGet('ListarRecetas', null);
    if (result != null && result.resultado == true) {
        listaRecetasAyuno = result.ListaRecetasDB;
        await ImprimirRecetas();
        console.log(listaRecetasAyuno);
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
        divRecetaGrid.classList.add('recetaGrid');

        let divnombreReceta = document.createElement('div');
        divnombreReceta.classList.add('nombreReceta');

        let h1NombreReceta = document.createElement("h1");
        h1NombreReceta.innerText = listaRecetasAyuno[i].Nombre;
        divnombreReceta.appendChild(h1NombreReceta);

        let divimgReceta = document.createElement('div');
        divimgReceta.classList.add('imgReceta');
        let imgReceta = document.createElement("img");
        imgReceta.src=listaRecetasAyuno[i].Imagen;
        divimgReceta.appendChild(imgReceta);

        let divcategoriaReceta = document.createElement('div');
        divcategoriaReceta.className="categoriaReceta";
        let h3categoriaReceta = document.createElement("h3");
        h3categoriaReceta.innerText = "Tiempo de Preparacion:";
        let pcategoriaReceta = document.createElement("p");
        pcategoriaReceta.innerText = listaRecetasAyuno[i].Tiempo + " minutos";
        divcategoriaReceta.appendChild(h3categoriaReceta);
        divcategoriaReceta.appendChild(pcategoriaReceta);

        let divtipoReceta = document.createElement('div');
        divtipoReceta.className="tipoReceta";
        let h3tipoReceta = document.createElement("h3");
        h3tipoReceta.innerText = "Tipo:";
        let ptipoReceta = document.createElement("p");
        ptipoReceta.innerText = listaRecetasAyuno[i].TipoComida;
        divtipoReceta.appendChild(h3tipoReceta);
        divtipoReceta.appendChild(ptipoReceta);

        let divtiempoReceta = document.createElement('div');
        divtiempoReceta.className="tiempoReceta";
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
        divpasosReceta.className="pasosReceta";
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
        divingredientesReceta.className="ingredientesReceta";
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
        divButtonEliminar.className="buttonEliminar";
        let buttonbuttonEliminar = document.createElement("button");
        buttonbuttonEliminar.type="button";
        buttonbuttonEliminar.value = 0; //Luego cambiar por ID

        let iButtonEliminar = document.createElement("i");
        iButtonEliminar.className="fa-solid fa-trash";
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

    let svalorCategoria1 = valorCategoria1.value;
    let svalorCategoria2 = valorCategoria2.value;
    let svalorCategoria3 = valorCategoria3.value;
    let svalorCategoria4 = valorCategoria4.value;
    let svalorCategoria5 = valorCategoria5.value;
    let svalorCategoria6 = valorCategoria6.value;
    let svalorCategoria7 = valorCategoria7.value;

    let categoriaTotal = acomodarArregloReceta(svalorCategoria1, svalorCategoria2, svalorCategoria3,
        svalorCategoria4, svalorCategoria5, svalorCategoria6, svalorCategoria7);

    let svalorImgReceta = valorImgReceta.src;

    let result = null;

    /*if (validarAyuno(DateInicio, DateFinal) == true) {
        return;
    }
}

    */

    //Acomodo para enviar el json con la información a la DB

    let data = {
        Nombre: sValorNombreReceta,
        Imagen: svalorImgReceta,
        TipoComida: svalorTipo,
        Categoria: categoriaTotal,
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
    /*
    valorHoraInicioAyuno.value = "";
    valorInicioFechaAyuno.value = "";
    valorHoraFinAyuno.value = "";
    valorFinFechaAyuno.value = "";
    document.getElementById("radio1410").checked = false;
    document.getElementById("radio168").checked = false;
    document.getElementById("radio186").checked = false;
    document.getElementById("radio204").checked = false;
    */
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
