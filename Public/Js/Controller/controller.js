document.getElementById('menuButton').addEventListener('click', mostrar_menu);

let nav = document.getElementById('menu');
let backMenu = document.getElementById('backMenu');

function mostrar_menu() {
    nav.style.right = '0px'
    backMenu.style.display = 'block'
}