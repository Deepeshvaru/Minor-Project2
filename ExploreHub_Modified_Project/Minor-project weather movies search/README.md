# ExploreHub — Weather and Movie Search

This is a small website built with regular HTML, CSS and JavaScript. It has a home page, a weather lookup, a movie search, an about page and a contact-form demo.

## Run the website

1. Extract the project ZIP.
2. Open the `minor-project` folder in Visual Studio Code.
3. If you do not have it already, install the **Live Server** extension.
4. Right-click `index.html` and select **Open with Live Server**.
5. Open the Weather or Movies page from the navigation.

Use Live Server instead of opening the HTML file directly. The JavaScript files use ES modules, which work best from a local web server.

## Connect the weather API

1. Visit https://openweathermap.org/api and create an account.
2. Create an API key from your OpenWeather account.
3. Open `js/config.js` in VS Code.
4. Replace `YOUR_OPENWEATHER_API_KEY` with the key you received. Keep the quotation marks.
5. Save the file, reload the site, open Weather, enter a city and press **Search Weather**.

The weather request is made in `js/weather.js` using OpenWeather's current-weather endpoint. It asks for metric units, so temperatures are shown in Celsius and wind speed in metres per second. A newly created key may take a little while to start working.

## Connect the movie API

1. Visit https://www.omdbapi.com/apikey.aspx.
2. Request an API key and follow the activation instructions in the email, if required.
3. In `js/config.js`, replace `YOUR_OMDB_API_KEY` with your OMDb key. Keep the quotation marks.
4. Save the file, reload the site, open Movies and search for a title such as `Inception`.

The search request is made in `js/movies.js`. OMDb supplies the matching titles, years and poster links; the code also requests each film's details to show its IMDb rating.

## A few common problems

- **It says to add an API key:** check that you replaced the right placeholder in `js/config.js` and saved the file.
- **Invalid API key / 401 response:** check the key and make sure the provider has activated it.
- **City not found:** check the spelling, or try adding the country code (for example, `Pune,IN`).
- **No movie results:** try a shorter or more exact title.
- **Network error:** check your internet connection and try again later.

## Project files

- `index.html` — home page
- `weather.html` — weather search page
- `movies.html` — movie search page
- `about.html` — project overview
- `contact.html` — demo contact form
- `style.css` — colours, layout, mobile styling and other visual rules
- `js/app.js` — mobile menu and footer year
- `js/weather.js` — weather API request and result display
- `js/movies.js` — movie API requests and result cards
- `js/contact.js` — contact form demo behaviour
- `js/config.js` — API key placeholders

## Before publishing

The browser must be able to read these API keys, so keys stored in `js/config.js` are visible to visitors. For a classroom demonstration this is a common simple setup, but do not commit a private or paid key to a public repository. A public production site should call the APIs through a backend and keep keys on the server.

The contact form only validates the fields and shows a message in the browser. It does not send or store the message because this project does not have a backend.
