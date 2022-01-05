var userSearch = document.querySelector('#userSearch');
var cityID = document.querySelector('#search1');

var cityPull =document.querySelector('#cityName');
var temp = document.querySelector('#cityTemp');
var wind = document.querySelector('#cityWind');
var humidity = document.querySelector("#cityHumidity");
var uv = document.querySelector("#cityUV");
var date = document.querySelector("#cityDate");
var daycal = document.querySelector("#days")


var formSubmit = function (event) {
     event.preventDefault();
   
    var city = cityID.value.trim();
  
    if (city) {
      getWeatherData(city);
  
      cityPull.textContent = '';
      temp.textContent = '';
      wind.textContent = '';
      humidity.textContent='';
      uv.textContent='';

    } else {
      alert('Please enter a valid City');
    }
  };
 
  var getWeatherData = function (place) {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + place + '&units=imperial&appid=9d7377a1c955d3d598aa67ce107897de';
  
    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
          
            var citySearched = data.city.name
           cityPull.textContent=citySearched;
            newPull(data);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
        alert('Unable to connect to OpenWeather');
        
      });
  };

  var newPull = function (pre) {
      var lat = pre.city.coord.lat;
      var long = pre.city.coord.lon;
      var newApi = 'https://api.openweathermap.org/data/2.5/onecall?lat=' +lat+ '&lon='+long+'&exclude=minutely,hourly,alerts&units=imperial&appid=9d7377a1c955d3d598aa67ce107897de';
     
      fetch(newApi)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            displayRepos(data);
            displayFiveDay(data);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
        alert('Unable to connect to OpenWeather');
        
      });
};

  var displayRepos = function (data) {
   console.log(data);
    var timedate = data.current.dt;
    var s = new Date(timedate*1000).toLocaleDateString("en-US")
    console.log(s)
    date.textContent= s

   var tempSearched =data.current.temp;
   temp.textContent="Temperature: " +tempSearched + "°F";

   var windSearched =data.current.wind_speed;
   wind.textContent="Wind speed: " +windSearched+ " MPH";

   var humiditySearched = data.current.humidity;
   humidity.textContent="Humidity: " +humiditySearched + "%";

   var uvSearched= data.current.uvi;
   uv.textContent="UV Index: " + uvSearched;
  };


  var displayFiveDay = function (data) {
    for (let i = 1; i < 6; i++) {
      var dayblock= document.createElement("div");

      var dayday = data.daily[i].dt;
      var dayDate = new Date(dayday*1000).toLocaleDateString("en-US");
      var daycard = document.createElement("h5");
      daycard.textContent= dayDate;
      dayblock.append(daycard);

      var dailytemp = data.daily[i].temp.day
      var daytemp =document.createElement("h5");
      daytemp.textContent="Temperature: " + dailytemp + "°F";
      dayblock.append(daytemp);

      var dailywind = data.daily[i].wind_speed
      var daywind =document.createElement("h5");
      daywind.textContent="Wind speed: " + dailywind + "MPH";
      dayblock.append(daywind);

      var dailyhumid = data.daily[i].humidity;
      var dayhumid =document.createElement("h5");
      dayhumid.textContent="Humidity: " + dailyhumid + "%";
      dayblock.append(dayhumid);

      daycal.append(dayblock);
    }
  };





userSearch.addEventListener('submit', formSubmit);
