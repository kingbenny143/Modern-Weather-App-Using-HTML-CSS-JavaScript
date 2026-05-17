const input = document.querySelector("#cityInput");

const button = document.querySelector("#searchBtn");

const weatherBox = document.querySelector("#weatherBox");

button.addEventListener("click", async () => {
    try{
        const cityName = input.value.trim();
        if(!cityName){
            alert("Please enter a city name.");
            return;
        }
        const apiUrl =`https://api.weatherapi.com/v1/current.json?key=06f8f321501e40819c754535261605&q=${cityName}`;
        
        weatherBox.innerHTML = "<h4>Loading...</h4>";
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        console.log(data);

        if(!response.ok){
            weatherBox.innerHTML = `<h4>City not found. Please enter a valid city name.</h4>`;
            return;
        }

        weatherBox.innerHTML =`
        <h2>${data.location.country}</h2>
        <h2>${data.location.name}</h2>
        <p>${data.current.temp_c}°C</p>
        <p>${data.current.humidity}% Humidity</p>
        <p>${data.current.condition.text}</p>
        `;
        input.value = "";
    }
    catch(error){
        console.log("error",error);
        weatherBox.innerHTML = `<h4>Unable to fetch weather data. Please try again.</h4>`;
    }
});