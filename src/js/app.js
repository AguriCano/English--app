// ====================================
// FUNCIONES DEL DASHBOARD
// ====================================

// Inicializar dashboard
function initDashboard() {
    const user = checkAuth();
    if (user) {
        console.log('Usuario autenticado:', user.email);
        // Aquí puedes agregar lógica adicional del dashboard
    }
}

// Event listeners para las tarjetas de nivel
document.addEventListener('DOMContentLoaded', function() {
    // Agregar evento click a las tarjetas de nivel
    const levelCards = document.querySelectorAll('.level-card');
    levelCards.forEach(card => {
        card.addEventListener('click', function() {
            const levelName = this.querySelector('h3').textContent;
            console.log('Nivel seleccionado:', levelName);
            alert('Has seleccionado: ' + levelName);
        });
    });

    // Agregar evento click a las tarjetas de curso
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach(card => {
        card.addEventListener('click', function() {
            const courseName = this.querySelector('h3').textContent;
            console.log('Curso seleccionado:', courseName);
            alert('Has seleccionado: ' + courseName);
        });
    });

    // Agregar evento click a los botones "Comenzar"
    const startButtons = document.querySelectorAll('.level-card .btn');
    startButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const levelName = this.closest('.level-card').querySelector('h3').textContent;
            console.log('Iniciando:', levelName);
            alert('Iniciando el nivel: ' + levelName);
        });
    });

    // Inicializar dashboard
    initDashboard();
});
