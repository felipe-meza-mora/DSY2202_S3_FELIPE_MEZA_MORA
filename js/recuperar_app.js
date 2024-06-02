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
        } else {
            correoInput.classList.remove('is-invalid');
        }

        // Obtener datos del localStorage
        const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];

        // Verificar si el correo coincide con los datos almacenados
        const usuario = usuariosGuardados.find(user => user.correo === correo);
        
        if (usuario) {
            // Mostrar mensaje con la contraseña
            mensajeRecuperacion.textContent = `Tu contraseña es: ${usuario.password}`;
            mensajeRecuperacion.style.display = 'block';
        } else {
            // Mostrar mensaje de error para correo incorrecto
            mensajeRecuperacion.textContent = 'Correo no encontrado.';
            mensajeRecuperacion.style.display = 'block';
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
