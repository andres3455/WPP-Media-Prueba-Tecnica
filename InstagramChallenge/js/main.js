// === MÉTRICAS DEL CARRUSEL ===

// Contadores globales
let clicksFlechaIzq = 0;
let clicksFlechaDer = 0;
const clicksImagen = {};

// Seleccionar controles
const flechas = document.querySelectorAll('.slide-control');

// Seleccionar todas las imágenes dentro del carrusel
const imagenes = document.querySelectorAll('.slide-item a img');

// --- CONTAR CLICS EN FLECHAS ---
flechas.forEach(flecha => {
  flecha.addEventListener('click', () => {
    if (flecha.classList.contains('prev')) {
      clicksFlechaIzq++;
      console.log(`⬅️ Flecha Izquierda: ${clicksFlechaIzq} clics`);
    } else if (flecha.classList.contains('next')) {
      clicksFlechaDer++;
      console.log(`➡️ Flecha Derecha: ${clicksFlechaDer} clics`);
    }
  });
});

// --- CONTAR CLICS EN IMÁGENES ---
imagenes.forEach((img, index) => {
  clicksImagen[index + 1] = 0; // Inicializar contador
  img.addEventListener('click', () => {
    clicksImagen[index + 1]++;
    console.log(`🖼️ Imagen ${index + 1}: ${clicksImagen[index + 1]} clics`);
  });
});

