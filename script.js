const apiKey = '2ea28c7f84734464ba362533250406'; // Your WeatherAPI.com key

document.getElementById('getWeather').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value.trim();
    const weatherDisplay = document.getElementById('weatherDisplay');
    if (!city) {
        weatherDisplay.innerHTML = "<p>Please enter a city name!</p>";
        return;
    }

    weatherDisplay.innerHTML = "<p>Loading...</p>";

    // Build the API URL
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}&aqi=yes`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                weatherDisplay.innerHTML = `<p>${data.error.message}</p>`;
                return;
            }
            const temp = data.current.temp_c;
            const cityName = data.location.name;
            weatherDisplay.innerHTML = `
                <h2>${cityName}</h2>
                <p><strong>Temperature:</strong> ${temp}°C</p>
            `;
        })
        .catch(error => {
            weatherDisplay.innerHTML = `<p>Error fetching data. Please try again later.</p>`;
        });
});
