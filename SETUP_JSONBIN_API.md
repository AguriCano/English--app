## 🚀 INSTRUCCIONES: Usar JSONBin.io para Speaking Practice API

### Paso 1: Crear cuenta en JSONBin.io

1. Ve a https://jsonbin.io/
2. Haz clic en "Register" o "Create Account"
3. Crea una cuenta gratuita
4. Verifica tu email

### Paso 2: Crear los 5 conjuntos de palabras

**Conjunto 1 - Pronouns (Palabras 1-5)**

````
Ir a https://jsonbin.io/ → Create
Named: "english-words-set-1"
Paste este JSON:
```json
{
  "words": [
    {
      "id": 1,
      "word": "Somewhere",
      "phonetic": "/ˈsʌm.weər/",
      "icon": "map",
      "color": "orange"
    },
    {
      "id": 2,
      "word": "Nobody",
      "phonetic": "/ˈnoʊ.bə.di/",
      "icon": "person",
      "color": "pink"
    },
    {
      "id": 3,
      "word": "Everybody",
      "phonetic": "/ˈev.ri.bɑ.di/",
      "icon": "people",
      "color": "green"
    },
    {
      "id": 4,
      "word": "Someone",
      "phonetic": "/ˈsʌm.wʌn/",
      "icon": "user",
      "color": "blue"
    },
    {
      "id": 5,
      "word": "Anything",
      "phonetic": "/ˈen.i.θɪŋ/",
      "icon": "cube",
      "color": "purple"
    }
  ]
}
````

**Paso 3: Hacer público**

- Click en "Publish"
- Copia el BIN ID (ej: "67b4c8c7acd3cb34a857f6c2")
- URL para consumir será: `https://api.jsonbin.io/v3/b/{BIN_ID}/latest`

**Paso 4: Repetir para los 5 conjuntos**

Crea 4 bins más con datos diferentes:

**Set 2 - Adjectives:**

```json
{
  "words": [
    {
      "id": 6,
      "word": "Beautiful",
      "phonetic": "/ˈbjuː.tə.fəl/",
      "icon": "map",
      "color": "orange"
    },
    {
      "id": 7,
      "word": "Wonderful",
      "phonetic": "/ˈwʌn.der.fəl/",
      "icon": "person",
      "color": "pink"
    },
    {
      "id": 8,
      "word": "Interesting",
      "phonetic": "/ˈɪn.tər.ə.stɪŋ/",
      "icon": "people",
      "color": "green"
    },
    {
      "id": 9,
      "word": "Dangerous",
      "phonetic": "/ˈdeɪn.dʒər.əs/",
      "icon": "user",
      "color": "blue"
    },
    {
      "id": 10,
      "word": "Different",
      "phonetic": "/ˈdɪf.ər.ənt/",
      "icon": "cube",
      "color": "purple"
    }
  ]
}
```

**Set 3 - Adverbs:**

```json
{
  "words": [
    {
      "id": 11,
      "word": "Tomorrow",
      "phonetic": "/təˈmɑr.oʊ/",
      "icon": "map",
      "color": "orange"
    },
    {
      "id": 12,
      "word": "Yesterday",
      "phonetic": "/ˈjes.tər.deɪ/",
      "icon": "person",
      "color": "pink"
    },
    {
      "id": 13,
      "word": "Always",
      "phonetic": "/ˈɔl.weɪz/",
      "icon": "people",
      "color": "green"
    },
    {
      "id": 14,
      "word": "Never",
      "phonetic": "/ˈnev.ər/",
      "icon": "user",
      "color": "blue"
    },
    {
      "id": 15,
      "word": "Sometimes",
      "phonetic": "/ˈsʌm.taɪmz/",
      "icon": "cube",
      "color": "purple"
    }
  ]
}
```

**Set 4 - Emotions:**

```json
{
  "words": [
    {
      "id": 16,
      "word": "Excellent",
      "phonetic": "/ˈek.səl.ənt/",
      "icon": "map",
      "color": "orange"
    },
    {
      "id": 17,
      "word": "Terrible",
      "phonetic": "/ˈter.ə.bəl/",
      "icon": "person",
      "color": "pink"
    },
    {
      "id": 18,
      "word": "Amazing",
      "phonetic": "/əˈmeɪ.zɪŋ/",
      "icon": "people",
      "color": "green"
    },
    {
      "id": 19,
      "word": "Boring",
      "phonetic": "/ˈbɔr.ɪŋ/",
      "icon": "user",
      "color": "blue"
    },
    {
      "id": 20,
      "word": "Exciting",
      "phonetic": "/ɪkˈsaɪ.tɪŋ/",
      "icon": "cube",
      "color": "purple"
    }
  ]
}
```

**Set 5 - Feelings:**

```json
{
  "words": [
    {
      "id": 21,
      "word": "Happy",
      "phonetic": "/ˈhæp.i/",
      "icon": "map",
      "color": "orange"
    },
    {
      "id": 22,
      "word": "Sad",
      "phonetic": "/sæd/",
      "icon": "person",
      "color": "pink"
    },
    {
      "id": 23,
      "word": "Angry",
      "phonetic": "/ˈæŋ.ɡri/",
      "icon": "people",
      "color": "green"
    },
    {
      "id": 24,
      "word": "Confused",
      "phonetic": "/kənˈfjuzd/",
      "icon": "user",
      "color": "blue"
    },
    {
      "id": 25,
      "word": "Surprised",
      "phonetic": "/sərˈpraɪzd/",
      "icon": "cube",
      "color": "purple"
    }
  ]
}
```

### Paso 5: Actualizar URLs en el código

Después de crear todos los bins, actualiza el array `API_URLS` en el archivo `speaking-practice.js`:

```javascript
const API_URLS = [
  "https://api.jsonbin.io/v3/b/YOUR_BIN_ID_1/latest",
  "https://api.jsonbin.io/v3/b/YOUR_BIN_ID_2/latest",
  "https://api.jsonbin.io/v3/b/YOUR_BIN_ID_3/latest",
  "https://api.jsonbin.io/v3/b/YOUR_BIN_ID_4/latest",
  "https://api.jsonbin.io/v3/b/YOUR_BIN_ID_5/latest",
];
```

### Paso 6: ¡Listo!

Ahora al:
✅ Cargar el dashboard → consumirá Set 1 desde JSONBin
✅ Hacer click en "Aprende otras 5 palabras" → rotará al Set 2, 3, 4, 5 y vuelve a 1
✅ Cada petición es en tiempo real desde la API online

### 🔧 Alternativa: Usar MockAPI (más fácil)

Si prefieres algo más simple sin registrarse:

1. Ve a https://mockapi.io/
2. Crea un proyecto
3. Crea 5 endpoints con los datos
4. Obtén las URLs públicas
5. Actualiza el array `API_URLS`

### 📝 Notas:

- JSONBin ofrece 120 requests/día gratis (suficiente para desarrollo)
- Las URLs deben ser **públicas** para que funcionen desde el navegador
- Si quieres sincronizacion en tiempo real, usa Firebase en su lugar
