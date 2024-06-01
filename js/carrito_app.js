/**
 * Esta función se ejecuta cuando el contenido del DOM ha sido completamente cargado.
 * Llama a la función renderCart para mostrar el contenido del carrito.
 * Agrega un event listener al botón de "Comprar" para ejecutar la función comprar.
 */
document.addEventListener('DOMContentLoaded', () => {
    renderCart();
    actualizarCarritoCantidad();

    const comprarBtn = document.getElementById('comprar-btn');
    comprarBtn.addEventListener('click', comprar);
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

/**
 * Función para realizar la acción de compra.
 * Vacía el carrito almacenado en localStorage.
 * Llama a la función renderCart para actualizar la vista del carrito.
 * Muestra un mensaje de confirmación durante 2 segundos.
 */
const comprar = () => {
    // Vaciar el carrito
    localStorage.removeItem('carrito');
    
    // Renderizar el carrito vacío
    renderCart();
    
    // Mostrar mensaje de confirmación
    document.getElementById("respuesta").textContent = "Venta realizada con éxito!";
    document.getElementById("create-ok").style.display = "block";
    setTimeout(function() {
       document.getElementById("create-ok").style.display = "none";
   }, 2000);

    // Actualizar cantidad de productos en el carrito
    actualizarCarritoCantidad();
}

/**
 * Función para renderizar el contenido del carrito.
 * Obtiene los elementos del DOM necesarios.
 * Recupera el carrito almacenado en localStorage o inicializa un objeto vacío.
 * Calcula el precio total de los productos en el carrito.
 * Muestra los elementos del carrito en el DOM.
 * Agrega event listeners para incrementar, decrementar y eliminar productos del carrito.
 */
const renderCart = () => {
    const cartContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    let carrito = JSON.parse(localStorage.getItem('carrito')) || {};
    let totalPrice = 0;

    cartContainer.innerHTML = '';

    // Verificar si el carrito está vacío
    if (Object.keys(carrito).length === 0) {
        emptyCartMessage.style.display = 'block';
        document.getElementById("total-div").style.display = "none";
        totalPriceElement.textContent = totalPrice;
        return;
    } else {
        document.getElementById("total-div").style.display = "block";
        emptyCartMessage.style.display = 'none';
    }

    // Iterar sobre cada producto en el carrito
    Object.values(carrito).forEach(item => {
        // Crear un nuevo elemento de tarjeta para el producto
        const div = document.createElement('div');
        div.className = 'col-md-3 mb-3';
        div.innerHTML = `
            <div class="card">
                <div class="card-body text-center">
                    <h5 class="card-title">${item.title}</h5>
                    <p class="card-text">Precio: $${item.precio}</p>
                    <div class="d-flex justify-content-center align-items-center">
                        <button class="btn btn-outline-secondary btn-sm me-2 decrement-btn" data-id="${item.id}">-</button>
                        <span>${item.cantidad}</span>
                        <button class="btn btn-outline-secondary btn-sm ms-2 increment-btn" data-id="${item.id}">+</button>
                    </div>
                    <p class="card-text mt-2">Total: $${item.precio * item.cantidad}</p>
                    <button type="button" class="btn btn-danger btn-sm remove-from-cart-btn" data-id="${item.id}">Eliminar</button>
                </div>
            </div>
        `;
        cartContainer.appendChild(div);
        totalPrice += item.precio * item.cantidad;
    });

    // Actualizar el precio total en el DOM
    totalPriceElement.textContent = totalPrice;

    // Event listener para incrementar, decrementar y eliminar productos del carrito
    cartContainer.addEventListener('click', e => {
        if (e.target.classList.contains('increment-btn')) {
            // Incrementar la cantidad del producto y actualizar localStorage y la vista del carrito
            const productId = e.target.dataset.id;
            carrito[productId].cantidad += 1;
            localStorage.setItem('carrito', JSON.stringify(carrito));
            renderCart();
            actualizarCarritoCantidad();
        }

        if (e.target.classList.contains('decrement-btn')) {
            // Decrementar la cantidad del producto o eliminar el producto si la cantidad es 1
            const productId = e.target.dataset.id;
            if (carrito[productId].cantidad > 1) {
                carrito[productId].cantidad -= 1;
            } else {
                delete carrito[productId];
            }
            localStorage.setItem('carrito', JSON.stringify(carrito));
            renderCart();
            actualizarCarritoCantidad();
        }

        if (e.target.classList.contains('remove-from-cart-btn')) {
            // Eliminar el producto del carrito y actualizar localStorage y la vista del carrito
            const productId = e.target.dataset.id;
            delete carrito[productId];
            localStorage.setItem('carrito', JSON.stringify(carrito));
            renderCart();
            actualizarCarritoCantidad();
        }
    });
};

const actualizarCarritoCantidad = () => {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || {};
    const carritoCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0);
    document.getElementById('carrito-cantidad').textContent = carritoCantidad;
}