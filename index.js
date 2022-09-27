function getData() {
  let city = document.getElementById("query").value;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d7526ad4b49afaa7e302ddd1d2c443ef`;

  fetch(url)
    .then(function (res) {
      return res.json();
    })
    .then(function (res) {
      console.log(res);
      appendData(res);
    })
    .catch(function (err) {
      console.log(err);
    });
}

function appendData(data) {
  let url = `https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  let container = document.getElementById("container");
  container.innerHTML = null;

  let city = document.createElement("h2");
  city.innerText = `City : ${data.name}`;
  let min_temp = document.createElement("p");
  min_temp.innerText = `Min-Temp : ${data.main.temp_min}`;
  let max_temp = document.createElement("p");

  max_temp.innerText = `Max-Temp : ${data.main.temp_max}`;
  let wind = document.createElement("p");
  wind.innerText = `Wind :${data?.wind?.speed}`;
  let cloud = document.createElement("p");
  cloud.innerText = `Cloud :${data.clouds.all}.C`;
  // let sunrise =  document.createElement("p")
  // sunrise.innerText =  `Sunrise : ${data.sys.sunrise}`
 let sunrise = document.createElement("div");
 let span1S = document.createElement("span");
  let span2S = document.createElement("span");
  span1S.setAttribute("class", "material-icons");
  span1S.innerText = "wb_sunny";
  span2S.innerText = ` : ${data.sys.sunset}`;

  let sunset = document.createElement("div");
 let span1 = document.createElement("span");
  let span2 = document.createElement("span");
  span1.setAttribute("class", "material-icons");
  span1.innerText = "wb_twilight";
  span2.innerText = ` : ${data.sys.sunset}`;
  
  // let sunset =  document.querySelector("#sunset")
  // sunset.innerText = data.sys.sunset
  
  sunset.append(span1, span2);
  sunrise.append(span1S, span2S);
  container.append(city, min_temp, max_temp, wind, cloud,sunrise, sunset);
  let iframe = document.querySelector("#gmap_canvas");
  iframe.src = url;
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(success);
  function success(pos) {
    const crd = pos.coords;
    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
    getWeatherData(crd.latitude, crd.longitude);
  }
}

getLocation();

function getWeatherData(lat, lon) {
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=d7526ad4b49afaa7e302ddd1d2c443ef`;

  fetch(url)
    .then(function (res) {
      return res.json();
    })
    .then(function (res) {
      console.log(res);
      appendData(res);
    })
    .catch(function (err) {
      console.log(err);
    });
}
