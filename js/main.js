var searchInput = document.querySelector(".search-input");
var tempcontainer = document.querySelector(".temp-container")
var finaldata;
         /// functions
 async function getData(key) {
    var response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=8ce6c084ae874b1dba8102406241410&q=${key}&days=3`)
     finaldata = await response.json()
     todayData();
    tommorrowdata();
    aftertommorrow();
}
function todayData() {
    let date = new Date(finaldata.location.localtime);
    document.querySelector(".day").innerHTML = date.toLocaleDateString("en-us" , {weekday: 'long'});
    document.querySelector(".dayofmounth").innerHTML = date.toLocaleDateString("en-us" , {day: '2-digit'});
    document.querySelector(".mounth").innerHTML = date.toLocaleDateString("en-us" , {month: 'long'});
    document.querySelector(".city").innerHTML = finaldata.location.country;
    document.querySelector(".temp").innerHTML = finaldata.current.temp_c+'°C';
    document.getElementById("temp-image").setAttribute('src' ,'https:'+ finaldata.current.condition.icon );
    document.querySelector(" .forecoast-status .main").innerHTML = finaldata.current.condition.text;
    document.querySelector(".humidity").innerHTML= finaldata.current.wind_mph+'%';
    document.querySelector(".winds").innerHTML= finaldata.current.wind_kph+'kh/h';
    document.querySelector(".weatherTrend").innerHTML= finaldata.current.wind_dir;
}
function tommorrowdata() {
    let date = new Date(finaldata.forecast.forecastday[1].date);
    document.querySelector(".tommorrowday").innerHTML = date.toLocaleDateString("en-us" , {weekday: 'long'});
    document.querySelector(".degree .tommorrow-img").setAttribute('src' , 'https:'+finaldata.forecast.forecastday[1].day.condition.icon )
    document.querySelector(".max").innerHTML = finaldata.forecast.forecastday[1].day.maxtemp_c+ "°C";
    document.querySelector(".min-after").innerHTML = finaldata.forecast.forecastday[1].day.mintemp_c+ "°C";
    document.querySelector(".weather-condition-tommorrow").innerHTML = finaldata.forecast.forecastday[1].day.condition.text;
}
function aftertommorrow() {
    let date = new Date(finaldata.forecast.forecastday[2].date);
    document.querySelector(".aftertommorrowday").innerHTML = date.toLocaleDateString("en-us" , {weekday: 'long'});
document.querySelector(".aftertommorrow-img").setAttribute("src" , 'https:'+finaldata.forecast.forecastday[2].day.condition.icon )
document.querySelector(".max-after").innerHTML = finaldata.forecast.forecastday[2].day.maxtemp_c+ "°C";
document.querySelector(".min-aftertommorrow ").innerHTML = finaldata.forecast.forecastday[2].day.mintemp_c+ "°C";
document.querySelector(".weather-condition-aftertommorrow").innerHTML = finaldata.forecast.forecastday[1].day.condition.text;
}
           //// Events
searchInput.addEventListener("keyup", function() {
   if(searchInput.value.length > 3) {
    getData(searchInput.value);
   }
});