import { OMDB_API_KEY } from "./config.js";

const form = document.querySelector("#movie-form");
const movieInput = document.querySelector("#movie-input");
const status = document.querySelector("#movie-status");
const results = document.querySelector("#movie-results");

const showStatus = (message, isError = false) => {
  status.textContent = message;
  status.classList.toggle("error", isError);
};

const searchMovies = async (title) => {
  if (!OMDB_API_KEY || OMDB_API_KEY === "YOUR_OMDB_API_KEY") {
    showStatus("Add your OMDb API key in js/config.js, save the file, and search again.", true);
    return;
  }

  showStatus("Searching movies…");
  results.replaceChildren();

  try {
    const url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(title)}&type=movie`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("The movie service is not responding. Try again later.");

    const data = await response.json();
    if (data.Response === "False") {
      throw new Error(data.Error || "No movies found.");
    }

    const movies = data.Search ?? [];
    const cards = await Promise.all(movies.map(async (movie) => {
      let rating = "Not available";
      try {
        const detailResponse = await fetch(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${movie.imdbID}`);
        const detail = await detailResponse.json();
        if (detail.imdbRating && detail.imdbRating !== "N/A") rating = `★ ${detail.imdbRating}/10`;
      } catch {
        // Keep the search result visible even if an individual rating cannot load.
      }

      const card = document.createElement("article");
      card.className = "movie-card";
      const poster = movie.Poster && movie.Poster !== "N/A" ? movie.Poster : "";
      const posterWrap = document.createElement("div");
      posterWrap.className = "poster-wrap";

      if (poster) {
        const image = document.createElement("img");
        image.src = poster;
        image.alt = `Poster for ${movie.Title}`;
        image.loading = "lazy";
        posterWrap.append(image);
      } else {
        const placeholder = document.createElement("div");
        placeholder.className = "poster-placeholder";
        placeholder.textContent = "No poster available";
        posterWrap.append(placeholder);
      }

      const info = document.createElement("div");
      info.className = "movie-info";
      info.innerHTML = '<h3></h3><p class="movie-meta"></p><p class="movie-rating"></p>';
      info.querySelector("h3").textContent = movie.Title;
      card.append(posterWrap, info);
      card.querySelector(".movie-meta").textContent = `Released: ${movie.Year}`;
      card.querySelector(".movie-rating").textContent = rating;
      return card;
    }));

    results.replaceChildren(...cards);
    showStatus(`Showing ${movies.length} results for “${title}”.`);
  } catch (error) {
    showStatus(error.message === "Failed to fetch"
      ? "Could not reach the movie service. Check your internet connection and try again."
      : error.message, true);
  }
};

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = movieInput.value.trim();
  if (title) searchMovies(title);
});
