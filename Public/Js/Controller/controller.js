document.getElementById('menuButton').addEventListener('click', mostrarMenu);

let nav = document.getElementById('menu');
let backMenu = document.getElementById('backMenu');

function mostrarMenu() {
    nav.style.right = '0px';
    backMenu.style.display = 'block';
};

function ocultarMenu() {
    nav.style.right = '-250px';
    backMenu.style.display = 'none';
}