const ENDPOINT = "http://127.0.0.1:8080/api/banner";

// Función que carga un banner y lo muestra
async function loadBanner() {
  try {
    const response = await fetch(ENDPOINT);
    if (!response.ok) throw new Error("No se pudo obtener el banner");
    const data = await response.json();

    // Asignar datos al HTML
    document.getElementById("banner-title").textContent = data.title;
    document.getElementById("banner-desc").textContent = data.description;
    document.getElementById("banner-cta").textContent = data.cta;

    // Acción del botón
    document.getElementById("banner-cta").onclick = () => {
      window.open(data.imageUrl, "_blank");
    };

  } catch (error) {
    console.error("❌ Error al cargar banner:", error);
    document.getElementById("banner-title").textContent = "Error al cargar el anuncio";
    document.getElementById("banner-desc").textContent = "Error al cargar descripción";
  }
}


loadBanner(); // Carga inicial
setInterval(loadBanner, 10000); // Cada 10 segundos
