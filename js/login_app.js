document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const correoInput = document.getElementById('correo'); 
    const passwordInput = document.getElementById('password'); 

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const correo = correoInput.value.trim();
        const password = passwordInput.value.trim();

        // Validar correo y contraseña
        if (correo === '' || password === '') {
            // Mostrar mensaje de error para campos vacíos
            correoInput.classList.add('is-invalid');
            passwordInput.classList.add('is-invalid');
            return;
        }

        // Obtener datos de los usuarios del localStorage
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        // Verificar si el correo y la contraseña coinciden con algún usuario almacenado
        const usuario = usuarios.find(user => user.correo === correo && user.password === password);

        if (usuario) {
            // Crear variable de sesión en el localStorage
            localStorage.setItem('sesion', JSON.stringify(usuario));

            // Redirigir según los permisos del usuario
            if (usuario.permisos === 'admin') {
                window.location.href = 'intranet.html';
            } else {
                window.location.href = 'index.html';
            }
        } else {
            // Mostrar mensaje de error para datos incorrectos
            correoInput.classList.add('is-invalid');
            passwordInput.classList.add('is-invalid');
        }
    });
});
