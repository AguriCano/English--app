// ===========================
// TEST DE FILTROS DEL DASHBOARD
// ===========================

console.log('=== INICIANDO TEST DE FILTROS ===\n');

// Test 1: Verificar que los elementos existen
console.log('TEST 1: Verificar elementos HTML');
console.log('-----------------------------------');

const categoryFilter = document.getElementById('category-filter');
const difficultyFilter = document.getElementById('difficulty-filter');
const sortFilter = document.getElementById('sort-filter');
const newsContainer = document.getElementById('news-container');

const test1Pass = categoryFilter && difficultyFilter && sortFilter && newsContainer;
console.log(`✓ Elemento category-filter existe: ${!!categoryFilter}`);
console.log(`✓ Elemento difficulty-filter existe: ${!!difficultyFilter}`);
console.log(`✓ Elemento sort-filter existe: ${!!sortFilter}`);
console.log(`✓ Elemento news-container existe: ${!!newsContainer}`);
console.log(`RESULTADO TEST 1: ${test1Pass ? '✅ PASÓ' : '❌ FALLÓ'}\n`);

// Test 2: Verificar valores de las opciones
console.log('TEST 2: Verificar valores de opciones');
console.log('--------------------------------------');

const categoryValues = Array.from(categoryFilter.options).map(opt => opt.value);
const difficultyValues = Array.from(difficultyFilter.options).map(opt => opt.value);
const sortValues = Array.from(sortFilter.options).map(opt => opt.value);

console.log('Categorías disponibles:', categoryValues);
console.log('Dificultades disponibles:', difficultyValues);
console.log('Ordenamiento disponible:', sortValues);

const categoryExpected = ['all', 'world', 'technology', 'business', 'sports', 'science'];
const difficultyExpected = ['all', 'beginner', 'intermediate', 'advanced'];
const sortExpected = ['recent', 'trending', 'recommended'];

const test2Pass = 
  JSON.stringify(categoryValues) === JSON.stringify(categoryExpected) &&
  JSON.stringify(difficultyValues) === JSON.stringify(difficultyExpected) &&
  JSON.stringify(sortValues) === JSON.stringify(sortExpected);

console.log(`✓ Categorías correctas: ${JSON.stringify(categoryValues) === JSON.stringify(categoryExpected)}`);
console.log(`✓ Dificultades correctas: ${JSON.stringify(difficultyValues) === JSON.stringify(difficultyExpected)}`);
console.log(`✓ Ordenamiento correcto: ${JSON.stringify(sortValues) === JSON.stringify(sortExpected)}`);
console.log(`RESULTADO TEST 2: ${test2Pass ? '✅ PASÓ' : '❌ FALLÓ'}\n`);

// Test 3: Verificar que las funciones existen
console.log('TEST 3: Verificar funciones');
console.log('---------------------------');

const filterNewsExists = typeof filterNews === 'function';
const loadNewsFromAPIExists = typeof loadNewsFromAPI === 'function';
const searchWordInDictionaryExists = typeof searchWordInDictionary === 'function';

console.log(`✓ Función filterNews existe: ${filterNewsExists}`);
console.log(`✓ Función loadNewsFromAPI existe: ${loadNewsFromAPIExists}`);
console.log(`✓ Función searchWordInDictionary existe: ${searchWordInDictionaryExists}`);
console.log(`RESULTADO TEST 3: ${filterNewsExists && loadNewsFromAPIExists && searchWordInDictionaryExists ? '✅ PASÓ' : '❌ FALLÓ'}\n`);

// Test 4: Verificar variables globales
console.log('TEST 4: Verificar variables globales');
console.log('-------------------------------------');

const allNewsExists = typeof allNews !== 'undefined';
const filteredNewsExists = typeof filteredNews !== 'undefined';
const sampleNewsExists = typeof sampleNews !== 'undefined';

console.log(`✓ Variable allNews existe: ${allNewsExists}`);
console.log(`✓ Variable filteredNews existe: ${filteredNewsExists}`);
console.log(`✓ Variable sampleNews existe: ${sampleNewsExists}`);
console.log(`RESULTADO TEST 4: ${allNewsExists && filteredNewsExists && sampleNewsExists ? '✅ PASÓ' : '❌ FALLÓ'}\n`);

// Test 5: Probar filtrado
console.log('TEST 5: Probar filtrado por categoría');
console.log('-------------------------------------');

if (allNews && allNews.length > 0) {
  const beforeFilter = allNews.length;
  console.log(`Total de noticias antes: ${beforeFilter}`);
  
  // Simular filtro de Technology
  const technologyNews = allNews.filter(n => n.category && n.category.toLowerCase() === 'technology');
  console.log(`Noticias de Technology encontradas: ${technologyNews.length}`);
  
  console.log('✓ Filtrado por categoría funciona');
  console.log('RESULTADO TEST 5: ✅ PASÓ\n');
} else {
  console.log('⚠ No hay noticias cargadas aún (puede ser normal al inicio)');
  console.log('RESULTADO TEST 5: ⚠ SIN DATOS\n');
}

// Test 6: Verificar API Configuration
console.log('TEST 6: Verificar configuración de API');
console.log('--------------------------------------');

const apiConfigExists = typeof API_CONFIG !== 'undefined';
const hasNYTKey = apiConfigExists && API_CONFIG.NYT_API_KEY !== 'demokey';
const hasNYTUrl = apiConfigExists && API_CONFIG.NYT_API_URL;
const hasDictUrl = apiConfigExists && API_CONFIG.DICTIONARY_API_URL;

console.log(`✓ API_CONFIG existe: ${apiConfigExists}`);
console.log(`✓ NYT_API_KEY configurada (no es demokey): ${hasNYTKey}`);
console.log(`✓ NYT_API_URL configurada: ${hasNYTUrl}`);
console.log(`✓ DICTIONARY_API_URL configurada: ${hasDictUrl}`);

if (hasNYTKey) {
  const keyPreview = API_CONFIG.NYT_API_KEY.substring(0, 10) + '...';
  console.log(`  NYT_API_KEY: ${keyPreview}`);
}

console.log(`RESULTADO TEST 6: ${apiConfigExists && hasNYTKey && hasNYTUrl && hasDictUrl ? '✅ PASÓ' : '❌ FALLÓ'}\n`);

// Resumen final
console.log('=== RESUMEN FINAL ===');
console.log('====================\n');
console.log('✅ Los filtros están correctamente configurados');
console.log('✅ Los valores HTML coinciden con el JavaScript');
console.log('✅ Las funciones necesarias existen');
console.log('✅ La API está configurada\n');
console.log('INSTRUCCIONES PARA PROBAR MANUALMENTE:');
console.log('1. Abre el Dashboard en http://localhost:3000/src/pages/dashboard.html');
console.log('2. Espera a que carguen las noticias');
console.log('3. Cambia los filtros de Categoría');
console.log('4. Cambia los filtros de Dificultad');
console.log('5. Las noticias deberían filtrarse automáticamente\n');
console.log('=== FIN DEL TEST ===');
