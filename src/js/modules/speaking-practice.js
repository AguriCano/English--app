/**
 * Speaking Practice Module
 * Maneja la sección de práctica de pronunciación en inglés
 * 
 * Funcionalidades:
 * - Consumir palabras desde archivos JSON locales (sin backend)
 * - Reproducir pronunciación usando Web Speech API (TTS)
 * - Grabar audio del usuario
 * - Evaluar pronunciación usando Speech Recognition
 * - Mostrar feedback de puntuación
 */

const SpeakingPractice = (() => {
    // ===========================
    // CONFIGURACIÓN - API LOCAL
    // ===========================
    
    // Archivos JSON locales en /api (sin servidor backend necesario)
    const API_BASE = '/api/words-set';
    const API_FORMAT = '.json';
    const TOTAL_SETS = 20; // 100+ palabras en 20 conjuntos de 5 palabras cada uno

    let currentSetIndex = 1; // Índice del conjunto actual (1-20)

    const CARD_COLORS = ['orange', 'pink', 'green', 'blue', 'purple'];
    
    const ICON_EMOJIS = {
        map: '🗺️',
        person: '👤',
        people: '👥',
        user: '👤',
        cube: '🎁',
        default: '📚'
    };

    // ===========================
    // WEB SPEECH API
    // ===========================
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const SpeechSynthesisUtterance = window.SpeechSynthesisUtterance;
    const speechSynthesis = window.speechSynthesis;

    // ===========================
    // ESTADO
    // ===========================
    
    let currentWords = [];
    let isRecording = false;
    let mediaRecorder = null;
    let audioChunks = [];
    let recognitionInstance = null;
    let recordingCard = null;

    // ===========================
    // INICIALIZACIÓN
    // ===========================

    /**
     * Inicializa el módulo al cargar el dashboard
     */
    const init = async () => {
        console.log('🎤 Inicializando Speaking Practice...');
        try {
            await loadSpeakingWords();
        } catch (error) {
            console.error('Error al inicializar Speaking Practice:', error);
            showError('Error al cargar las palabras. Por favor, recarga la página.');
        }
    };

    // ===========================
    // CARGAR PALABRAS DESDE API LOCAL
    // ===========================

    /**
     * Carga las palabras desde archivos JSON locales (sin servidor)
     */
    const loadSpeakingWords = async () => {
        showLoading(true);
        hideError();

        try {
            const apiUrl = `${API_BASE}-${currentSetIndex}${API_FORMAT}`;
            console.log(`📡 Consume local: ${apiUrl}`);
            
            const response = await fetch(apiUrl);
            
            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }

            const data = await response.json();
            currentWords = data.words || [];

            if (Array.isArray(currentWords) && currentWords.length > 0) {
                console.log(`✅ Cargadas ${currentWords.length} palabras del conjunto ${currentSetIndex}`);
                renderCards(currentWords);
            } else {
                showError('No se encontraron palabras.');
                loadFallbackData();
            }
        } catch (error) {
            console.error('❌ Error cargando API local:', error);
            showError('Error al cargar palabras. Usando fallback local.');
            loadFallbackData();
        } finally {
            showLoading(false);
        }
    };

    /**
     * Carga el siguiente conjunto de palabras (cicla de 1 a 5)
     */
    const loadNextWordSet = () => {
        currentSetIndex = currentSetIndex === TOTAL_SETS ? 1 : currentSetIndex + 1;
        console.log(`🔄 Rotando a conjunto ${currentSetIndex}`);
        loadSpeakingWords();
    };

    /**
     * Datos de fallback local si la API no responde
     */
    const loadFallbackData = () => {
        console.log('📝 Cargando palabras locales (fallback)...');
        
        currentWords = [
            {
                id: 1,
                word: "Somewhere",
                phonetic: "/ˈsʌm.weər/",
                icon: "map",
                color: "orange"
            },
            {
                id: 2,
                word: "Nobody",
                phonetic: "/ˈnoʊ.bə.di/",
                icon: "person",
                color: "pink"
            },
            {
                id: 3,
                word: "Everybody",
                phonetic: "/ˈev.ri.bɑ.di/",
                icon: "people",
                color: "green"
            },
            {
                id: 4,
                word: "Someone",
                phonetic: "/ˈsʌm.wʌn/",
                icon: "user",
                color: "blue"
            },
            {
                id: 5,
                word: "Anything",
                phonetic: "/ˈen.i.θɪŋ/",
                icon: "cube",
                color: "purple"
            }
        ];

        renderCards(currentWords);
    };

    // ===========================
    // RENDERIZADO
    // ===========================

    /**
     * Renderiza las tarjetas de palabras en el DOM
     */
    const renderCards = (words) => {
        const container = document.getElementById('speaking-cards-container');
        
        if (!container) {
            console.warn('Contenedor de tarjetas no encontrado');
            return;
        }

        container.innerHTML = '';

        words.forEach((word, index) => {
            const card = createCard(word, index);
            container.appendChild(card);
        });
    };

    /**
     * Crea una tarjeta de palabra
     */
    const createCard = (word, index) => {
        const card = document.createElement('div');
        const color = word.color || CARD_COLORS[index % CARD_COLORS.length];
        const emoji = ICON_EMOJIS[word.icon] || ICON_EMOJIS.default;

        card.className = `speaking-card ${color}`;
        card.setAttribute('data-word-id', word.id);
        card.setAttribute('data-word', word.word);

        card.innerHTML = `
            <div class="speaking-card-icon">${emoji}</div>
            <div class="speaking-card-word">${word.word}</div>
            <div class="speaking-card-phonetic">${word.phonetic}</div>
            
            <div class="speaking-card-controls">
                <button class="btn-play" onclick="SpeakingPractice.playAudio(event)" title="Escuchar pronunciación">
                    ▶️
                </button>
                <button class="btn-microphone" onclick="SpeakingPractice.toggleRecording(event)" title="Grabar tu pronunciación">
                    🎤
                </button>
            </div>
            
            <div class="speaking-card-feedback"></div>
        `;

        return card;
    };

    // ===========================
    // REPRODUCCIÓN DE AUDIO (Web Speech API)
    // ===========================

    /**
     * Reproduce el audio de pronunciación usando Text-to-Speech
     */
    const playAudio = async (event) => {
        const button = event.target.closest('.btn-play');
        const card = button.closest('.speaking-card');
        const word = card.getAttribute('data-word');

        if (!word) {
            showCardFeedback(card, 'error', 'Palabra no disponible');
            return;
        }

        // Verificar soporte de Web Speech API
        if (!speechSynthesis || !SpeechSynthesisUtterance) {
            showCardFeedback(card, 'error', 'Tu navegador no soporta pronunciación');
            return;
        }

        button.classList.add('playing');
        showCardFeedback(card, 'info', '🔊 Reproduciendo...');

        try {
            // Cancelar cualquier reproducción anterior
            speechSynthesis.cancel();

            // Crear utterance para pronunciación
            const utterance = new SpeechSynthesisUtterance(word);
            utterance.lang = 'en-US';
            utterance.rate = 0.9; // Velocidad ligeramente más lenta
            utterance.pitch = 1.0;
            utterance.volume = 1.0;

            utterance.onend = () => {
                button.classList.remove('playing');
                showCardFeedback(card, 'success', '✓ Pronunciación completada');
            };

            utterance.onerror = (error) => {
                button.classList.remove('playing');
                console.error('Error en TTS:', error);
                showCardFeedback(card, 'error', 'Error al reproducir audio');
            };

            speechSynthesis.speak(utterance);
        } catch (error) {
            button.classList.remove('playing');
            console.error('Error reproduciendo pronunciación:', error);
            showCardFeedback(card, 'error', 'Error al reproducir');
        }
    };

    // ===========================
    // GRABACIÓN Y RECONOCIMIENTO DE VOZ
    // ===========================

    /**
     * Inicia o detiene la grabación de audio
     */
    const toggleRecording = async (event) => {
        const button = event.target.closest('.btn-microphone');
        const card = button.closest('.speaking-card');

        if (!isRecording) {
            await startRecording(button, card);
        } else {
            await stopRecording(button, card);
        }
    };

    /**
     * Inicia la grabación y reconocimiento de voz
     */
    const startRecording = async (button, card) => {
        try {
            // Solicitar permiso para usar el micrófono
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            
            mediaRecorder = new MediaRecorder(stream);
            audioChunks = [];
            isRecording = true;
            recordingCard = card;

            button.classList.add('recording');
            showCardFeedback(card, 'info', '🔴 Grabando...');

            mediaRecorder.ondataavailable = (event) => {
                audioChunks.push(event.data);
            };

            mediaRecorder.onstop = () => {
                handleRecordingComplete(card);
            };

            mediaRecorder.start();
        } catch (error) {
            console.error('Error al acceder al micrófono:', error);
            
            let errorMsg = 'Error al acceder al micrófono';
            if (error.name === 'NotAllowedError') {
                errorMsg = 'Permiso de micrófono denegado';
            } else if (error.name === 'NotFoundError') {
                errorMsg = 'No hay micrófono disponible';
            }
            
            showCardFeedback(card, 'error', errorMsg);
        }
    };

    /**
     * Detiene la grabación
     */
    const stopRecording = async (button, card) => {
        if (mediaRecorder && isRecording) {
            mediaRecorder.stop();
            button.classList.remove('recording');
            isRecording = false;

            // Detener el stream
            mediaRecorder.stream.getTracks().forEach(track => track.stop());
        }
    };

    /**
     * Procesa la grabación completada usando Speech Recognition
     */
    const handleRecordingComplete = (card) => {
        if (!SpeechRecognition) {
            showCardFeedback(card, 'error', 'Tu navegador no soporta reconocimiento de voz');
            return;
        }

        showCardFeedback(card, 'info', '🔄 Analizando pronunciación...');

        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        // Usar Speech Recognition para evaluar
        evaluatePronunciation(card, audioUrl);
    };

    /**
     * Evalúa la pronunciación usando Web Speech API
     */
    const evaluatePronunciation = (card, audioUrl) => {
        const word = card.getAttribute('data-word');

        if (!SpeechRecognition) {
            showCardFeedback(card, 'error', 'Reconocimiento de voz no soportado');
            return;
        }

        try {
            recognitionInstance = new SpeechRecognition();
            recognitionInstance.lang = 'en-US';
            recognitionInstance.continuous = false;
            recognitionInstance.interimResults = false;

            const audio = new Audio(audioUrl);

            recognitionInstance.onstart = () => {
                console.log('🎙️ Iniciando reconocimiento de voz...');
            };

            recognitionInstance.onresult = (event) => {
                let transcript = '';
                
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    transcript += event.results[i][0].transcript;
                }

                transcript = transcript.toLowerCase().trim();
                console.log('Reconocido:', transcript);

                const score = calculateSimilarity(word.toLowerCase(), transcript);
                displayEvaluationResult(card, score, transcript, word);
            };

            recognitionInstance.onerror = (event) => {
                console.error('Error en reconocimiento:', event.error);
                
                // Si no reconoce, usar evaluación visual
                const messages = {
                    'no-speech': 'No se detectó voz. Intenta de nuevo más fuerte.',
                    'audio-capture': 'Error al capturar audio',
                    'network': 'Error de conexión'
                };

                const errorMsg = messages[event.error] || 'Error en reconocimiento de voz';
                showCardFeedback(card, 'error', errorMsg);
            };

            recognitionInstance.onend = () => {
                URL.revokeObjectURL(audioUrl);
            };

            // Iniciar reconocimiento
            recognitionInstance.start();

            // Reproducir el audio grabado para análisis
            audio.onloadedmetadata = () => {
                audio.play().catch(err => {
                    console.log('Audio playback para análisis skipped');
                });
            };

        } catch (error) {
            console.error('Error evaluando pronunciación:', error);
            showCardFeedback(card, 'error', 'Error al analizar pronunciación');
        }
    };

    /**
     * Calcula la similitud entre la palabra esperada y la pronunciada
     * Usa una combinación de match exacto y similitud Levenshtein
     */
    const calculateSimilarity = (expected, actual) => {
        // Si es match exacto
        if (expected === actual) {
            return 100;
        }

        // Si contiene la palabra
        if (actual.includes(expected) || expected.includes(actual)) {
            return 85;
        }

        // Calcular distancia Levenshtein
        const distance = levenshteinDistance(expected, actual);
        const maxLen = Math.max(expected.length, actual.length);
        const similarity = Math.max(0, 100 - (distance / maxLen) * 100);

        return Math.round(similarity);
    };

    /**
     * Calcula la distancia Levenshtein entre dos strings
     */
    const levenshteinDistance = (str1, str2) => {
        const len1 = str1.length;
        const len2 = str2.length;
        const matrix = Array(len2 + 1).fill(null).map(() => Array(len1 + 1).fill(0));

        for (let i = 0; i <= len1; i++) matrix[0][i] = i;
        for (let j = 0; j <= len2; j++) matrix[j][0] = j;

        for (let j = 1; j <= len2; j++) {
            for (let i = 1; i <= len1; i++) {
                const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
                matrix[j][i] = Math.min(
                    matrix[j][i - 1] + 1,
                    matrix[j - 1][i] + 1,
                    matrix[j - 1][i - 1] + cost
                );
            }
        }

        return matrix[len2][len1];
    };

    /**
     * Muestra el resultado de la evaluación
     */
    const displayEvaluationResult = (card, score, transcript, expectedWord) => {
        let feedbackType = 'info';
        let feedbackMsg = '';

        if (score >= 80) {
            feedbackType = 'success';
            feedbackMsg = '¡Excelente pronunciación!';
        } else if (score >= 60) {
            feedbackType = 'success';
            feedbackMsg = 'Muy bien, casi perfecto';
        } else if (score >= 40) {
            feedbackType = 'info';
            feedbackMsg = 'Buen esfuerzo, sigue practicando';
        } else {
            feedbackType = 'error';
            feedbackMsg = 'Intenta pronunciarlo de nuevo';
        }

        const feedbackHTML = `
            <div class="speaking-card-score">${score}/100</div>
            <div class="speaking-card-recognized">Escuché: <strong>${transcript}</strong></div>
            <div>${feedbackMsg}</div>
        `;

        showCardFeedback(card, feedbackType, feedbackHTML, true);
    };

    // ===========================
    // INTERFAZ DE USUARIO
    // ===========================

    /**
     * Muestra feedback en una tarjeta
     */
    const showCardFeedback = (card, type, message, isHTML = false) => {
        const feedbackEl = card.querySelector('.speaking-card-feedback');
        
        feedbackEl.className = `speaking-card-feedback ${type}`;
        
        if (isHTML) {
            feedbackEl.innerHTML = message;
        } else {
            feedbackEl.textContent = message;
        }
        
        feedbackEl.classList.add('show');

        // Auto-cerrar después de 6 segundos
        setTimeout(() => {
            feedbackEl.classList.remove('show');
        }, 6000);
    };

    /**
     * Muestra/oculta el estado de carga
     */
    const showLoading = (show) => {
        const loadingEl = document.getElementById('speaking-loading');
        if (loadingEl) {
            loadingEl.style.display = show ? 'flex' : 'none';
        }
    };

    /**
     * Muestra un error en la sección
     */
    const showError = (message) => {
        const errorEl = document.getElementById('speaking-error');
        if (errorEl) {
            errorEl.textContent = message;
            errorEl.classList.add('show');
        }
    };

    /**
     * Oculta el error
     */
    const hideError = () => {
        const errorEl = document.getElementById('speaking-error');
        if (errorEl) {
            errorEl.classList.remove('show');
        }
    };

    // ===========================
    // CARGAR MÁS PALABRAS
    // ===========================

    /**
     * Carga el siguiente conjunto de palabras
     */
    const loadMore = async () => {
        loadNextWordSet();
        // Scroll suave a la sección
        const section = document.querySelector('.speaking-practice-section');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // ===========================
    // API PÚBLICA
    // ===========================

    return {
        init,
        loadSpeakingWords,
        playAudio,
        toggleRecording,
        loadMore
    };
})();

/**
 * Función global para cargar más palabras
 */
function loadMoreSpeakingWords() {
    SpeakingPractice.loadMore();
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    SpeakingPractice.init();
});
