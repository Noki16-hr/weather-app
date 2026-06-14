function changeCity(event) {
  event.preventDefault();

  let input = document.querySelector("#city-input");
  let city = input.value;

  searchCity(city);
}

function searchCity(city) {
  let apiKey = "oc0tb825b206594e16f09ec343af3b8b";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

let form = document.querySelector("#my-form");
form.addEventListener("submit", changeCity);

let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// Get values
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();

// Fix minutes (e.g. 5 → 05)
if (minutes < 10) {
  minutes = `0${minutes}`;
}

// Final format
let formatted = `${day} ${hours}:${minutes}`;

console.log(formatted);

let dateTimeElement = document.querySelector("#date-time");
dateTimeElement.innerHTML = formatted;

function displayTemperature(response) {
  console.log(response.data.condition);

  let heading = document.querySelector("#main-heading");
  let temperatureElement = document.querySelector("#temperature");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let conditionElement = document.querySelector("#condition");
  let iconElement = document.querySelector("#icon");

  heading.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  conditionElement.innerHTML = response.data.condition.description;

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;

  getForecast(response.data.city);
}

function getForecast(city) {
  let apiKey = "oc0tb825b206594e16f09ec343af3b8b";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);

  let forecast = document.querySelector("#forecast");

  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHTML = "";

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
  <div class="weather-forecast-day">
    <div class="weather-forecast-date">${day}</div>
    <div class="weather-forecast-icon">⛅️</div>
    <div class="weather-forecast-temperatures">
      <div class="weather-forecast-temperature">
        <strong>15°</strong>
      </div>
      <div class="weather-forecast-temperature">9°</div>
    </div>
  </div>
`;
  });
  forecast.innerHTML = forecastHTML;
}

searchCity("Paris");
