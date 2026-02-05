# Configuración de APIs

## Descripción

El dashboard utiliza dos APIs principales para traer contenido real:

### 1. New York Times API (Noticias)

Proporciona artículos de noticias reales en inglés.

**Configuración:**

1. Ve a: https://developer.nytimes.com
2. Crea una cuenta (es gratuita)
3. Solicita una API Key para "Top Stories API"
4. Abre el archivo `src/js/dashboard.js`
5. Busca la línea: `NYT_API_KEY: 'demokey'`
6. Reemplaza `'demokey'` con tu API Key real

**Ejemplo:**

```javascript
NYT_API_KEY: "tu-api-key-aqui";
```

**Categorías disponibles:**

- world (Mundo)
- business (Negocios)
- technology (Tecnología)
- science (Ciencia)
- sports (Deportes)

---

### 2. Free Dictionary API (Diccionario)

Proporciona definiciones, pronunciaciones y ejemplos de palabras.

**Características:**

- ✅ Completamente GRATUITA
- ✅ No requiere API Key
- ✅ Ya está integrada

**Funcionalidad:**

- Busca palabras mientras escribes
- Obtiene definiciones reales
- Muestra pronunciación
- Permite guardar palabras

---

## Cómo Funciona

### Sin configurar API Key

Si no configuras la API Key de NYT:

- ✅ El dashboard mostrará datos de ejemplo
- ✅ El diccionario funcionará normalmente
- ✅ No habrá errores

### Con API Key configurada

- ✅ Verás noticias REALES del New York Times
- ✅ Noticias actualizadas diariamente
- ✅ Múltiples categorías disponibles
- ✅ Dificultad estimada automáticamente

---

## Notas Importantes

1. **API Key Gratis:**
   - NYT ofrece 4,000 requests/mes (suficiente para desarrollo)
   - No se requiere tarjeta de crédito

2. **Seguridad:**
   - En producción, mantén la API Key en el servidor, no en el cliente
   - Considera usar un proxy para ocultar la clave

3. **Fallback:**
   - Si la API falla, la app automáticamente usa datos de ejemplo
   - Así el usuario siempre ve contenido

4. **Dictionary API:**
   - Completamente gratuita
   - Sin límites de requests
   - Búsqueda rápida y en tiempo real

---

## Prueba Rápida

Después de configurar:

1. Abre http://localhost:3000/src/pages/dashboard.html
2. Las noticias deberían cargar automáticamente
3. Prueba buscar una palabra en "Mi Vocabulario"
4. Haz clic en "Escuchar" para oír la pronunciación

¡Listo! 🎉
