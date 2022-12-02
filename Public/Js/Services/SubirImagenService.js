'use strict';

/* Editar el uploadPreset---------------------------------------*/
let imagen;

let widget_cloudinary = cloudinary.createUploadWidget({
    cloudName: 'proyectohermes',
    uploadPreset: 'Prueba_Imagenes'
}, (err, result) => {
    if (!err && result && result.event === 'success') {
        console.log('Imagen subida con exito ', result.info);
        imagen.src = result.info.secure_url;
    }
});

function AbrirCloudinary(pIdInputImagen) {
    imagen = document.getElementById(pIdInputImagen);
    widget_cloudinary.open();
}