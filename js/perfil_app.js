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

    // Obtener los datos del usuario del localStorage
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    const nombreUsuarioField = document.getElementById('nombreUsuario');
    const correoUsuarioField = document.getElementById('correoUsuario');
    const direccionUsuarioField = document.getElementById('direccionUsuario');

    // Mostrar los datos del usuario en la página
    nombreUsuarioField.textContent = usuario.nombre;
    correoUsuarioField.textContent = usuario.correo;
    direccionUsuarioField.textContent = usuario.direccion;

    // Obtener el formulario de cambiar contraseña
    const cambiarContraseñaForm = document.getElementById('cambiarContraseñaForm');

    // Manejar la solicitud de cambio de contraseña
    cambiarContraseñaForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Obtener la contraseña anterior y la nueva contraseña
        const contraseñaAnterior = document.getElementById('contraseñaAnterior').value;
        const nuevaContraseña = document.getElementById('nuevaContraseña').value;

        // Validar la nueva contraseña con la expresión regular
        const regex = /^(?=.*\d)(?=.*[A-Z])(?=.*[-_!@#$%^&*]).{6,18}$/;
        if (!regex.test(nuevaContraseña)) {
            const invalidFeedback = document.querySelector('#cambiarContraseñaForm .invalid-feedback');
            invalidFeedback.style.display = 'block';
            return;
        }

        // Verificar si la contraseña anterior coincide con la almacenada en el localStorage
        if (contraseñaAnterior !== usuario.password) {
            const invalidFeedback = document.querySelector('#cambiarContraseñaForm .invalid-feedback');
            invalidFeedback.textContent = 'La contraseña anterior es incorrecta';
            invalidFeedback.style.display = 'block';
            return;
        }

        // Actualizar la contraseña en el objeto de usuario
        usuario.password = nuevaContraseña;

        // Actualizar los datos del usuario en el localStorage
        localStorage.setItem('usuario', JSON.stringify(usuario));

        // Mostrar un mensaje de éxito
        const successAlert = document.createElement('div');
        successAlert.classList.add('alert', 'alert-success');
        successAlert.textContent = 'Contraseña cambiada exitosamente';
        cambiarContraseñaForm.appendChild(successAlert);

        // Redirigir a la página de inicio después de 2 segundos
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    });
});