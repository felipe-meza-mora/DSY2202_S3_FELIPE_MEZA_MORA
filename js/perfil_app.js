document.addEventListener('DOMContentLoaded', () => {
    const perfilLink = document.getElementById('perfil-link');
    const sesionActiva = localStorage.getItem('sesion');

    if (sesionActiva) {
        const sesionUsuario = JSON.parse(localStorage.getItem('sesion'));

        // Mostrar el nombre de usuario en el enlace de perfil
        perfilLink.querySelector('a').textContent = `Hola, ${sesionUsuario.nombre}`;
        perfilLink.style.display = 'block';
    }

    // Obtener el usuario de la sesión actual
    const usuarioSesion = JSON.parse(localStorage.getItem('sesion'));

    if (!usuarioSesion) {
        // Redirigir a la página de inicio si no hay sesión activa
        window.location.href = 'index.html';
        return;
    }

    const nombreUsuarioField = document.getElementById('nombreUsuario');
    const correoUsuarioField = document.getElementById('correoUsuario');
    const direccionUsuarioField = document.getElementById('direccionUsuario');

    // Mostrar los datos del usuario en la página
    nombreUsuarioField.textContent = usuarioSesion.nombre;
    correoUsuarioField.textContent = usuarioSesion.correo;
    direccionUsuarioField.textContent = usuarioSesion.direccion;

    const cambiarContraseñaForm = document.getElementById('cambiarContraseñaForm');

    cambiarContraseñaForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const contraseñaAnterior = document.getElementById('contraseñaAnterior').value;
        const nuevaContraseña = document.getElementById('nuevaContraseña').value;
        const regex = /^(?=.*\d)(?=.*[A-Z])(?=.*[-_!@#$%^&*]).{6,18}$/;

        const invalidFeedback = document.querySelector('#cambiarContraseñaForm .invalid-feedback');

        if (!regex.test(nuevaContraseña)) {
            invalidFeedback.textContent = 'La nueva contraseña debe tener al menos 6 caracteres y contener al menos un número, una letra mayúscula y uno de los siguientes caracteres especiales: - _ ! @ # $ % ^ & *';
            invalidFeedback.style.display = 'block';
            return;
        }

        if (contraseñaAnterior !== usuarioSesion.password) {
            invalidFeedback.textContent = 'La contraseña anterior es incorrecta';
            invalidFeedback.style.display = 'block';
            return;
        }

        // Obtener todos los usuarios del localStorage
        const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];

        // Encontrar y actualizar el usuario en la lista de usuarios
        const usuarioIndex = usuariosGuardados.findIndex(user => user.correo === usuarioSesion.correo);

        if (usuarioIndex !== -1) {
            usuariosGuardados[usuarioIndex].password = nuevaContraseña;

            // Actualizar los datos en el localStorage
            localStorage.setItem('usuarios', JSON.stringify(usuariosGuardados));

            // También actualizar la sesión activa
            usuarioSesion.password = nuevaContraseña;
            localStorage.setItem('sesion', JSON.stringify(usuarioSesion));

            // Mostrar un mensaje de éxito
            const successAlert = document.createElement('div');
            successAlert.classList.add('alert', 'alert-success');
            successAlert.textContent = 'Contraseña cambiada exitosamente';
            cambiarContraseñaForm.appendChild(successAlert);

            // Redirigir a la página de inicio después de 2 segundos
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        } else {
            invalidFeedback.textContent = 'Usuario no encontrado';
            invalidFeedback.style.display = 'block';
        }
    });
});
