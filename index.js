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

let paragraph = document.querySelector(".current-weather p");

paragraph.innerHTML = `
<span id="date-time">${formatted}</span>,
<span id="condition">moderate rain</span><br />
Humidity: <strong id="humidity">87%</strong>,
Wind: <strong id="wind">7.2 km/h</strong>
`;

function displayTemperature(response) {
  console.log(response.data);
  let heading = document.querySelector("#main-heading");
  let temperatureElement = document.querySelector("#temperature");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let conditionElement = document.querySelector("#condition");

  heading.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);

  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;

  windElement.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;

  conditionElement.innerHTML = response.data.condition.description;
}
