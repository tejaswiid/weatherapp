function handleFormSubmit(event) {
  event.preventDefault();

  const locationInput = document.getElementById("locationInput");
  const location = locationInput.value;

  fetchWeatherData(location);
}

function fetchWeatherData(location) {
  const apiKey = "53d9d4c7bd2e4db38c3122822230707"; // Replace with your actual WeatherAPI.com API key

  const endpoint = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;

  fetch(endpoint)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      updateWeatherDisplay(data);
    })
    .catch((error) => {
      console.error(error);
      // Display error message in the UI
      updateWeatherDisplay({ error: "Unable to fetch weather data" });
    });
}

function updateWeatherDisplay(data) {
  const weatherDisplay = document.getElementById("weatherDisplay");
  weatherDisplay.innerHTML = "";

  if (data.error) {
    const errorElement = document.createElement("p");
    errorElement.textContent = data.error;
    weatherDisplay.appendChild(errorElement);
  } else {
    const locationElement = document.createElement("h2");
    locationElement.textContent = `Weather in ${data.location.name}:`;
    weatherDisplay.appendChild(locationElement);

    const temperatureElement = document.createElement("p");
    temperatureElement.textContent = `Temperature: ${data.current.temp_c}°C`;
    weatherDisplay.appendChild(temperatureElement);

    const humidityElement = document.createElement("p");
    humidityElement.textContent = `Humidity: ${data.current.humidity}%`;
    weatherDisplay.appendChild(humidityElement);

    const conditionElement = document.createElement("p");
    conditionElement.textContent = `Condition: ${data.current.condition.text}`;
    weatherDisplay.appendChild(conditionElement);
  }
}

const locationForm = document.getElementById("locationForm");
locationForm.addEventListener("submit", handleFormSubmit);
