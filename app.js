const button = document.getElementById('search');
const inputElement = document.getElementById('input');
const apiKey = '78361993f527c60d8284d9de41e26c3a';

button.onclick = async () => {
    const city = inputElement.value.trim();
    if (city === '') {
        Swal.fire('Oops...', 'Please Enter City Name!', 'error');  // SweetAlert
    } else {
        await weather(city); 
        inputElement.value = '';
    }
};


inputElement.addEventListener('keypress', async (event) => {
    if (event.key === 'Enter') {
        const city = inputElement.value.trim();
        if (city === '') {
            Swal.fire('Oops...', 'Please Enter City Name!', 'error');  // SweetAlert
        } else {
            await weather(city);  
            inputElement.value = '';
        }
    }
});

const fetchData = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(url);
    return response.json();
};


const weather = async (city) => {
    const weatherData = await fetchData(city);
    console.log(weatherData); 
};


