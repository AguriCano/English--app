// ===========================
// SCRIPT PARA CURSO PRINCIPIANTE
// ===========================

// Estado del curso
const courseState = {
    currentLesson: null,
    completedLessons: [],
    totalLessons: 0
};

// Datos de lecciones del nivel principiante
const beginnerLessons = {
    pronouns: {
        id: 'pronouns',
        icon: '👤',
        title: 'Pronouns',
        description: 'Aprende los pronombres personales en inglés',
        duration: '15 min',
        lessons: [
            { id: '1.1', title: 'Personal Pronouns' },
            { id: '1.2', title: 'Subject vs Object Pronouns' },
            { id: '1.3', title: 'Possessive Pronouns' }
        ]
    },
    articles: {
        id: 'articles',
        icon: '📖',
        title: 'The Articles',
        description: 'Domina el uso correcto de "a", "an" y "the"',
        duration: '20 min',
        lessons: [
            { id: '2.1', title: 'Indefinite Articles (A, An)' },
            { id: '2.2', title: 'Definite Article (The)' },
            { id: '2.3', title: 'Zero Article' }
        ]
    },
    prepositions: {
        id: 'prepositions',
        icon: '📍',
        title: 'Prepositions',
        description: 'Preposiciones comunes y su uso',
        duration: '25 min',
        lessons: [
            { id: '3.1', title: 'Prepositions of Place' },
            { id: '3.2', title: 'Prepositions of Time' },
            { id: '3.3', title: 'Other Common Prepositions' }
        ]
    },
    verbs: {
        id: 'verbs',
        icon: '⚡',
        title: 'Verbs',
        description: 'Los verbos más comunes en inglés',
        duration: '30 min',
        lessons: [
            { id: '4.1', title: 'To Be - Present' },
            { id: '4.2', title: 'Regular Verbs' },
            { id: '4.3', title: 'Irregular Verbs' }
        ]
    },
    adjectives: {
        id: 'adjectives',
        icon: '✨',
        title: 'Adjectives',
        description: 'Adjetivos para describir personas y cosas',
        duration: '20 min',
        lessons: [
            { id: '5.1', title: 'Descriptive Adjectives' },
            { id: '5.2', title: 'Comparative & Superlative' },
            { id: '5.3', title: 'Adjective Order' }
        ]
    },
    sentenceStructure: {
        id: 'sentenceStructure',
        icon: '📝',
        title: 'Sentence Structure',
        description: 'Estructura básica de las oraciones en inglés',
        duration: '25 min',
        lessons: [
            { id: '6.1', title: 'Subject + Verb + Object' },
            { id: '6.2', title: 'Question Formation' },
            { id: '6.3', title: 'Negative Sentences' }
        ]
    },
    tenses: {
        id: 'tenses',
        icon: '⏰',
        title: 'Tense Time',
        description: 'Tiempos verbales: Present, Past, Future',
        duration: '35 min',
        lessons: [
            { id: '7.1', title: 'Present Simple' },
            { id: '7.2', title: 'Past Simple' },
            { id: '7.3', title: 'Future Simple' }
        ]
    },
    numbers: {
        id: 'numbers',
        icon: '🔢',
        title: 'Numbers, Dates, Time',
        description: 'Números, fechas y cómo decir la hora',
        duration: '20 min',
        lessons: [
            { id: '8.1', title: 'Cardinal Numbers' },
            { id: '8.2', title: 'Ordinal Numbers' },
            { id: '8.3', title: 'Dates & Time' }
        ]
    }
};

// Inicializar el curso
function initializeCourse() {
    courseState.totalLessons = Object.keys(beginnerLessons).length;
    setupNavigationListeners();
    loadCompletedLessons();
}

// Cargar lecciones completadas desde localStorage
function loadCompletedLessons() {
    const saved = localStorage.getItem('completedBeginnerLessons');
    if (saved) {
        courseState.completedLessons = JSON.parse(saved);
    }
}

// Guardar lecciones completadas
function saveCompletedLesson(lessonId) {
    if (!courseState.completedLessons.includes(lessonId)) {
        courseState.completedLessons.push(lessonId);
        localStorage.setItem('completedBeginnerLessons', JSON.stringify(courseState.completedLessons));
    }
}

// Configurar listeners de navegación
function setupNavigationListeners() {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const lessonId = this.dataset.lesson;
            if (lessonId) {
                navigateToLesson(lessonId);
            }
        });
    });
}

// Navegar a una lección específica
function navigateToLesson(lessonId) {
    const lesson = beginnerLessons[lessonId];
    if (lesson) {
        courseState.currentLesson = lessonId;
        updateActiveNav(lessonId);
        renderLessonContent(lesson);
        window.scrollTo(0, 0);
    }
}

// Actualizar navegación activa
function updateActiveNav(lessonId) {
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.lesson === lessonId) {
            link.classList.add('active');
        }
    });
}

