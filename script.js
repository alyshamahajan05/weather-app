function getWeather() {
    const apikey = 'bbc1d3746612c8297ee24628f9435663';
    const city = document.getElementById('city').value;
    if (!city) {
        alert('Please enter a city');
        return;
    }
    const cuWeatherurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const forecasturl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}`;

    fetch(cuWeatherurl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching the current weather data', error);
            alert('Error fetching current weather data. Please try again');
        });
    fetch(forecasturl)
        .then(response => response.json())
        .then(data => {
            displayHourlyForecast(data.list);
        })
        .catch(error => {
            console.error('Error fetching the Hourly forecast data', error);
            alert('Error fetching Hourly forecast data. Please try again');
        });
}

function displayWeather(data) {
    const tempdivinfo = document.getElementById('temp-div');
    const weatherinfodiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyforecastdiv = document.getElementById('hourly-forecast');

    weatherinfodiv.innerHTML = '';
    hourlyforecastdiv.innerHTML = '';
    tempdivinfo.innerHTML = '';
    
    if(data.cod === '404') {
        weatherinfodiv.innerHTML = `<p>${data.message}</p>`;
    } else {
        const cityName = data.name;
        const temp = Math.round(data.main.temp - 273.15);
        const description = data.weather[0].description;
        const iconcode = data.weather[0].icon;
        const iconurl = `https://openweathermap.org/img/wn/${iconcode}@4x.png`;

        const tempHTML = `<p>${temp}°C</p>`;

        const weatherHtml = `<p>${cityName}</p><p>${description}</p>`;
        
        tempdivinfo.innerHTML = tempHTML;
        weatherinfodiv.innerHTML = weatherHtml;
        weatherIcon.src = iconurl;
        weatherIcon.alt = description;

        showImage();
    } 
}

function displayHourlyForecast(hourlydata) {
    const hourlyForecastdiv = document.getElementById('hourly-forecast');
    const next24hours = hourlydata.slice(0, 8); // time shown in 3 hour intervals

    next24hours.forEach(item => {
        const datetime = new Date(item.dt * 1000);
        const hour = datetime.getHours();
        const temp = Math.round(item.main.temp - 273.15);
        const iconcode = item.weather[0].icon;
        const iconurl = `https://openweathermap.org/img/wn/${iconcode}.png`;

        const hourlyitemhtml = `
        <div class="hourly-item">
            <span>${hour}:00</span>
            <img src="${iconurl}" alt="hourly weather icon">
            <span>${temp}°C</span>
        </div>`;
        
        hourlyForecastdiv.innerHTML += hourlyitemhtml;
    });
}

function showImage() {
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block'; 
}

