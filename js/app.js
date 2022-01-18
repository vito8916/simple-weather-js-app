const getWeather = () => {
    try {
        const appId = "91c8ebf618d75be40d6267c0497f3a4e";

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (possition) => {
                let lat = possition.coords.latitude;
                let long = possition.coords.longitude;

                const respuesta = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${appId}&units=metric`
                );

                // Si la respuesta es correcta
                if (respuesta.status === 200) {
                    const data = await respuesta.json();

                    console.log(data);

                    let iconName = "";
                    switch (data.weather[0].main) {
                        case "Clouds":
                            if (data.weather[0].icon.includes("n")) {
                                iconName = "cloudy-night-1";
                            }
                            if (data.weather[0].icon.includes("d")) {
                                iconName = "cloudy-day-1";
                            }
                            break;
                        case "Clear":
                            if (data.weather[0].icon.includes("n")) {
                                iconName = "night";
                            }
                            if (data.weather[0].icon.includes("d")) {
                                iconName = "day";
                            }
                            break;
                        case "Rain":
                            if (data.weather[0].icon.includes("n")) {
                                iconName = "rainy-7";
                            }
                            if (data.weather[0].icon.includes("d")) {
                                iconName = "rainy-3";
                            }
                            break;
                    }

                    const content = document.getElementById("weather-content");
                    const loader = document.getElementById("loader");

                    var wDate = new Date(+data.dt * 1000).toLocaleDateString(
                        "en-US"
                    );
                    const weekday = [
                        "Sunday",
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                    ];

                    const d = new Date();
                    let day = weekday[d.getDay()];

                    loader.style.opacity = 0;

                    content.innerHTML = `<div class="weather-wrapper">
                        <div class="weather-card">
                            <div class="weather-icon">
                                <img
                                    class="icon"
                                    /* src="weather-icons/animated/${iconName}.svg" */
                                    alt=""
                                />
                            </div>
                            <div class="weather-info">
                                <h5 id="temp" class="temp">${Math.round(
                                    data.main.temp
                                )}<span class="unit">°C</span></h5>
                                <h2 class="info">
                                    <span id="weather-description" class="description">
                                        ${data.weather[0].description}
                                    </span>
                                    <p id="weather-day" class="day">${day} <span id="weather-date" class="date">${wDate}</span></p>
                                    <span id="weather-city-name" class="location">
                                        ${data.name + ", " + data.sys.country}
                                    </span>
                                </h2>
                            </div>
                        </div>
                        <div class="weather-card">
                            <ul class="weather-more-info">
                                <li class="info-item">
                                    <div class="icon">
                                        <i class="wi wi-thermometer-internal"></i>
                                        feels like:
                                    </div>
                                    <p class="info-item-title"> ${Math.round(
                                        data.main.feels_like
                                    )}°</p>
                                </li>
                                <li class="info-item">
                                    <div class="icon">
                                        <i class="wi wi-strong-wind"></i>
                                        wind:
                                    </div>
                                    <p class="info-item-title">${Math.round(
                                        data.wind.speed * 10
                                    )} km/h</p>
                                </li>
                                <li class="info-item">
                                    <div class="icon">
                                        <i class="wi wi-humidity"></i>
                                        humidity: 
                                    </div>
                                    <p class="info-item-title">${
                                        data.main.humidity
                                    }%</p>
                                </li>
                                <li class="info-item">
                                    <div class="icon">
                                        <i class="wi wi-night-sleet"></i>
                                        visibility: 
                                    </div>
                                    <p class="info-item-title">${
                                        data.visibility / 1000
                                    } km</p>
                                </li>
                                <li class="info-item">
                                    <div class="icon">
                                        <i class="wi wi-thermometer-exterior"></i>
                                        min: 
                                    </div>
                                    <p class="info-item-title">${
                                        data.main.temp_min
                                    }°</p>
                                </li>
                                <li class="info-item">
                                    <div class="icon">
                                        <i class="wi wi-thermometer"></i>
                                        max: 
                                    </div>
                                    <p class="info-item-title">${
                                        data.main.temp_max
                                    }°</p>
                                </li>
                            </ul>
                        </div>
                    </div>`;
                } else if (respuesta.status === 401) {
                    console.log("Pusiste la llave mal");
                } else if (respuesta.status === 404) {
                    console.log("La pelicula que buscas no existe");
                } else {
                    console.log("Hubo un error y no sabemos que paso");
                }
            });
        }
    } catch (error) {
        console.log(error);
    }
};

window.addEventListener("load", () => {
    getWeather();
});
