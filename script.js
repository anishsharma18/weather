

// const cityIn = document.getElementById("input-city");
// const cityName = document.getElementById("city-name");
// const countryName = document.getElementById("country-name");
// const icon = document.getElementById("icon-name");
// const temperature = document.getElementById("temperature-name");
// const submitBtn = document.getElementById("submit");

// const apiKey = "843c9e3ef714ac768db970ce82031c16";
 

// submitBtn.addEventListener("click",function(){
//     let city = cityIn.value;
//     let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=843c9e3ef714ac768db970ce82031c16`;

//     fetch(apiUrl)
//   .then(response => {
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
    
//     return response.json();
//   })
//   .then(data => {
//     console.log(data);
//     addcity(data);
//     addcountry(data);
//     addicon(data);
//     addtemp(data);
//   })
//   .catch(error => {
//     console.error('Fetch error:', error);
//   });

// });
// fetch(apiUrl)
//     .then(respose =>{ Response.json()})
//     .then(data=>{

//     })

// function addcity(data){
//     cityName.innerHTML = data.name;
// }

// function addcountry(data){
//     countryName.innerHTML = data.sys.country;
// }

// function addicon(data){
//     let iconid = data.weather[0].icon;
//     console.log(iconid)
//     let iconlink = `https://openweathermap.org/img/wn/${iconid}@2x.png`;
//     console.log(iconlink)
//     icon.src=iconlink;
// }

// function addtemp(data){
    // let kelvin = data.main.temp;

    // temperature.innerHTML = kelvin - 273.15
// }



`https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}`

const grantAccess = document.getElementById("grant-access");
const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const userTab = document.getElementById("user-tab");
const searchTab = document.getElementById("search-tab");

//location
const locationContent = document.getElementById("permission");

//form
const formContent = document.getElementById("form-containt")

//loader
const loader = document.getElementById("loading-container");

//display element
const searchWeather = document.getElementById("search-weather");
const cityName = document.getElementById("city-name");
const countryImg = document.getElementById("country-img");
const weatherMain = document.getElementById("weather-main");
const weatherIcon = document.getElementById("weather-icon");
const temperature = document.getElementById("temperature");
const windSpeed = document.getElementById("wind-speed");
const humidityVal = document.getElementById("humidity");
const cloudVal = document.getElementById("cloud");

//error page
const errorPage = document.getElementById("error")
const erroMessage = document.getElementById("error message");

const apiKey = "843c9e3ef714ac768db970ce82031c16";


// function checkGeolocationPermission() {
//     navigator.permissions.query({ name: 'geolocation' })
//       .then(permissionStatus => {
//         if (permissionStatus.state === 'granted') {
//           // Geolocation permission is already granted
//           getUserLocation();
//         } else if (permissionStatus.state === 'prompt') {
//             loader.style.display = "none";
//             locationContent.style.display = "flex";
//             formContent.style.display = "none";
//             searchWeather.style.display = "none";
//         }
//         else {
//           // Geolocation permission is not granted, you might want to request it
//             loader.style.display = "none";
//             locationContent.style.display = "flex";
//             formContent.style.display = "none";
//             searchWeather.style.display = "none";
//         }
//       })
//       .catch(error => {
//         console.error('Error checking geolocation permission:', error);
//       });
//   }



// //by clicking enter
// cityInput.addEventListener('keyup', function(event) {
//     if (event.key === 'Enter') {
//         let city = cityInput.value;
    
//         if (city.trim() !== '') {
//             let apiCity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
//             cityInput.value="";
//             requestData(apiCity);
//         }
        
//         else{
//             alert('Please enter a valid city name.');
//             return;
//         }
//     }
// });
    

function displayErrorpage(message){
    erroMessage.innerHTML = message;
    errorPage.style.display = "flex";
    loader.style.display = "none";
    locationContent.style.display = "none";
    formContent.style.display = "none";
    searchWeather.style.display = "none";
}

function showLoader() {
    loader.style.display = "flex";
    locationContent.style.display = "none";
    formContent.style.display = "none";
    searchWeather.style.display = "none";
    errorPage.style.display = "none";
}

