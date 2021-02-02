const cityInput = document.getElementById('city')
const btn = document.getElementById('search')
const info = document.getElementById('info')



function cityData(response) {
  const lat = response.coord.lat
  const lon = response.coord.lon
  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=&appid=API-Key`)
  .then(data => data.json())
  // .then(data=>console.log(data.daily))
  .then(data => makeHtml(response, data))

};

function makeHtml(response, data) {
  let html = `<div><p>City: ${response.name}</p>`
  html += `<p>Country: ${response.sys.country}</p>`
  html += `<p>Weather: ${response.weather[0].description}`
  // html += `<table>`
  html += `<header class="row">
    <div class="col">Day</div>
    <div class="col">Min-temperature</div>
    <div class="col">Max-temperature</div>
    <div class="col">Weather</div>
  </header>`
  for (var i = 0; i < data.daily.length; i++){
    html += `<div class="row">
            <div class="col">${i}</div>
            <div class="col">${((data.daily[i].temp.min)-273.15).toFixed(2)}</div>
            <div class="col">${((data.daily[i].temp.max)-273.15).toFixed(2)}</div>
            <div class="col"><img src="http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png"></img></div>
            </div>`

  }
  info.innerHTML = html
}


btn.addEventListener('click', () => {
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=API-KEY`)
  .then(data => data.json())
  .then(data => cityData(data))
  .catch(info.innerHTML = "<h1>CITY NOT FOUND...Try again</h1>")
})
