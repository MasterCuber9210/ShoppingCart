// Inicializacion de variables HTML

const carrito           = document.querySelector('#carrito');
const listaCursos       = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn  = document.querySelector('#vaciar-carrito');
let articulosCarrito    = [];

// Definicion de los Event listeners 
cargarEventListeners();
function cargarEventListeners() {
    // Muesta los cursos desde el local storage
    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carritoHTML();
    })
    
    // Evento al dar click en agregar al carrito sobre un curso
    listaCursos.addEventListener('click', agregarCurso);

    // Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    // Vaciar el carrito de compras
    vaciarCarritoBtn.addEventListener('click', () =>{
        articulosCarrito = [];
        limpiarHTML();
    });
}

// Funciones

function agregarCurso(e) {

    e.preventDefault();
    
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;

        leerDatosCurso(cursoSeleccionado);
    }

}

// Elimina un curso del carrito

function eliminarCurso(e) {
    if (e.target.classList.contains('borrar-curso')) {
        const cursoID = e.target.getAttribute('data-id');

        // eliminar el curso seleccionado
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoID);
        console.log('articulosCarrito:', articulosCarrito)

        // limpiar el carrito
        carritoHTML();
    }
}

// Extraer la informacion del curso que se agrega al carrito

function leerDatosCurso(curso) {
    // Crear objeto del curso seleccionado
    const infoCurso = {
        imagen  : curso.querySelector('img').src,
        titulo  : curso.querySelector('h4').textContent,
        precio  : curso.querySelector('.precio span').textContent,
        id      : curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
    }

    // Revisa si un curso ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    
    if (existe) {
        // actualiza la cantidad
        const cursos = articulosCarrito.map( curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }
        })
        articulosCarrito = [...cursos];
    } else {
        // agregar el curso al arreglo de articulosCarrito
        articulosCarrito.push(infoCurso);
    }
    
    carritoHTML();
}

// Mostrar el carrito de compras en el HTML

function carritoHTML() {

    // Limpiar el HTML
    limpiarHTML();

    // Generar el HTML
    articulosCarrito.forEach(curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row     = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${imagen}" width="100">
        </td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}"> X </a>
        </td>
        `;
        contenedorCarrito.appendChild(row);
    });

    // Sincronizar con storage
    sincronizarStorage();
}

function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

// limpiar los cursos del tbody
function limpiarHTML() {
    // forma lenta
    // contenedorCarrito.innerHTML = '';

    // forma mas eficiente
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}


