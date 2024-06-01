const items = document.getElementById('cards');
const templateCard = document.getElementById('template-card').content;
const fragment = document.createDocumentFragment();
let carrito = {};


document.addEventListener('DOMContentLoaded', () => {
    fetchData();
    
     // Cargar carrito desde localStorage si existe
     if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'));
        actualizarCarritoCantidad();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Obtener el elemento del enlace de perfil
    const perfilLink = document.getElementById('perfil-link');

    // Verificar si hay una sesión activa
    const sesionActiva = localStorage.getItem('sesion');

    if (sesionActiva) {
        // Obtener el nombre de la sesión almacenada en localStorage
        const nombreUsuario = JSON.parse(localStorage.getItem('sesion')).nombre;

        // Crear un elemento de span para el texto "Bienvenido"
        const bienvenidoSpan = document.createElement('span');
        bienvenidoSpan.textContent = 'Hola, ';

        // Crear un elemento de span para el nombre de usuario
        const nombreSpan = document.createElement('span');
        nombreSpan.textContent = nombreUsuario;

        // Insertar ambos elementos de span dentro del enlace de perfil
        perfilLink.querySelector('a').textContent = ''; // Limpiar el contenido actual
        perfilLink.querySelector('a').appendChild(bienvenidoSpan);
        perfilLink.querySelector('a').appendChild(nombreSpan);

        // Mostrar el enlace
        perfilLink.style.display = 'block';
    }
});

cards.addEventListener('click', e => {
    addCarrito(e);
});

const fetchData = async () => {
    try {
        const res = await fetch('./json/productos.json');
        const data = await res.json();
        console.log(data);
        pintarCards(data);
    } catch (error) {
        console.error('Error al cargar lista:', error);
    }
}

const pintarCards = data => {
    data.forEach(producto => {
        templateCard.querySelector('.card-title').textContent = producto.title;
        templateCard.querySelector('.card-text').textContent = producto.precio;
        templateCard.querySelector('.card-img-top').setAttribute('src', producto.thumbnailUrl);
        templateCard.querySelector('.card-img-top').setAttribute('alt', producto.title);
        templateCard.querySelector('.btn-warning').dataset.id = producto.id;

        const btnAddToCart = templateCard.querySelector('.btn-add-to-cart');
        const btnRegister = templateCard.querySelector('.btn-register');

        if (sesionActiva) {
            // Si hay sesión activa, mostrar el botón "Agregar al carro"
            btnAddToCart.style.display = 'block';
            btnAddToCart.dataset.id = producto.id;
            btnAddToCart.addEventListener('click', addCarrito);
        } else {
            // Si no hay sesión activa, mostrar el botón "Regístrate"
            btnRegister.style.display = 'block';
        }


        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);
    });
    items.appendChild(fragment);
}

 // Obtener el estado de la sesión
 const sesionActiva = localStorage.getItem('sesion');

const addCarrito = e => {
    //console.log(e.target);
    //console.log(e.target.classList.contains('btn-warning'));
    if (e.target.classList.contains('btn-warning')) {
        setCarrito(e.target.parentElement);
    }
    e.stopPropagation();
}

const setCarrito = objeto => {
    //console.log(objeto);
    const producto = {
        id: objeto.querySelector('.btn-warning').dataset.id,
        title: objeto.querySelector('.card-title').textContent,
        precio: objeto.querySelector('.card-text').textContent,
        cantidad: 1
    }

    if(carrito.hasOwnProperty(producto.id)){
        producto.cantidad = carrito[producto.id].cantidad + 1;
    }

    carrito[producto.id] = producto;

     // Guardar carrito en localStorage
     localStorage.setItem('carrito', JSON.stringify(carrito));
     document.getElementById("respuesta").textContent=producto.title+" se ha añadido al carrito";
     document.getElementById("create-ok").style.display = "block";
     setTimeout(function() {
        document.getElementById("create-ok").style.display = "none";
    }, 2000);

    // Actualizar cantidad de productos en el carrito
    actualizarCarritoCantidad();
}

const actualizarCarritoCantidad = () => {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || {};
    const carritoCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0);
    document.getElementById('carrito-cantidad').textContent = carritoCantidad;
}



document.addEventListener('DOMContentLoaded', () => {
    // Obtener el elemento del menú y los enlaces que queremos ocultar
    const menu = document.getElementById('menu');
    const perfilLink = document.getElementById('perfil');
    const logoutLink = document.getElementById('logout');
    const loginLink = document.getElementById('login');
    const registroLink = document.getElementById('registro');

    // Verificar si hay una sesión activa
    const sesionActiva = localStorage.getItem('sesion');

    if (sesionActiva) {
        // Si hay una sesión activa, ocultar los enlaces de inicio de sesión y registro
        loginLink.style.display = 'none';
        registroLink.style.display = 'none';
    } else {
        // Si no hay una sesión activa, ocultar los enlaces de perfil y cerrar sesión
        perfilLink.style.display = 'none';
        logoutLink.style.display = 'none';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Obtener los elementos del menú
    const registroLink = document.getElementById('registro-link');
    const loginLink = document.getElementById('login-link');
    const perfilLink = document.getElementById('perfil-link');
    const carritoLink = document.getElementById('carrito-link');
    const logoutLink = document.getElementById('logout-link');

    // Verificar si hay una sesión activa
    const sesionActiva = localStorage.getItem('sesion');

    if (sesionActiva) {
        // Si hay una sesión activa, mostrar los enlaces de perfil, carrito y logout
        perfilLink.style.display = 'block';
        carritoLink.style.display = 'block';
        logoutLink.style.display = 'block';
    } else {
        // Si no hay una sesión activa, mostrar los enlaces de registro y login
        registroLink.style.display = 'block';
        loginLink.style.display = 'block';
    }

    // Event listener para cerrar sesión
    logoutLink.addEventListener('click', () => {
        // Eliminar la variable de sesión
        localStorage.removeItem('sesion');
        // Redirigir al usuario a la página de inicio
        window.location.href = 'index.html';
    });
});



