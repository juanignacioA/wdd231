const apiKey = '8e652ebc795121f4a30b91c990877340';
const lat = -33.3768; 
const lon = -58.2167; 
const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

export async function getWeatherData() {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('API Error');
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error("Weather error:", error);
    }
}

function displayWeather(data) {
    const current = data.list[0];
    const weatherContainer = document.querySelector('#current-weather');
    
    weatherContainer.innerHTML = `
        <p><strong>Temperature:</strong> ${current.main.temp.toFixed(0)}°C</p>
        <p><strong>Feels like:</strong> ${current.main.feels_like.toFixed(0)}°C</p>
        <p><strong>Humidity:</strong> ${current.main.humidity}%</p>
        <p><strong>Condition:</strong> ${current.weather[0].description}</p>
        <img src="https://openweathermap.org/img/w/${current.weather[0].icon}.png" alt="Weather icon">
    `;

    const forecastContainer = document.querySelector('#three-day-forecast');
    
    const forecastDays = [data.list[8], data.list[16], data.list[24]];
    
    forecastContainer.innerHTML = forecastDays.map((day, index) => {
        const date = new Date(day.dt_txt);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
        
        return `
            <div class="forecast-item">
                <p><strong>${dayName}:</strong> ${day.main.temp.toFixed(0)}°C</p>
            </div>
        `;
    }).join('');
}

getWeatherData();