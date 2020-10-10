// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

function displayCityWeather(f) {
    f.preventDefault();
    var city = $('.cityInput').val().trim();
    var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=f82f3320f3be5227d4c1e1a02d86687b';
  

    $.ajax({
      url: queryURL,
      method: 'GET',
    }).then(function (responseWeather) {
      console.log('response:', responseWeather)
      console.log('current weather')
    });
      


};

// api.openweathermap.org/data/2.5/forecast/daily?q={city name}&cnt={cnt}&appid={API key}

function displayCityForecast(f2) {
  f2.preventDefault();
  var city = $('.cityInput').val().trim();
  var queryURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=f82f3320f3be5227d4c1e1a02d86687b';


  $.ajax({
    url: queryURL,
    method: 'GET',
  }).then(function (responseForecast) {
    console.log('response:', responseForecast)
    console.log('forecast')
  });
    


};

$(document).on('click', '.searchBtn', displayCityWeather);
$(document).on('click', '.searchBtn', displayCityForecast);