
const API_KEY = "d7f239a8a0831d485d04c19291790934";

// Lista de banners con su ciudad
const banners = [
  { id: "banner-bogota", city: "Bogota" },
  { id: "banner-medellin", city: "Medellin" },
  { id: "banner-zipaquira", city: "Zipaquira" },
  { id: "banner-Barranquilla", city: "Barranquilla" }
];

// Función que obtiene el clima de una ciudad
async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},CO&units=metric&lang=es&appid=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Error al obtener datos de ${city}`);
  return await res.json();
}

// Función que actualiza el contenido del banner
function updateBanner(bannerEl, data) {
  const tempEl = bannerEl.querySelector(".temp");
  const condEl = bannerEl.querySelector(".condition");
  const main = data.weather[0].main.toLowerCase();

  // Asignar datos
  tempEl.textContent = `${Math.round(data.main.temp)}°C`;
  condEl.textContent = data.weather[0].description;

  // Cambiar color según condición
  bannerEl.classList.remove("sunny", "clouds", "rain");
  if (main.includes("cloud")) bannerEl.classList.add("clouds");
  else if (main.includes("rain")) bannerEl.classList.add("rain");
  else bannerEl.classList.add("sunny");
}

// Cargar clima de cada banner
banners.forEach(async ({ id, city }) => {
  const el = document.getElementById(id);
  try {
    const weather = await getWeather(city);
    updateBanner(el, weather);
  } catch (err) {
    console.error(err);
    el.querySelector(".condition").textContent = "No disponible";
  }
});
