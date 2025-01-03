const button = document.getElementById('search');
const inputElement = document.getElementById('input');
const apiKey = '78361993f527c60d8284d9de41e26c3a';

const cityName = document.querySelector('.cityName');
const countryName = document.querySelector('.countryName');
const temperature = document.querySelector('.temperature');
const weatherType = document.querySelector('.weatherType');
const humidityCheck = document.querySelector('.humidity');
const pressureCheck = document.querySelector('.pressure');
const visibilityCheck = document.querySelector('.visibility');
const windSpeed = document.querySelector('.windSpeed');
const weatherIcon = document.querySelector('.weatherIcon');

// Input validation
button.onclick = async () => {
    const city = inputElement.value.trim();
    if (city === '') {
        Swal.fire('Oops...', 'Please Enter City Name!', 'error');
    } else {
        await fetchWeather(city);
        inputElement.value = '';
    }
};

// Enter Key Press Event
inputElement.addEventListener('keypress', async (event) => {
    if (event.key === 'Enter') {
        const city = inputElement.value.trim();
        if (city === '') {
            Swal.fire('Oops...', 'Please Enter City Name!', 'error');
        } else {
            await fetchWeather(city);
            inputElement.value = '';
        }
    }
});

// Weather Icon
const getIcon = (id) => {
    if (id <= 232) return 'thunderstorm.svg';
    if (id <= 321) return 'drizzle.svg';
    if (id <= 531) return 'rain.svg';
    if (id <= 622) return 'snow.svg';
    if (id <= 781) return 'atmosphere.svg';
    if (id === 800) return 'clear.svg';
    return 'clouds.svg';
};

// Fetch Data 
const fetchWeather = async (city) => {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const response = await fetch(url);
        const weatherData = await response.json();
        if (weatherData.cod === '404') {
            Swal.fire('Oops...', 'City Not Found!', 'error');
        } else {
            displayWeatherData(weatherData);
        }
    } catch (error) {

    }
};

// Display Weather Data
const displayWeatherData = (weatherData) => {
    const {
        name,
        main: { temp, humidity, pressure },
        visibility,
        sys: { country },
        wind: { speed },
        weather: [{ id, main }],
    } = weatherData;

    cityName.innerHTML = `${name}`;
    countryName.innerHTML = `${country}`;
    temperature.innerHTML = `${Math.round(temp)}°C`;
    weatherType.innerHTML = `${main}`;
    humidityCheck.innerHTML = `${humidity}%`;
    pressureCheck.innerHTML = `${pressure} hPa`;
    visibilityCheck.innerHTML = `${visibility / 1000} km`;
    windSpeed.innerHTML = `${speed} m/s`;
    weatherIcon.src = `assets/weather/${getIcon(id)}`;
};

// Fetch Coordinates
const Coordinates = async (lat, lon) => {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        const response = await fetch(url);
        const weatherData = await response.json();
        displayWeatherData(weatherData);
    } catch (error) {
        Swal.fire('Oops...', 'Failed to Fetch Data!', 'error');
    }
};

// Get Location

const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                await Coordinates(latitude, longitude);
            }

        );
    } else {
        Swal.fire('Oops...', 'Geolocation is not supported by your browser!', 'error');
    }
};

window.onload = getLocation;
