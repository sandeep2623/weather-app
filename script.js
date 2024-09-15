const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherbox = document.querySelector('.weather-box');
const weatherdetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityhide = document.querySelector('.city-hide');

search.addEventListener("click", () => {
    var city = document.querySelector('.search-box input').value;
    const url = `https://open-weather13.p.rapidapi.com/city/${city}/EN`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'cdbcbe8be3msh7f5646c8e943b9bp12195cjsn97163b5960e0',
            'x-rapidapi-host': 'open-weather13.p.rapidapi.com'
        }
    };

    if (city == '')
        return;

    fetch(url, options).then(response => response.json()).then(json => {
        if (json.cod == '404') {
            cityhide.textContent = city;
            container.style.height = '400px';
            weatherbox.classList.remove('active');
            weatherdetails.classList.remove('active');
            error404.classList.add('active');
            return;
        }



        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        if (cityhide.textContent == city) {
            return;
        }
        else {
            cityhide.textContent = city;
            container.style.height = '555px';
            weatherbox.classList.add('active');
            container.classList.add('active');
            weatherdetails.classList.add('active');
            error404.classList.remove('active');

            setTimeout(() => {
                container.classList.remove('active');
            }, 2500);
            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png'
                    break;
                case 'Rain':
                    image.src = 'images/rain.png'
                    break;
                case 'Snow':
                    image.src = 'images/snow.png'
                    break;
                case 'Clouds':
                    image.src = 'images/cloud.png'
                    break;
                case 'Mist':
                    image.src = 'images/mist.png'
                    break;
                case 'Haze':
                    image.src = 'images/mist.png'
                    break;
                default:
                    image.src = 'images/cloud.png';
            }
            let fahrenheit = parseFloat(json.main.temp);
            let celsius = (fahrenheit - 32) * 5 / 9;

            // Displaying the temperature in Celsius with HTML
            temperature.innerHTML = `${parseInt(celsius)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
        
            const infoweather = document.querySelector('.info-weather');
            const infohumidity = document.querySelector('.info-humidity');
            const infowind = document.querySelector('.info-wind');
            

            const elcloneinfoweather = infoweather.cloneNode(true);
            const elcloneinfohumidity = infohumidity.cloneNode(true);
            const elcloneinfowind = infowind.cloneNode(true);
            
            elcloneinfoweather.id = 'clone-info-weather';
            elcloneinfoweather.classList.add('active-clone'); 

            elcloneinfohumidity.id = 'clone-info-humidity';
            elcloneinfohumidity.classList.add('active-clone');  

            elcloneinfowind.id = 'clone-info-wind';
            elcloneinfowind.classList.add('active-clone');  

            setTimeout(() => {
               infoweather.insertAdjacentElement("afterend",elcloneinfoweather) ;
               infohumidity.insertAdjacentElement("afterend",elcloneinfohumidity) ;
               infowind.insertAdjacentElement("afterend",elcloneinfowind) ;
            }, 2200);

            const cloneinfoweather = document.querySelectorAll(".info-weather.active-clone");
            const totalcloneinfoweather = cloneinfoweather.length;
            const cloneinfoweatherfirst = cloneinfoweather[0];

            const cloneinfohumidity = document.querySelectorAll(".info-humidity.active-clone");
            const cloneinfohumidityfirst = cloneinfohumidity[0];

            const cloneinfowind = document.querySelectorAll(".info-wind.active-clone");
            const cloneinfowindfirst = cloneinfowind[0];

            if(totalcloneinfoweather >0){
                cloneinfoweatherfirst.classList.remove('active-clone');
                cloneinfohumidityfirst.classList.remove('active-clone');
                cloneinfowindfirst.classList.remove('active-clone');
                
                setTimeout(() => {
                    cloneinfoweatherfirst.remove();
                    cloneinfohumidityfirst.remove();
                    cloneinfowindfirst.remove();
                }, 2200);
            }
        }

    });
});




