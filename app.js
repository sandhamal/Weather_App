
///////////////////////////  CurrentWeather //////////////////////////////////////////////

const apikey = "a8dbb6ed25c85e011a361708789a08fd";

window.addEventListener("load", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            let lon = position.coords.longitude;
            let lat = position.coords.latitude;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&` +
                `lon=${lon}&appid=${apikey}`;

            fetch(url).then((res) => {
                return res.json();
            }).then((data) => {
                console.log(data);
                console.log(new Date().getTime())
                var dat = new Date(data.dt)
                console.log(dat.toLocaleString(undefined, 'Asia/Kolkata'))
                console.log(new Date().getMinutes())
                weatherReport(data);
            })
        })
    }
})







function searchByCity() {
    var place = document.getElementById('input').value;

    var urlsearch = `https://api.openweathermap.org/data/2.5/weather?q=${place}&` + `appid=${apikey}`;

    fetch(urlsearch).then((res) => {
        return res.json();
    }).then((data) => {
        console.log(data);
        weatherReport(data);
    })
    document.getElementById('input').value = '';




    $.ajax({
        method: "GET",
        url: " https://api.weatherapi.com/v1/current.json?key=a393728118084352b3571035231005&q=" + place,
        success: (resp) => {
            console.log("Latitude : ", resp.location.lat);
            console.log("Longitude : ", resp.location.lon);
            setLocationInMap(resp.location.lat, resp.location.lon);
        }

    });

}








function weatherReport(data) {

    var urlcast = `https://api.openweathermap.org/data/2.5/forecast?q=${data.name}&` + `appid=${apikey}`;


    fetch(urlcast).then((res) => {
        return res.json();
    }).then((forecast) => {
        console.log(forecast.city);
        hourForecast(forecast);

        dayForecast(forecast)

        console.log(data);
        document.getElementById('city').innerText = data.name + ', ' + data.sys.country;
        console.log(data.name, data.sys.country);

        console.log(Math.floor(data.main.temp - 273));
        document.getElementById('temperature').innerText = Math.floor(data.main.temp - 273) + ' °C';

        document.getElementById('clouds').innerText = data.weather[0].description;
        console.log(data.weather[0].description)

        let icon1 = data.weather[0].icon;
        let iconurl = "https://api.openweathermap.org/img/w/" + icon1 + ".png";
        document.getElementById('img').src = iconurl



        document.getElementById("humidity").innerText = data.main.humidity + " %";
        document.getElementById("wind").innerText = data.wind.speed + " km/h";

    })

}

function hourForecast(forecast) {
    document.querySelector('.templist').innerHTML = ''
    for (let i = 0; i < 5; i++) {

        var date = new Date(forecast.list[i].dt * 1000)
        console.log((date.toLocaleTimeString(undefined, 'Asia/Kolkata')).replace(':00', ''))

        let hourR = document.createElement('div');
        hourR.setAttribute('class', 'next');

        let div = document.createElement('div');
        let time = document.createElement('p');
        time.setAttribute('class', 'time')
        time.innerText = (date.toLocaleTimeString(undefined, 'Asia/Kolkata')).replace(':00', '');

        let temp = document.createElement('p');
        temp.innerText = Math.floor((forecast.list[i].main.temp_max - 273)) + ' °C' + ' / ' + Math.floor((forecast.list[i].main.temp_min - 273)) + ' °C';

        div.appendChild(time)
        div.appendChild(temp)

        let desc = document.createElement('p');
        desc.setAttribute('class', 'desc')
        desc.innerText = forecast.list[i].weather[0].description;

        hourR.appendChild(div);
        hourR.appendChild(desc)
        document.querySelector('.templist').appendChild(hourR);
    }
}

