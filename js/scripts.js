const loading = document.getElementById("loading");

if (navigator.geolocation){
  navigator.geolocation.getCurrentPosition(function(position) {
     lessgo(position.coords.latitude, position.coords.longitude);
  });
}

function lessgo(lat, lon){
    showLoading();
      fetch("https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + lon)
      .then (response=>response.json())
      .then(data => set(data));
}

function set(json){
  hideLoading();
  if (json.weather[0].icon!=null){ 
    document.getElementById("maybe").style.display="block";
    document.getElementById("location").textContent=json.name + ", " + json.sys.country;
    document.getElementById("weat").textContent=json.weather[0].main;
    document.getElementById("temp").textContent=json.main.temp.toFixed(1);
    document.getElementById("icon").src=json.weather[0].icon;
  }
  else{
    document.getElementById("error").style.display="block";
  }
}
var celsius=true;
function change(){
   var x=parseFloat(document.getElementById("temp").textContent);
  if(celsius===true){             document.getElementById("temp").textContent=((x*9/5)+32).toFixed(1);
document.getElementById("toggle").textContent="°F";
    celsius=false;
  }
    else{
document.getElementById("temp").textContent=((x-32)*5/9).toFixed(1);     document.getElementById("toggle").textContent="°C";
      celsius=true;
    }
  }
function showLoading() {
  loading.className = "show";
}

function hideLoading()
{
  loading.className = loading.className.replace("show", "");
}
