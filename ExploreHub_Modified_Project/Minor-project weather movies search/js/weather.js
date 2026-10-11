import { WEATHER_API_KEY } from "./config.js";

const form = document.querySelector("#weather-form");
const cityInput = document.querySelector("#city-input");
const status = document.querySelector("#weather-status");
const result = document.querySelector("#weather-result");

const showStatus = (message, isError = false) => {
  status.textContent = message;
  status.classList.toggle("error", isError);
};

const getWeather = async (city) => {
  if (!WEATHER_API_KEY || WEATHER_API_KEY === "YOUR_OPENWEATHER_API_KEY") {
    showStatus("Add your OpenWeather API key in js/config.js, save the file, and search again.", true);
    return;
  }

  showStatus("Loading current weather…");
  result.hidden = true;

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${WEATHER_API_KEY}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      const message = response.status === 404
        ? "City not found. Check the spelling and try again."
        : data.message || "The weather service could not complete the request.";
      throw new Error(message);
    }

    const { name, sys, main, wind, weather } = data;
    const condition = weather?.[0]?.description ?? "Conditions unavailable";
    const iconCode = weather?.[0]?.icon;
    const iconUrl = iconCode ? `https://openweathermap.org/img/wn/${iconCode}@2x.png` : "";

    result.innerHTML = `
      <div class="weather-top">
        <div><p class="eyebrow">CURRENT WEATHER</p><h2>${name}, ${sys.country}</h2><p class="condition">${condition}</p></div>
        ${iconUrl ? `<img class="weather-icon" src="${iconUrl}" alt="${condition}">` : ""}
      </div>
      <div class="temperature">${Math.round(main.temp)}<span>°C</span></div>
      <p class="feels-like">Feels like ${Math.round(main.feels_like)}°C</p>
      <div class="weather-stats">
        <div><span>Humidity</span><strong>${main.humidity}%</strong></div>
        <div><span>Wind speed</span><strong>${wind.speed} m/s</strong></div>
        <div><span>High / Low</span><strong>${Math.round(main.temp_max)}° / ${Math.round(main.temp_min)}°</strong></div>
      </div>`;
    result.hidden = false;
    showStatus(`Weather updated for ${name}.`);
  } catch (error) {
    showStatus(error.message === "Failed to fetch"
      ? "Could not reach the weather service. Check your internet connection and try again."
      : error.message.startsWith("City not found")
        ? error.message
        : `Unable to get weather: ${error.message}`, true);
  }
};

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const city = cityInput.value.trim();
  if (city) getWeather(city);
});
