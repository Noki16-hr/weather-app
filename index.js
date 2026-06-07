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

paragraph.innerHTML = `${formatted}, moderate rain <br />
Humidity: <strong>87%</strong>, Wind: <strong>7.2 km/h</strong>`;

function displayTemperature(response) {
  let heading = document.querySelector("#main-heading");
  let temperatureElement = document.querySelector(".temperature");

  let temperature = Math.round(response.data.temperature.current);

  heading.innerHTML = response.data.city;
  temperatureElement.innerHTML = temperature;
}
