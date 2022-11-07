/* NAV Mobile Menu */
let nav = document.getElementById('menu');
let backMenu = document.getElementById('backMenu');

document.getElementById('menuButton').addEventListener('click', mostrarMenu);
document.getElementById('backMenu').addEventListener('click', ocultarMenu);

function mostrarMenu() {
    nav.style.right = '0px';
    backMenu.style.display = 'block';
};

function ocultarMenu() {
    nav.style.right = '-250px';
    backMenu.style.display = 'none';
}




