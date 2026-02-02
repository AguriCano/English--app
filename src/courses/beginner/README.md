# Curso de Inglés - Nivel Principiante

## 📚 Descripción

Curso completo de inglés para principiantes, con 8 tópicos fundamentales:

- **Pronouns** (Pronombres)
- **The Articles** (Artículos)
- **Prepositions** (Preposiciones)
- **Verbs** (Verbos)
- **Adjectives** (Adjetivos)
- **Sentence Structure** (Estructura de Oraciones)
- **Tense Time** (Tiempos Verbales)
- **Numbers, Dates, Time** (Números, Fechas, Hora)

## 📁 Estructura del Proyecto

```
src/
└── courses/
    └── beginner/
        ├── index.html              # Página principal del curso
        ├── css/
        │   └── beginner.css        # Estilos responsivos del curso
        ├── js/
        │   └── course.js           # Lógica del curso
        └── lessons/
            ├── pronouns.html       # Lección 1: Pronombres
            ├── articles.html       # Lección 2: Artículos
            ├── prepositions.html   # Lección 3: Preposiciones
            ├── verbs.html          # Lección 4: Verbos
            ├── adjectives.html     # Lección 5: Adjetivos
            ├── sentence-structure.html  # Lección 6: Estructura
            ├── tenses.html         # Lección 7: Tiempos
            └── numbers.html        # Lección 8: Números
```

## ✨ Características

### Diseño Responsivo

- **Desktop**: Sidebar fijo con navegación principal, contenido expandido
- **Tablet**: Sidebar colapsable, grid adaptable
- **Mobile**: Sidebar oculto, contenido a pantalla completa

### Interactividad

- Navegación fluida entre lecciones
- Seguimiento de progreso (localStorage)
- Tarjetas interactivas con efectos hover
- Animaciones suaves

### Contenido Educativo

- Explicaciones detalladas y claras
- Tablas de referencia
- Ejemplos prácticos en contexto
- Código de ejemplo formateado

## 🎨 Estilos

### Colores Principales

- **Primary**: `#667eea` (Morado)
- **Secondary**: `#764ba2` (Púrpura)
- **Success**: `#48bb78` (Verde)
- **Warning**: `#ed8936` (Naranja)
- **Danger**: `#f56565` (Rojo)

### Tipografía

- Font Principal: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
- Código: 'Courier New', monospace

## 🚀 Cómo Usar

### Acceso al Curso

1. Inicia sesión en la aplicación
2. Ve al Dashboard
3. Haz clic en "Nivel Básico" en la sección de niveles

### Navegación

- **Sidebar**: Acceso rápido a todos los temas
- **Botones de Navegación**: Anterior/Siguiente entre lecciones
- **Links Internos**: Navegación directa a temas específicos

### Seguimiento del Progreso

- El progreso se guarda automáticamente en `localStorage`
- Visualiza el número de tópicos visitados
- Los temas visitados se marcan como activos

## 📊 Estructura de Lecciones

Cada lección contiene:

1. **Encabezado**: Título, descripción y badge de progreso
2. **Contenido Principal**:
   - Múltiples sub-secciones
   - Cajas de contenido con explicaciones
   - Tablas de referencia
   - Ejemplos prácticos
3. **Navegación**: Botones anterior/siguiente entre lecciones
4. **Resumen**: Puntos clave de la lección

## 💻 Tecnologías

- **HTML5**: Estructura semántica
- **CSS3**: Flexbox, Grid, Media Queries
- **JavaScript (Vanilla)**: Sin dependencias externas
- **LocalStorage**: Persistencia de datos en el navegador

## 🎯 Orden Recomendado de Aprendizaje

1. **👤 Pronouns** - Comprende los pronombres personales (15 min)
2. **📖 The Articles** - Aprende a usar a, an, the (20 min)
3. **📍 Prepositions** - Preposiciones de lugar y tiempo (25 min)
4. **⚡ Verbs** - Verbos básicos y conjugación (30 min)
5. **✨ Adjectives** - Descripción con adjetivos (20 min)
6. **📝 Sentence Structure** - Estructura de oraciones (25 min)
7. **⏰ Tense Time** - Tiempos verbales (35 min)
8. **🔢 Numbers & Dates** - Números, fechas y hora (20 min)

**Tiempo Total Estimado**: ~190 minutos (3 horas)

## 📱 Responsive Breakpoints

- **Desktop**: 1024px y superior
- **Tablet**: 768px - 1024px
- **Mobile**: Menos de 768px
- **Extra pequeño**: Menos de 480px

## 🔄 Flujo de Navegación

```
Dashboard (Level Básico)
    ↓
Curso Index (beginner/index.html)
    ├→ Pronouns.html
    ├→ Articles.html
    ├→ Prepositions.html
    ├→ Verbs.html
    ├→ Adjectives.html
    ├→ Sentence Structure.html
    ├→ Tenses.html
    └→ Numbers.html
```

## 🎓 Consejos para Estudiantes

1. **Lee y Repasa**: Tómate tiempo para cada concepto
2. **Practica Ejemplos**: Crea tus propias oraciones
3. **Consistencia**: Estudia un poco cada día
4. **Pronuncia**: Habla en voz alta
5. **Toma Notas**: Escribe lo que aprendas
6. **Practica en Grupo**: Interactúa con otros estudiantes

## 📝 Notas de Desarrollo

- No hay dependencias externas, todo es vanilla JavaScript
- Los datos de progreso se almacenan en `localStorage` con la clave `completedBeginnerLessons`
- Las animaciones usan CSS puro (sin librerías de animación)
- El diseño es 100% responsivo sin breakpoint manager adicional

## 🎨 Personalización

Para cambiar colores, edita las variables CSS en `beginner.css`:

```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --success-color: #48bb78;
  --warning-color: #ed8936;
  --danger-color: #f56565;
}
```

## 📞 Soporte

Para cambios o mejoras en el curso, edita los archivos HTML de las lecciones en la carpeta `lessons/`.

---

**Última actualización**: Febrero 2026
**Versión**: 1.0.0
