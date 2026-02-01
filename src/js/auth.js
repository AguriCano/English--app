// ====================================
// FUNCIONES DE AUTENTICACIÓN
// ====================================

// Verificar si el usuario está autenticado
function checkAuth() {
    const user = localStorage.getItem('currentUser');
    if (!user) {
        window.location.href = '../pages/login.html';
        return false;
    }
    return JSON.parse(user);
}

// Mostrar email del usuario en el dashboard
function displayUserEmail() {
    const user = checkAuth();
    if (user) {
        const userEmailElement = document.getElementById('userEmail');
        if (userEmailElement) {
            userEmailElement.textContent = user.email;
        }
    }
}

// Manejar Login
function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validar que los campos no estén vacíos
    if (!email || !password) {
        alert('Por favor completa todos los campos');
        return;
    }

    // Obtener usuarios del localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Buscar el usuario
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        alert('Correo o contraseña incorrectos');
        return;
    }

    // Guardar usuario actual en localStorage
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    // Redirigir al dashboard
    alert('¡Inicio de sesión exitoso!');
    window.location.href = 'dashboard.html';
}

// Manejar Registro
function handleRegister(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Validar que los campos no estén vacíos
    if (!email || !password || !confirmPassword) {
        alert('Por favor completa todos los campos');
        return;
    }

    // Validar que la contraseña tenga al menos 6 caracteres
    if (password.length < 6) {
        alert('La contraseña debe tener al menos 6 caracteres');
        return;
    }

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
    }

    // Obtener usuarios del localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Verificar si el usuario ya existe
    if (users.find(u => u.email === email)) {
        alert('Este correo ya está registrado');
        return;
    }

    // Crear nuevo usuario
    const newUser = {
        email,
        password,
        createdAt: new Date().toISOString()
    };

    // Agregar usuario a la lista
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert('¡Cuenta creada exitosamente! Ahora inicia sesión');
    window.location.href = 'login.html';
}

// Manejar Logout
function handleLogout() {
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
        localStorage.removeItem('currentUser');
        window.location.href = '../../index.html';
    }
}

// Ejecutar cuando el documento está listo
document.addEventListener('DOMContentLoaded', function() {
    // Si estamos en el dashboard, mostrar el email
    if (window.location.pathname.includes('dashboard.html')) {
        displayUserEmail();
    }
});
