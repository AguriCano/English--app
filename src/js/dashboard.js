// ===========================
// DASHBOARD FUNCTIONALITY
// ===========================

// Configuración de APIs
const API_CONFIG = {
    NYT_API_KEY: 'rVdpLoCyMnDvGGV8UAbnkckbo5HnHjENOxDTDZdGxzdaq3cH', // Reemplazar con tu clave real de NYT
    NYT_API_URL: 'https://api.nytimes.com/svc/topstories/v2',
    DICTIONARY_API_URL: 'https://api.dictionaryapi.dev/api/v2/entries/en'
};

// Categorías de NYT disponibles
const NYT_CATEGORIES = ['world', 'business', 'technology', 'science', 'sports'];

// Datos de ejemplo para noticias (fallback)
const sampleNews = [
    {
        id: 1,
        title: "La IA revoluciona el mundo de la programación",
        excerpt: "Desarrolladores de todo el mundo están adaptando sus flujos de trabajo para incorporar herramientas de IA...",
        category: "Tech",
        difficulty: "intermediate",
        readTime: 5,
        url: "#"
    },
    {
        id: 2,
        title: "Nuevo tratado comercial entre Estados Unidos y Europa",
        excerpt: "Los negociadores de ambos lados llegan a un acuerdo histórico que afectará billones en comercio...",
        category: "Business",
        difficulty: "advanced",
        readTime: 8,
        url: "#"
    },
    {
        id: 3,
        title: "Descubrimiento revolucionario en medicina regenerativa",
        excerpt: "Científicos logran regenerar tejido cardíaco usando células madre en un avance que promete transformar...",
        category: "Science",
        difficulty: "intermediate",
        readTime: 6,
        url: "#"
    }
];

// Datos de ejemplo para vocabulario (fallback)
const sampleVocabulary = [
    {
        id: 1,
        word: "Resilience",
        pronunciation: "/rɪˈzɪl.i.əns/",
        definition: "La capacidad de recuperarse rápidamente",
        example: "The team showed great resilience after their defeat.",
        level: "intermediate",
        dateAdded: new Date()
    },
    {
        id: 2,
        word: "Serendipity",
        pronunciation: "/ˌser.ənˈdɪp.ə.ti/",
        definition: "Encontrar algo bueno sin buscarlo",
        example: "By serendipity, I found the perfect job.",
        level: "advanced",
        dateAdded: new Date()
    }
];

// Estado global de noticias
let allNews = [];
let filteredNews = [];

// Inicializar el dashboard
document.addEventListener('DOMContentLoaded', function() {
    loadDashboardData();
    setupEventListeners();
    
    // Cargar noticias desde API o datos de ejemplo
    loadNewsFromAPI();
    
    // Cargar vocabulario guardado
    renderVocabulary();
});

// ===========================
// FUNCIONES DE API - NEW YORK TIMES
// ===========================

// Cargar noticias desde NYT API
async function loadNewsFromAPI() {
    try {
        const newsContainer = document.getElementById('news-container');
        newsContainer.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px;">⏳ Cargando noticias...</div>';
        
        // Obtener noticias de la API de NYT
        const articles = await fetchNYTArticles('world');
        
        if (articles && articles.length > 0) {
            allNews = articles;
            filteredNews = articles;
            renderNews();
        } else {
            // Si falla la API, usar datos de ejemplo
            console.log('Usando datos de ejemplo (API no disponible)');
            allNews = sampleNews;
            filteredNews = sampleNews;
            renderNews();
        }
    } catch (error) {
        console.error('Error cargando noticias:', error);
        // Fallback a datos de ejemplo
        allNews = sampleNews;
        filteredNews = sampleNews;
        renderNews();
    }
}

// Obtener artículos de NYT
async function fetchNYTArticles(section = 'world') {
    try {
        const url = `${API_CONFIG.NYT_API_URL}/${section}.json?api-key=${API_CONFIG.NYT_API_KEY}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`NYT API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Transformar artículos de NYT al formato de la app
        return data.results.slice(0, 12).map((article, index) => ({
            id: index + 1,
            title: article.title,
            excerpt: article.abstract || article.lead_paragraph || 'Sin descripción',
            category: capitalizeFirst(section),
            difficulty: estimateDifficulty(article.title),
            readTime: estimateReadTime(article.abstract),
            url: article.url,
            image: article.multimedia?.[0]?.url || null
        }));
    } catch (error) {
        console.error('Error en NYT API:', error);
        return null;
    }
}

// Estimar dificultad basada en longitud y palabras complejas
function estimateDifficulty(text) {
    const words = text.split(' ');
    const avgWordLength = words.reduce((sum, w) => sum + w.length, 0) / words.length;
    
    if (avgWordLength > 7) return 'advanced';
    if (avgWordLength > 5) return 'intermediate';
    return 'beginner';
}

// Estimar tiempo de lectura
function estimateReadTime(text) {
    const wordsPerMinute = 200;
    const wordCount = (text || '').split(' ').length;
    return Math.max(1, Math.round(wordCount / wordsPerMinute));
}

// ===========================
// FUNCIONES DE API - DICTIONARY
// ===========================