// Renderizar contenido de la lección
function renderLessonContent(lesson) {
    const mainContent = document.querySelector('.main-content');
    const completedCount = courseState.completedLessons.length;
    
    let lessonsHtml = lesson.lessons.map(l => `
        <div class="lesson-card">
            <div class="lesson-icon">📚</div>
            <h3>${l.title}</h3>
            <p class="lesson-description">Lección ${l.id}</p>
            <div class="lesson-meta">
                <span class="lesson-duration">5-10 min</span>
                <span class="completion-status">
                    ${courseState.completedLessons.includes(l.id) ? '✓ Completada' : 'Empezar'}
                </span>
            </div>
        </div>
    `).join('');
    
    mainContent.innerHTML = `
        <div class="content-header">
            <h1>${lesson.icon} ${lesson.title}</h1>
            <div class="progress-badge">
                <span class="progress-number">${completedCount}/${courseState.totalLessons}</span>
                <span class="progress-text">Completadas</span>
            </div>
        </div>
        
        <div class="lessons-grid">
            ${lessonsHtml}
        </div>
    `;

    // Agregar listeners a las tarjetas de lecciones
    document.querySelectorAll('.lesson-card').forEach((card, index) => {
        card.addEventListener('click', function() {
            const lessonData = lesson.lessons[index];
            openDetailedLesson(lesson, lessonData);
        });
    });
}

// Abrir lección detallada
function openDetailedLesson(category, lesson) {
    // Aquí se cargaría el contenido detallado de cada lección
    console.log('Abriendo lección:', lesson.id);
    // Por ahora, mostrar un mensaje
    alert(`Lección: ${lesson.title}\n\nContenido disponible para: ${lesson.id}`);
}

// Actualizar conteo de progreso
function updateProgress() {
    const progressNumber = document.querySelector('.progress-number');
    if (progressNumber) {
        progressNumber.textContent = courseState.completedLessons.length + '/' + courseState.totalLessons;
    }
}

// Volver a la página anterior
function goBack() {
    window.history.back();
}

// Navegar a siguiente lección
function nextLesson() {
    const lessonIds = Object.keys(beginnerLessons);
    const currentIndex = lessonIds.indexOf(courseState.currentLesson);
    if (currentIndex < lessonIds.length - 1) {
        navigateToLesson(lessonIds[currentIndex + 1]);
    }
}

// Navegar a lección anterior
function previousLesson() {
    const lessonIds = Object.keys(beginnerLessons);
    const currentIndex = lessonIds.indexOf(courseState.currentLesson);
    if (currentIndex > 0) {
        navigateToLesson(lessonIds[currentIndex - 1]);
    }
}

// Marcar lección como completada
function completeLesson(lessonId) {
    saveCompletedLesson(lessonId);
    updateProgress();
}

// Renderizar vista general de curso
function renderCourseOverview() {
    const mainContent = document.querySelector('.main-content');
    const completedCount = courseState.completedLessons.length;
    
    let cardsHtml = Object.values(beginnerLessons).map(lesson => `
        <div class="lesson-card ${courseState.completedLessons.some(id => id.startsWith(lesson.id)) ? 'completed' : ''}">
            <div class="lesson-icon">${lesson.icon}</div>
            <h3>${lesson.title}</h3>
            <p class="lesson-description">${lesson.description}</p>
            <div class="lesson-meta">
                <span class="lesson-duration">⏱ ${lesson.duration}</span>
                <span class="completion-status ${courseState.completedLessons.some(id => id.startsWith(lesson.id)) ? '' : 'pending'}">
                    ${courseState.completedLessons.some(id => id.startsWith(lesson.id)) ? '✓ Iniciado' : '▶ Comenzar'}
                </span>
            </div>
        </div>
    `).join('');
    
    mainContent.innerHTML = `
        <div class="content-header">
            <h1>📚 Curso Básico de Inglés</h1>
            <div class="progress-badge">
                <span class="progress-number">${completedCount}/${courseState.totalLessons}</span>
                <span class="progress-text">Tópicos Visitados</span>
            </div>
        </div>
        
        <p style="color: var(--text-secondary); margin-bottom: 30px; font-size: 1.05em;">
            Bienvenido al curso básico de inglés. Aprenderás desde lo más fundamental como pronombres y artículos, 
            hasta aspectos más complejos como tiempos verbales y estructura de oraciones.
        </p>
        
        <div class="lessons-grid">
            ${cardsHtml}
        </div>
    `;

    // Agregar listeners a las tarjetas
    document.querySelectorAll('.lesson-card').forEach((card, index) => {
        card.addEventListener('click', function() {
            const lessonId = Object.keys(beginnerLessons)[index];
            navigateToLesson(lessonId);
        });
    });
}

// Event listeners cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    initializeCourse();
    renderCourseOverview();
});

// Exportar funciones globales
window.navigateToLesson = navigateToLesson;
window.completeLesson = completeLesson;
window.goBack = goBack;
window.nextLesson = nextLesson;
window.previousLesson = previousLesson;
