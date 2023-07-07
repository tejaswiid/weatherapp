document
  .getElementById("locationForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    var location = document.getElementById("locationInput").value;
    fetchWeatherData(location);
  });

function fetchWeatherData(location) {
  var apiKey = "53d9d4c7bd2e4db38c3122822230707"; // Replace with your actual WeatherAPI.com API key

  var endpoint =
    "https://api.weatherapi.com/v1/current.json?key=" +
    apiKey +
    "&q=" +
    location;

  fetch(endpoint)
    .then(function (response) {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(function (data) {
      updateWeatherDisplay(data);
    })
    .catch(function (error) {
      console.error(error);
      // Display error message in the UI
      updateWeatherDisplay({ error: "Unable to fetch weather data" });
    });
}

function updateWeatherDisplay(data) {
  var weatherDisplay = document.getElementById("weatherDisplay");

  if (data.error) {
    weatherDisplay.innerHTML =
      '<p class="error-message">' + data.error + "</p>";
    return;
  }

  var location = data.location.name + ", " + data.location.country;
  var temperature = data.current.temp_c + "°C";
  var condition = data.current.condition.text;

  var html = "<h2>" + location + "</h2>";
  html += "<p>Temperature: " + temperature + "</p>";
  html += "<p>Condition: " + condition + "</p>";

  weatherDisplay.innerHTML = html;
}
