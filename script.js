const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {
    const APIKey = '43915eda4bba8dfbe6da3a7fb58509cc';
    const city = document.querySelector('.search-box input').value;

    if (city == '') {
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                error404.classList.add('active');
                return;
            }
            
            container.style.height = '555px';
            weatherBox.classList.add('active');
            weatherDetails.classList.add('active');
            error404.classList.remove('active');
            





            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');
            

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = '/animated/day.svg';
                    break;
                case 'Rain':
                    image.src = '/animated/rainy-7.svg';
                    break;
                case 'Snow':
                    image.src = '/animated/snowy-6.svg';
                    break;
                case 'Clouds':
                    image.src = '/animated/cloudy-day-1.svg';
                    break;
                case 'Mist':
                    image.src = '/animated/cloudy.svg';
                    break;
                case 'Haze':
                    image.src = '/animated/cloudy-night-3.svg';
                    break;
                default:
                    image.src = '/animated/cloudy-day-2.svg';
            }


            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)} Km/h`;
            

        })
        
});