function hideLoader() {
    loader.style.display = "none";
}

function displayWeather(data){
    showLoader();
        cityName.innerHTML = data.name;

        let countryCode=data.sys.country
        countryImg.src = `https://flagsapi.com/${countryCode}/flat/64.png`

        weatherMain.innerHTML = data.weather[0].main;

        let iconid = data.weather[0].icon;
        let iconlink = `https://openweathermap.org/img/wn/${iconid}@2x.png`;
        weatherIcon.src = iconlink;

        let temp = (data.main.temp - 273.15).toFixed(2);
        temperature.innerHTML = `${temp} °C`;

        windSpeed.innerHTML = `${data.wind.speed}m/s`;

        humidityVal.innerHTML = `${data.main.humidity}%`;

        cloudVal.innerHTML =  `${data.clouds.all}%`;
       
    hideLoader();
    locationContent.style.display = "none";
    formContent.style.display = "none";
    searchWeather.style.display = "flex";
}

function requestData(apiUrl){
    showLoader();
    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        return response.json();
    })
    .then(data => {
            displayWeather(data)
    })
    .catch(error => {
        hideLoader();
        let message = "city not found"
        displayErrorpage(message);
    });
}

function isValidString(input) {
    input  = input.trim();
    // Use a regular expression to check if the input contains only letters
    return /^[a-zA-Z]+$/.test(input);
}

//grant access using city name
searchBtn.addEventListener("click",function(){
    showLoader();
    let city = cityInput.value;
    
    if (isValidString(city)) {
        let apiCity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        cityInput.value="";
        requestData(apiCity);
    }
    
    else{
        hideLoader();
        displayErrorpage('Please enter a valid city name')
        return;
    }
   
});

// grant access using latitude and longitude

grantAccess.addEventListener("click",

function getUserLocation() {
    showLoader();
     if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          // Successfully retrieved the user's location

          const userCoordinates = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          };

          let apiLL = `https://api.openweathermap.org/data/2.5/weather?lat=${userCoordinates.lat}&lon=${userCoordinates.lon}&appid=${apiKey}`
          sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
          requestData(apiLL);

        },

        function(error) {
          // Handle errors
          if (error.code === error.PERMISSION_DENIED) {
            // User denied permission; provide information on managing permissions
            let tryAgain = confirm('You denied location access. Would you like to manage your permissions?');
            if (tryAgain) {
              // Redirect to browser settings
              window.location.href = 'chrome://settings/content/location';
            }
          } else {
            // Handle other errors
            hideLoader();
            displayErrorpage('Error getting location: ' + error.message);
          }
        }
      );
    } else {
      // Geolocation is not supported by the browser
        hideLoader();
      displayErrorpage('Geolocation is not supported by your browser.');
    }
});

function checkLocalCoordinates(){
    showLoader();
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if(localCoordinates!==null){
        const coordinates = JSON.parse(localCoordinates);
        let apiLL = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}`;
        requestData(apiLL);
    }
    else{
        hideLoader();
        return false;
    }
}

userTab.addEventListener("click",function(){

    userTab.classList.add("current-tab");
    searchTab.classList.remove("current-tab");

    if(checkLocalCoordinates()===false){

        loader.style.display = "none";
        locationContent.style.display = "flex";
        formContent.style.display = "none";
        searchWeather.style.display = "none";
    }
    
});

//for search option
searchTab.addEventListener("click",function(){
    userTab.classList.remove("current-tab");
    searchTab.classList.add("current-tab");

    loader.style.display = "none";
    locationContent.style.display = "none";
    formContent.style.display = "flex";
    searchWeather.style.display = "none";
});

// //event for web page loader
function showContent() {
  
    userTab.classList.add("current-tab");
     //checkGeolocationPermission();
    if(checkLocalCoordinates()===false){
        loader.style.display = "none";
        locationContent.style.display = "flex";
        formContent.style.display = "none";
        searchWeather.style.display = "none";
    }
    
  }
  
// Event listener to trigger showContent() when the website has loaded
  window.addEventListener('load', showContent);