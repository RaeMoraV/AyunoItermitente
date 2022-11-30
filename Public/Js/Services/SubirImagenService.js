'use strict';

/* Editar el uploadPreset---------------------------------------*/
let imagen;

let widget_cloudinary = cloudinary.createUploadWidget({
    cloudName: 'proyectohermes',
    uploadPreset: 'Imagenes_Proyecto1'
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