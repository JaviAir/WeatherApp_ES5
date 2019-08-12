

searchButton.addEventListener('click', searchWeather);

function searchWeather() {
    loadingText.style.display = 'block';
    weatherBox.style.display = 'none';

    let cityName = searchCity.value;
    if (cityName.trim().length === 0) {
        return alert('Please enter a city name');
    }
    let http = new XMLHttpRequest();
    let apiKey = '8fa75fdfa6f0f8bba3a2439f243777c1';
    let url = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=metric&APPID=' + apiKey;
    let method = 'GET';

    http.open(method, url);
    http.onreadystatechange = () => {
        if (http.readyState === XMLHttpRequest.DONE && http.status === 200) {
            let data = JSON.parse(http.responseText);
            let weatherData = new Weather(cityName, data.weather[0].description.toUpperCase());
            weatherData.temperature = data.main.temp;
            updateWeather(weatherData);
        } else if (http.readyState === XMLHttpRequest.DONE && http.status !== 200) {
            console.log('Error!!');
        }
    }
    http.send();
}


function updateWeather(weatherData) {
    weatherCity.textContent = weatherData.cityName;
    weatherDescription.textContent = weatherData.description;
    weatherTemperature.textContent = weatherData.temperature;

    loadingText.style.display = 'none';
    weatherBox.style.display = 'block';
}
