document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const correoInput = document.getElementById('correo');
    const passwordInput = document.getElementById('password');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const correo = correoInput.value;
        const password = passwordInput.value;

        // Validar correo y contraseña
        if (correo.trim() === '' || password.trim() === '') {
            // Mostrar mensaje de error para campos vacíos
            correoInput.classList.add('is-invalid');
            passwordInput.classList.add('is-invalid');
            return;
        }

        // Obtener datos del localStorage
        const usuarioGuardado = JSON.parse(localStorage.getItem('usuario'));

        // Verificar si el correo y la contraseña coinciden con los datos almacenados
        if (usuarioGuardado && usuarioGuardado.correo === correo && usuarioGuardado.password === password) {
            // Crear variable de sesión en el localStorage
            localStorage.setItem('sesion', JSON.stringify(usuarioGuardado));

            // Redirigir al usuario al index.html
            window.location.href = 'index.html';
        } else {
            // Mostrar mensaje de error para datos incorrectos
            correoInput.classList.add('is-invalid');
            passwordInput.classList.add('is-invalid');
        }
    });
});