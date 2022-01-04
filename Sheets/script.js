var userSearch = document.querySelector('#userSearch');
var cityID = document.querySelector('#search1');

var cityPull =document.querySelector('#cityName');
var temp = document.querySelector('#cityTemp');
var wind = document.querySelector('#cityWind');
var humidity = document.querySelector("#cityHumidity");
var uv = document.querySelector("#cityUV");



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
          console.log(response);
          console.log(apiUrl);
        if (response.ok) {
          response.json().then(function (data) {
            displayRepos(data);
            console.log(data);
            console.log(data.list);
            console.log(data.city.country);
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
   var citySearched = data.city.name
   cityPull.textContent=citySearched

   var tempSearched =data.list[0].main.temp;
   cityTemp.textContent="Temperature: " +tempSearched + "°F";

    // for (var i = 0; i < repos.length; i++) {
    //   var repoName = repos[i].owner.login + '/' + repos[i].name;
  
    //   var repoEl = document.createElement('div');
    //   repoEl.classList = 'list-item flex-row justify-space-between align-center';
  
    //   var titleEl = document.createElement('span');
    //   titleEl.textContent = repoName;
  
    //   repoEl.appendChild(titleEl);
  
    //   var statusEl = document.createElement('span');
    //   statusEl.classList = 'flex-row align-center';
  
    //   if (repos[i].open_issues_count > 0) {
    //     statusEl.innerHTML =
    //       "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + ' issue(s)';
    //   } else {
    //     statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    //   }
  
    //   repoEl.appendChild(statusEl);
  
    //   repoContainerEl.appendChild(repoEl);
    
  };






userSearch.addEventListener('submit', formSubmit);