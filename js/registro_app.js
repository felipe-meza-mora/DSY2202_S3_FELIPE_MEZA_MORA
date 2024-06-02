document.addEventListener('DOMContentLoaded', () => {
    const registroForm = document.getElementById('registro-form');

    const isValidPassword = (password) => {
        // Expresión regular para validar la contraseña
        const regex = /^(?=.*\d)(?=.*[A-Z])(?=.*[-_!@#$%^&*]).{6,18}$/;
        return regex.test(password);
    };

    const validateForm = () => {
        let isValid = true;

        const nombre = document.getElementById('nombre');
        const correo = document.getElementById('correo');
        const password = document.getElementById('password');
        const verificarPassword = document.getElementById('verificar-password');
        const direccion = document.getElementById('direccion');

        // Validar nombre
        if (!nombre.value) {
            nombre.classList.add('is-invalid');
            isValid = false;
        } else {
            nombre.classList.remove('is-invalid');
            nombre.classList.add('is-valid');
        }

        // Validar correo
        if (!correo.value || !correo.checkValidity()) {
            correo.classList.add('is-invalid');
            isValid = false;
        } else {
            correo.classList.remove('is-invalid');
            correo.classList.add('is-valid');
        }

        // Validar contraseña
        if (!password.value || !isValidPassword(password.value)) {
            password.classList.add('is-invalid');
            isValid = false;
        } else {
            password.classList.remove('is-invalid');
            password.classList.add('is-valid');
        }

        // Validar verificación de contraseña
        if (!verificarPassword.value || password.value !== verificarPassword.value) {
            verificarPassword.classList.add('is-invalid');
            isValid = false;
        } else {
            verificarPassword.classList.remove('is-invalid');
            verificarPassword.classList.add('is-valid');
        }

        // Validar dirección
        if (!direccion.value) {
            direccion.classList.add('is-invalid');
            isValid = false;
        } else {
            direccion.classList.remove('is-invalid');
            direccion.classList.add('is-valid');
        }

        return isValid;
    };

    const obtenerUsuarios = () => {
        const usuariosJSON = localStorage.getItem('usuarios');
        return usuariosJSON ? JSON.parse(usuariosJSON) : [];
    };

    const guardarUsuarios = (usuarios) => {
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    };

    const agregarUsuario = (nuevoUsuario) => {
        const usuarios = obtenerUsuarios();
        usuarios.push(nuevoUsuario);
        guardarUsuarios(usuarios);
    };

    // Agregar un usuario inicial por código (si no existe aún)
    if (!localStorage.getItem('usuarios')) {
        const usuarioInicial = {
            nombre: 'Admin',
            correo: 'admin@dyf.cl',
            password: 'Qwerty_123',
            direccion: 'Av. Siempre Viva 123',
            permisos: 'admin'
        };
        agregarUsuario(usuarioInicial);
    }

    registroForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (validateForm()) {
            const nombre = document.getElementById('nombre').value;
            const correo = document.getElementById('correo').value;
            const password = document.getElementById('password').value;
            const direccion = document.getElementById('direccion').value;
            const permisos = 'cliente';

            const nuevoUsuario = {
                nombre,
                correo,
                password,
                direccion,
                permisos
            };

            agregarUsuario(nuevoUsuario);

            document.getElementById('registro-exitoso').style.display = 'block';
            registroForm.reset();

            // Remover clases de validación después de resetear el formulario
            const formControls = registroForm.querySelectorAll('.form-control');
            formControls.forEach(control => {
                control.classList.remove('is-valid', 'is-invalid');
            });

            // Redirigir a login.html después del registro exitoso
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000); // 2 segundos de delay para que el usuario vea el mensaje de éxito
        }
    });
});