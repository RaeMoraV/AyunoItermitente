'use strict';
$(document).ready(function(){

	$('.ir-arriba').click(function(){
		$('body, html').animate({
			scrollTop: '0px'
		}, 300);
	});

	$(window).scroll(function(){
		if( $(this).scrollTop() > 0 ){
			$('.ir-arriba').slideDown(300);
		} else {
			$('.ir-arriba').slideUp(300);
		}
	});

});
let inputNombre = document.getElementById('txtNombre');
let inputApellido = document.getElementById('txtApellido');
let inputEmail = document.getElementById('txtEmail');
let inputGenero = document.getElementById('txtGenero');
let inputEstatura = document.getElementById('txtEstatura');
let inputPesoDeseado = document.getElementById('txtPesoDeseado');
let formularioFecha = document.getElementById('numAnio');

const anioInicio = 1900;

const fondoNegro = document.querySelector('.fondoNegro');


window.onscroll = function(){
    console.log(document.documentElement.scrollTop);
    if(document.documentElement.scrollTop > 100) {
      document.querySelector('.go-top-container').classList.add('show');
       
    }
    else{
      document.querySelector('.go-top-container').classList.remove('show');
    }
  }
   
  document.querySelector('.go-top-container').addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  


//Formulario
const btnRegistrateYa = document.querySelector('#btnRegistrateYa');
const fotoPerfil = document.querySelector('#fotoPerfil');
let fotoSubida = "";

btnRegistrateYa.addEventListener('click', function(){
    document.querySelector('#formularioInscripcion').style.display = 'flex';
    document.querySelector('.fondoNegro').style.display = 'block';
    document.querySelector('body').style.overflowY = 'hidden';
});

fondoNegro.addEventListener('click', function(){
    document.querySelector('#formularioInscripcion').style.display = 'none';
    document.querySelector('.fondoNegro').style.display = 'none';
    document.querySelector('body').style.overflowY = 'initial';
});

btnRegistrateYa.addEventListener('click', function(){
    document.querySelector('#formularioInscripcion').style.display = 'flex';
    document.querySelector('.fondoNegro').style.display = 'block';
});

fotoPerfil.addEventListener ('change', function(){
     const reader = new FileReader();
     reader.addEventListener('load', () => {
        fotoSubida = reader.result;
        document.querySelector("#showPhoto").style.backgroundImage = `url(${fotoSubida})`;
     });
     reader.readAsDataURL(this.files[0]);
})

llenarSelectAnio();

function Registrarse(){
    let nombre = inputNombre.value;
    let apellido = inputApellido.value;
    let email = inputEmail.value;
    let genero = inputGenero.val;
    let estatura = inputEstatura.value;
    let pesoDeseado = inputPesoDeseado.value;

    if(ValidarInputs(nombre, apellido, email, genero, estatura, pesoDeseado) == false){
        return;
    }

    let result = RegistroUsuario(nombre, apellido, email, genero, estatura, pesoDeseado);

    if (result != null) {
        RedireccionarUsuario(result);
    }else{
        Swal.fire({
            icon:'error',
            title:'Error',
            text:'Usuario y Contraseña incorrectos!'
        });
    }
}

function llenarSelectAnio() { 
    let anioActual = Number(new Date('1,1,2030').getFullYear());
    for (let index = anioActual; index > anioInicio - 1; index--) {
        let select = formularioFecha.innerHTML;
        let newYear = '<option value="' + index + '">' + index + '</option>';
        document.getElementById('numAnio').innerHTML = select + newYear;
    }
}

function ValidarInputs(pNombre, pApellido, pEmail, pGenero, pEstatura, pPesoDeseado){
    let bandera = true;
    if (pNombre == null || pNombre == undefined || pNombre == '') {        
        Swal.fire({
            icon:'error',
            title:'Error',
            text:'Nombre es requerido!'
        });
        bandera = false;
    }
    if (pApellido == null || pApellido == undefined || pApellido == '') {        
        Swal.fire({
            icon:'error',
            title:'Error',
            text:'Apellido es requerido!'
        });
        bandera = false;
    }
    if (pEmail == null || pEmail == undefined || pEmail == '') {        
        Swal.fire({
            icon:'error',
            title:'Error',
            text:'Email es requerido!'
        });
        bandera = false;
    }
    if (pGenero == null || pGenero == undefined || pGenero == '') {        
        Swal.fire({
            icon:'error',
            title:'Error',
            text:'Genero es requerido!'
        });
        bandera = false;
    }
    if (pEstatura == null || pEstatura == undefined || pEstatura == '') {        
        Swal.fire({
            icon:'error',
            title:'Error',
            text:'Estatura es requerida!'
        });
        bandera = false;
    }
    if (pPesoDeseado == null || pPesoDeseado == undefined || pPesoDeseado == '') {        
        Swal.fire({
            icon:'error',
            title:'Error',
            text:'PesoDeseado es requerido!'
        });
        bandera = false;
    }
    return bandera;
}
