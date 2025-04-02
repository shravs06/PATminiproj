// API Key and Base URL
const apiKey = /6"f8b54bd997777701b2d10ebdda298a11"; // Your API Key
const baseUrl = "https://api.openweathermap.org/data/2.5/";

// Get Current Weather
function getCurrentWeather() {
    const city = document.getElementById("city").value;
    if (city === "") {
        alert("Please enter a city name! 🌆");
        return;
    }

    const url = `${baseUrl}weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found!");
            }
            return response.json();
        })
        .then(data => {
            displayCurrentWeather(data);
        })
        .catch(error => {
            alert("Error: " + error.message);
        });
}

// Display Current Weather
function displayCurrentWeather(data) {
    const weatherInfo = document.getElementById("weather-info");
    weatherInfo.innerHTML = `
        <div class="weather-item"><strong>City:</strong> ${data.name}</div>
        <div class="weather-item"><strong>Temperature:</strong> ${Math.round(data.main.temp)}°C</div>
        <div class="weather-item"><strong>Weather:</strong> ${data.weather[0].description}</div>
        <div class="weather-item"><strong>Humidity:</strong> ${data.main.humidity}%</div>
    `;
    weatherInfo.classList.remove("hidden");
}

// Get 5-Day Forecast
function getFiveDayForecast() {
    const city = document.getElementById("city").value;
    if (city === "") {
        alert("Please enter a city name! 🌆");
        return;
    }

    const url = `${baseUrl}forecast?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found!");
            }
            return response.json();
        })
        .then(data => {
            displayForecast(data);
        })
        .catch(error => {
            alert("Error: " + error.message);
        });
}

// Display 5-Day Forecast in Cards
function displayForecast(data) {
    const forecastContainer = document.getElementById("forecast-info");
    forecastContainer.innerHTML = ""; // Clear previous data
    forecastContainer.classList.remove("hidden");

    // Get data every 8th index (24 hours interval)
    const forecasts = data.list.filter((item, index) => index % 8 === 0);

    forecasts.forEach(item => {
        const date = new Date(item.dt * 1000).toLocaleDateString("en-US", {
            weekday: "long",
            month: "short",
            day: "numeric"
        });

        const temp = Math.round(item.main.temp);
        const desc = item.weather[0].description;
        const icon = item.weather[0].icon;

        // Create forecast card
        const forecastCard = `
            <div class="forecast-item">
                <strong>${date}</strong>
                <img src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">
                <p>${desc}</p>
                <p><strong>${temp}°C</strong></p>
            </div>
        `;
        forecastContainer.innerHTML += forecastCard;
    });
}
