document.addEventListener('DOMContentLoaded', () => {
    const recuperarPasswordForm = document.getElementById('recuperar-password-form');
    const correoInput = document.getElementById('correo');
    const mensajeRecuperacion = document.getElementById('mensaje-recuperacion');

    recuperarPasswordForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const correo = correoInput.value;

        // Validar correo
        if (!isValidEmail(correo)) {
            correoInput.classList.add('is-invalid');
            return;
        }

        // Obtener datos del localStorage
        const usuarioGuardado = JSON.parse(localStorage.getItem('usuario'));

        // Verificar si el correo coincide con los datos almacenados
        if (usuarioGuardado && usuarioGuardado.correo === correo) {
            // Mostrar mensaje con la contraseña
            mensajeRecuperacion.textContent = `Tu contraseña es: ${usuarioGuardado.password}`;
            mensajeRecuperacion.style.display = 'block';
        } else {
            // Mostrar mensaje de error para correo incorrecto
            correoInput.classList.add('is-invalid');
        }
    });

    // Función para validar un correo electrónico
    function isValidEmail(email) {
        // Expresión regular para validar el formato de correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});