function dayForecast(forecast) {
    document.querySelector('.weekF').innerHTML = ''
    for (let i = 8; i < forecast.list.length; i += 8) {
        console.log(forecast.list[i]);
        let div = document.createElement('div');
        div.setAttribute('class', 'dayF');

        let day = document.createElement('p');
        day.setAttribute('class', 'date')
        day.innerText = new Date(forecast.list[i].dt * 1000).toDateString(undefined, 'Asia/Kolkata');
        div.appendChild(day);

        let temp = document.createElement('p');
        temp.innerText = Math.floor((forecast.list[i].main.temp_max - 273)) + ' °C' + ' / ' + Math.floor((forecast.list[i].main.temp_min - 273)) + ' °C';
        div.appendChild(temp)

        let description = document.createElement('p');
        description.setAttribute('class', 'desc')
        description.innerText = forecast.list[i].weather[0].description;
        div.appendChild(description);

        document.querySelector('.weekF').appendChild(div)
    }
}

/////////////////////////////////////////////////////////////////////////////Historial qata/////////////////////////////////////////////////////////////////////////////////////////


const searchBox = document.querySelector(".search");
const searchBtn = document.querySelector(".btn");
const imgBox = document.querySelector(".img");
const submitBtn = document.querySelector(".subButton");

let city = "kandy";

const apiKey = "1258b95ec12041c5856171928231505";

const historyUrl =
    "https://api.weatherapi.com/v1/history.json?key=1258b95ec12041c5856171928231505&q=";




submitBtn.addEventListener("click", (event) => {

    const selectDate = document.getElementById("dob").value;
    console.log("Date", selectDate);
    getHistoryData(city, selectDate);
});

async function getHistoryData() {

    let city = document.querySelector(".searchcity");
    let selectDate = document.getElementById("dob").value
    console.log(selectDate); // 6/17/2022

    try {
        console.log("in history", city, selectDate);

        const resHistory = await fetch(
            historyUrl + city + "&dt=" + selectDate.toString()
        );
        const historyData = await resHistory.json();

        console.log(historyData);
        console.log(historyData.forecast.forecastday[0].date);

        document.querySelector(".dateHistory").innerText =
            historyData.forecast.forecastday[0].date;
        document.querySelector(".tempHistory").innerText = Math.round(
            historyData.forecast.forecastday[0].day.avgtemp_c
        );
        document.querySelector(".maxtempHistory").innerText = Math.round(
            historyData.forecast.forecastday[0].day.maxtemp_c
        );
        document.querySelector(".mintempHistory").innerText = Math.round(
            historyData.forecast.forecastday[0].day.mintemp_c
        );
        document.querySelector(".humHistory").innerText = Math.round(
            historyData.forecast.forecastday[0].day.avghumidity
        );
        document.querySelector(".imgHistory").src =
            historyData.forecast.forecastday[0].day.condition.icon;
        document.querySelector(".conHistory").innerText =
            historyData.forecast.forecastday[0].day.condition.text;
        document.querySelector(".riseHistory").innerText =
            historyData.forecast.forecastday[0].astro.sunrise;
        document.querySelector(".setHistory").innerText =
            historyData.forecast.forecastday[0].astro.sunset;

        li.classList.remove("hidden");
        document.querySelector(".historyError").style.display = "none";
    } catch (error) {
        li.classList.add("hidden");
        document.querySelector(".historyError").style.display = "block";
        console.log("Historical data: ", error);
    }
}


/////////////////////////////////////////////////////////////////////////////////////////////////

const locationName = $("#locationName");


const successCallBack = (position) => {
    console.log(position);
    setLocationInMap(position.coords.latitude, position.coords.longitude);
    getWeatherForecast(position.coords.latitude, position.coords.longitude)
};

const errorCallBack = (error) => {
    console.log(error);
}

getLocation();

function getLocation() {
    navigator.geolocation.getCurrentPosition(successCallBack, errorCallBack);
}




var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const marker = L.marker([0, 0]).addTo(map);

function setLocationInMap(lng, ltd) {

    marker.setLatLng([lng, ltd]).update();
    map.setView([lng, ltd], 15);
}
























