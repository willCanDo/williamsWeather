//Get the elements

const cityInput = document.querySelector('.search-form');
const city = document.querySelector('.city');
const temp = document.querySelector('.temp');
const condition = document.querySelector('.condition');

const updateUI = (cityWeather, cityName) => {
    city.textContent = cityName;
    temp.textContent = parseInt(cityWeather.Temperature.Metric.Value);
    condition.textContent = cityWeather.WeatherText;
}

// Get the city id using the user input
const getCity = (userCity) => {
    const req = new XMLHttpRequest();
    const url =`https://dataservice.accuweather.com/locations/v1/cities/search`;
    const key ='Fn23UAkiBA4U1GChDj4iQzD5lLWRtGGx';
    const query = `?apikey=${key}&q=${userCity}`;

    req.addEventListener('readystatechange', () => {
        if(req.readyState === 4 && req.status === 200) {
            const data = JSON.parse(req.responseText);
            
            console.log(data[0]);

            const cityKey = data[0].Key;
            const cityName = data[0].EnglishName;

            getWeather(cityKey, cityName); 

        } else if (req.readyState === 4){
            console.log('Request did not work!');
            
        }
    });
    
req.open('GET', url + query);
req.send();
}

const getWeather = (cityKey, cityName) => {
   const req = new XMLHttpRequest();
   const url = "https://dataservice.accuweather.com/currentconditions/v1/";
   const key = 'Fn23UAkiBA4U1GChDj4iQzD5lLWRtGGx';
   const query = `${cityKey}?apikey=${key}`;

   req.addEventListener('readystatechange', () => {
    if(req.readyState === 4 && req.status === 200){
        const data = JSON.parse(req.responseText);

        updateUI(data[0], cityName);

    } else if (req.readyState === 4 ){
        console.log('Data not found.');
    }
   });
   req.open('GET', url + query);
   req.send();
}

cityInput.addEventListener('submit', (e) => {
    // this prevents submissions to a form or backend
    e.preventDefault();

    //Get city from user
    const userCity = cityInput.city.value.trim();

    //Reset the input
    cityInput.reset();

    getCity(userCity);

    //Hide mobile keyboard
    cityInput.city.blur();
});
