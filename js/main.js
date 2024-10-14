var searchInput = document.querySelector(".search-input");
var weatherData;
 /// functions
 async function getData(key) {
    var response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=8ce6c084ae874b1dba8102406241410&q=${key}&days=3`)
     var finaldata = await response.json()
   return finaldata
}
 async function startData(key) {
    weatherData = await getData(key);
    console.log(weatherData)
    todayData();
    tommorrowdata();
    aftertommorrow();
} 
function todayData() {
    let date = new Date(weatherData.location.localtime);
    document.querySelector(".day").innerHTML = date.toLocaleDateString("en-us" , {weekday: 'long'});
    document.querySelector(".dayofmounth").innerHTML = date.toLocaleDateString("en-us" , {day: '2-digit'});
    document.querySelector(".mounth").innerHTML = date.toLocaleDateString("en-us" , {month: 'long'});
    document.querySelector(".city").innerHTML = weatherData.location.country;
    document.querySelector(".temp").innerHTML = weatherData.current.temp_c+'°C';
    document.getElementById("temp-image").setAttribute('src' ,'https:'+ weatherData.current.condition.icon );
    document.querySelector(" .forecoast-status .main").innerHTML = weatherData.current.condition.text;
    document.querySelector(".humidity").innerHTML= weatherData.current.wind_mph+'%';
    document.querySelector(".winds").innerHTML= weatherData.current.wind_kph+'kh/h';
    document.querySelector(".weatherTrend").innerHTML= weatherData.current.wind_dir;
}
function tommorrowdata() {
    let date = new Date(weatherData.forecast.forecastday[1].date);
    document.querySelector(".tommorrowday").innerHTML = date.toLocaleDateString("en-us" , {weekday: 'long'});
    document.querySelector(".degree .tommorrow-img").setAttribute('src' , 'https:'+weatherData.forecast.forecastday[1].day.condition.icon )
    document.querySelector(".max").innerHTML = weatherData.forecast.forecastday[1].day.maxtemp_c+ "°C";
    document.querySelector(".min").innerHTML = weatherData.forecast.forecastday[1].day.mintemp_c+ "°C";
    document.querySelector(".weather-condition-tommorrow").innerHTML = weatherData.forecast.forecastday[1].day.condition.text;
}
function aftertommorrow() {
    let date = new Date(weatherData.forecast.forecastday[2].date);
    document.querySelector(".aftertommorrowday").innerHTML = date.toLocaleDateString("en-us" , {weekday: 'long'});
document.querySelector(".aftertommorrow-img").setAttribute("src" , 'https:'+weatherData.forecast.forecastday[2].day.condition.icon )
document.querySelector(".max-after").innerHTML = weatherData.forecast.forecastday[2].day.maxtemp_c+ "°C";
document.querySelector(".min-after").innerHTML = weatherData.forecast.forecastday[2].day.mintemp_c+ "°C";
document.querySelector(".weather-condition-aftertommorrow").innerHTML = weatherData.forecast.forecastday[1].day.condition.text;
}
//// Events
searchInput.addEventListener("keyup", function() {
    startData(searchInput.value);
    todayData()
})