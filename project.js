function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednsday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];
  return `${day} ${hours}:${minutes}`;
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

function showTemperature(response) {
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#icon").setAttribute =
    ("src", `http://openweathermap.org/img/wn/01d@2x.png`);
}

function search(city) {
  let apiKey = "c2a98dac7a66049f64b0810dd03180a2";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function currentLocation(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "c2a98dac7a66049f64b0810dd03180a2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function retrivePosition(event) {
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(currentLocation);
}

let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", retrivePosition);

function searchCity(event) {
  event.preventDefault();
  let enterCity = document.querySelector("#enter-city");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = `${enterCity.value}`;
  search(enterCity.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);