// Obtener definición de una palabra
async function fetchWordDefinition(word) {
    try {
        const url = `${API_CONFIG.DICTIONARY_API_URL}/${word.toLowerCase()}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Dictionary API error: ${response.status}`);
        }
        
        const data = await response.json();
        const wordData = data[0];
        
        return {
            word: wordData.word,
            pronunciation: wordData.phonetic || '',
            definitions: wordData.meanings[0]?.definitions || [],
            examples: wordData.meanings[0]?.definitions[0]?.example || '',
            partOfSpeech: wordData.meanings[0]?.partOfSpeech || '',
            synonyms: wordData.meanings[0]?.synonyms || []
        };
    } catch (error) {
        console.error('Error obteniendo definición:', error);
        return null;
    }
}

// Cargar datos del dashboard
function loadDashboardData() {
    // Aquí se cargarían datos reales desde el servidor
    const userData = JSON.parse(localStorage.getItem('userData')) || {
        streak: 7,
        wordsLearned: 42,
        articlesRead: 8
    };
    
    document.getElementById('streak-count').textContent = userData.streak || 0;
    document.getElementById('words-count').textContent = userData.wordsLearned || 0;
    document.getElementById('articles-count').textContent = userData.articlesRead || 0;
}

// Configurar event listeners
function setupEventListeners() {
    // Filtros de noticias
    document.getElementById('category-filter').addEventListener('change', filterNews);
    document.getElementById('difficulty-filter').addEventListener('change', filterNews);
    document.getElementById('sort-filter').addEventListener('change', filterNews);
    
    // Búsqueda de vocabulario (busca en API)
    const vocabSearch = document.getElementById('vocab-search');
    let searchTimeout;
    
    vocabSearch.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        // Esperar 500ms antes de buscar en la API
        searchTimeout = setTimeout(() => {
            if (this.value.trim().length > 0) {
                searchWordInDictionary();
            } else {
                renderVocabulary();
            }
        }, 500);
    });
    
    document.getElementById('vocab-sort').addEventListener('change', sortVocabulary);
}

// Renderizar noticias
function renderNews() {
    const newsContainer = document.getElementById('news-container');
    
    const newsToShow = filteredNews.length > 0 ? filteredNews : allNews;
    
    if (newsToShow.length === 0) {
        newsContainer.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: #999; padding: 40px;">No hay noticias disponibles</div>';
        return;
    }
    
    newsContainer.innerHTML = newsToShow.map(news => `
        <div class="news-card">
            <div class="news-meta">
                <span class="news-category">${news.category}</span>
                <span class="news-difficulty ${news.difficulty}">${capitalizeFirst(news.difficulty)}</span>
            </div>
            <h3>${news.title}</h3>
            <p class="news-excerpt">${truncateText(news.excerpt, 150)}</p>
            <div class="news-footer">
                <span class="reading-time">⏱ ${news.readTime} min</span>
                <button class="btn btn-primary-small" onclick="openNewsReader('${news.id}')">Leer</button>
            </div>
        </div>
    `).join('');
}

// Renderizar vocabulario
function renderVocabulary() {
    const vocabContainer = document.getElementById('vocabulary-container');
    vocabContainer.innerHTML = sampleVocabulary.map(vocab => `
        <div class="vocabulary-item">
            <div class="vocab-word">
                <h4>${vocab.word}</h4>
                <span class="vocab-pronunciation">${vocab.pronunciation}</span>
            </div>
            <div class="vocab-definition">
                <p><strong>Definición:</strong> ${vocab.definition}</p>
                <p><strong>Ejemplo:</strong> "${vocab.example}"</p>
                <span class="vocab-level">${capitalizeFirst(vocab.level)}</span>
            </div>
            <div class="vocab-actions">
                <button class="btn-icon" title="Escuchar" onclick="speakWord('${vocab.word}')">🔊</button>
                <button class="btn-icon" title="Marcar como aprendida" onclick="markAsLearned('${vocab.id}')">✓</button>
                <button class="btn-icon" title="Eliminar" onclick="deleteWord('${vocab.id}')">🗑</button>
            </div>
        </div>
    `).join('');
}

// Filtrar noticias
function filterNews() {
    const category = document.getElementById('category-filter').value;
    const difficulty = document.getElementById('difficulty-filter').value;
    
    let filtered = allNews;
    
    if (category !== 'all') {
        filtered = filtered.filter(n => n.category.toLowerCase() === category);
    }
    
    if (difficulty !== 'all') {
        filtered = filtered.filter(n => n.difficulty === difficulty);
    }
    
    filteredNews = filtered;
    renderNews();
}

// Buscar vocabulario
function searchVocabulary() {
    const searchTerm = document.getElementById('vocab-search').value.toLowerCase();
    const filtered = sampleVocabulary.filter(vocab => 
        vocab.word.toLowerCase().includes(searchTerm)
    );
    displayFilteredVocabulary(filtered);
}

