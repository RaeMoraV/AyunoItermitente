//referencias al DOM
const nombre = document.querySelector("txtNombre");
const apellido = document.querySelector("txtApellido");
const email = document.querySelector("txtEmail");
const genero = document.querySelector("txtGenero");
const estatura = document.querySelector("txtEstatura");
const peso = document.querySelector("txtPesoDeaseado");

const btnGuardar = document.querySelector("txt-guardar");

function validarCamposVacios() {
    let campos_requeridos = document.querySelectorAll("#frm-registro [required]");
    let error = false;
    for (let i = 0; i < campos_requeridos.length; i++) {
        if (campos_requeridos [i].value == '') {
            campos_requeridos [i].classList.add ("error");
            error = true;
        } else {
            campos_requeridos [i].classList.remove("error");
        }
    }
    return error
}

function obtenerDatos () {
    let validacionVacios = validarCamposVacios ();
    let validacionCedula = validarCedula ();
    if (validacionVacios) {
        Swal.fire ({
            icon: "warning",
            title: "Campos en blacno",
            text: "Revise los campos de senalados",
        })
    } else {
        Swal.fire ({
            icon: "success",
            title: "Formulario completo",
            text: "Informacion registrada correctamente",
        })
    }
}

btnRegistrarse.addEventListener ("click", obtenerDatos);
