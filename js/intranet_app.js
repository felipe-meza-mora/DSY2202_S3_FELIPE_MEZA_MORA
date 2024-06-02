document.addEventListener('DOMContentLoaded', () => {
    // URL del archivo JSON
    const url = './json/productos.json';

    // Obtener referencia a la tabla
    const tableBody = document.getElementById('productos-table').querySelector('tbody');

    // Fetch para obtener los datos del archivo JSON
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Obtener los datos de la sesión del localStorage
            const sesionActiva = localStorage.getItem('sesion');
            const nombreUsuario = sesionActiva ? JSON.parse(sesionActiva).nombre : '';

            // Obtener referencia al elemento del nombre de usuario y el enlace de cierre de sesión
            const nombreUsuarioSpan = document.getElementById('nombre-usuario');
            const logoutLink = document.getElementById('logout');

            // Mostrar el nombre de usuario en el elemento correspondiente
            nombreUsuarioSpan.textContent = nombreUsuario;

            // Event listener para el enlace de cierre de sesión
            logoutLink.addEventListener('click', () => {
                // Eliminar la variable de sesión del localStorage
                localStorage.removeItem('sesion');
                // Redirigir al usuario a la página de inicio de sesión o a donde desees
                window.location.href = 'login.html';
            });

            // Insertar los datos en la tabla
            data.forEach(producto => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${producto.id}</td>
                    <td>${producto.title}</td>
                    <td>${producto.categoria}</td>
                    <td>${producto.marca}</td>
                    <td>${producto.precio}</td>
                    <td><img src="${producto.thumbnailUrl}" alt="${producto.title}" width="50"></td>
                    <td><button class="btn btn-danger btn-sm eliminar-producto">Eliminar</button></td>
                `;
                tableBody.appendChild(row);
            });

            // Agregar event listener para el botón de eliminar
            tableBody.querySelectorAll('.eliminar-producto').forEach((btn, index) => {
                btn.addEventListener('click', () => {
                    // Eliminar la fila correspondiente al botón de eliminar
                    tableBody.deleteRow(index);
                });
            });
        })
        .catch(error => console.error('Error al cargar el archivo JSON:', error));
});