// Buscar palabra en API de diccionario
async function searchWordInDictionary() {
    const searchTerm = document.getElementById('vocab-search').value.trim();
    
    if (!searchTerm) {
        renderVocabulary();
        return;
    }
    
    try {
        const wordData = await fetchWordDefinition(searchTerm);
        
        if (wordData) {
            // Mostrar resultado de búsqueda
            const vocabContainer = document.getElementById('vocabulary-container');
            vocabContainer.innerHTML = `
                <div class="vocabulary-item">
                    <div class="vocab-word">
                        <h4>${wordData.word}</h4>
                        <span class="vocab-pronunciation">${wordData.pronunciation}</span>
                    </div>
                    <div class="vocab-definition">
                        <p><strong>Definición:</strong> ${wordData.definitions[0]?.definition || 'No disponible'}</p>
                        <p><strong>Ejemplo:</strong> "${wordData.examples || 'No disponible'}"</p>
                        <span class="vocab-level">${wordData.partOfSpeech}</span>
                    </div>
                    <div class="vocab-actions">
                        <button class="btn-icon" title="Guardar palabra" onclick="saveWordToVocabulary('${wordData.word}')">💾</button>
                        <button class="btn-icon" title="Escuchar" onclick="speakWord('${wordData.word}')">🔊</button>
                        <button class="btn-icon" title="Volver" onclick="renderVocabulary()">↩</button>
                    </div>
                </div>
            `;
        } else {
            const vocabContainer = document.getElementById('vocabulary-container');
            vocabContainer.innerHTML = '<div style="text-align: center; padding: 20px; color: #999;">Palabra no encontrada en el diccionario</div>';
        }
    } catch (error) {
        console.error('Error buscando palabra:', error);
        renderVocabulary();
    }
}

// Guardar palabra al vocabulario
function saveWordToVocabulary(word) {
    const existingWord = sampleVocabulary.find(v => v.word.toLowerCase() === word.toLowerCase());
    
    if (existingWord) {
        alert('Esta palabra ya está en tu vocabulario');
        return;
    }
    
    const newWord = {
        id: sampleVocabulary.length + 1,
        word: word,
        pronunciation: '',
        definition: 'Guardado desde diccionario',
        example: '',
        level: 'intermediate',
        dateAdded: new Date()
    };
    
    sampleVocabulary.push(newWord);
    alert(`"${word}" guardada en tu vocabulario`);
    renderVocabulary();
}

// Ordenar vocabulario
function sortVocabulary() {
    const sortBy = document.getElementById('vocab-sort').value;
    let sorted = [...sampleVocabulary];
    
    if (sortBy === 'alphabetical') {
        sorted.sort((a, b) => a.word.localeCompare(b.word));
    } else if (sortBy === 'difficulty') {
        const difficultyOrder = { beginner: 1, intermediate: 2, advanced: 3 };
        sorted.sort((a, b) => difficultyOrder[a.level] - difficultyOrder[b.level]);
    }
    
    displayFilteredVocabulary(sorted);
}

// Mostrar vocabulario filtrado
function displayFilteredVocabulary(vocab) {
    const vocabContainer = document.getElementById('vocabulary-container');
    vocabContainer.innerHTML = vocab.map(v => `
        <div class="vocabulary-item">
            <div class="vocab-word">
                <h4>${v.word}</h4>
                <span class="vocab-pronunciation">${v.pronunciation}</span>
            </div>
            <div class="vocab-definition">
                <p><strong>Definición:</strong> ${v.definition}</p>
                <p><strong>Ejemplo:</strong> "${v.example}"</p>
                <span class="vocab-level">${capitalizeFirst(v.level)}</span>
            </div>
            <div class="vocab-actions">
                <button class="btn-icon" title="Escuchar" onclick="speakWord('${v.word}')">🔊</button>
                <button class="btn-icon" title="Marcar como aprendida" onclick="markAsLearned('${v.id}')">✓</button>
                <button class="btn-icon" title="Eliminar" onclick="deleteWord('${v.id}')">🗑</button>
            </div>
        </div>
    `).join('');
}

// Abrir lector de noticias
function openNewsReader(newsId) {
    const news = sampleNews.find(n => n.id == newsId);
    if (news) {
        console.log('Abriendo noticia:', news.title);
        // Aquí se podría abrir un modal o redirigir a una página de lectura
        alert(`Abriendo: ${news.title}\n\nCaracterística de lectura completa en desarrollo...`);
    }
}

// Pronunciar palabra
function speakWord(word) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = 'en-US';
        speechSynthesis.speak(utterance);
    } else {
        alert('La síntesis de voz no es soportada en este navegador.');
    }
}

// Marcar como aprendida
function markAsLearned(vocabId) {
    alert(`Palabra marcada como aprendida: ${sampleVocabulary.find(v => v.id == vocabId).word}`);
    // Aquí se actualizaría en la base de datos
}

// Eliminar palabra
function deleteWord(vocabId) {
    const word = sampleVocabulary.find(v => v.id == vocabId);
    if (confirm(`¿Eliminar "${word.word}" del vocabulario?`)) {
        alert(`Palabra eliminada: ${word.word}`);
        // Aquí se actualizaría en la base de datos
    }
}

// Utilidades
function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Truncar texto
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}
