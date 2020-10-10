// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

function displayCityWeather(f) {
    f.preventDefault();
    var city = $('.cityInput').val().trim();
    var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&apikey=f82f3320f3be5227d4c1e1a02d86687b';
  

    $.ajax({
      url: queryURL,
      method: 'GET',
    }).then(function (response) {
      console.log('response:', response)
    });
      


};

$(document).on('click', '.searchBtn', displayCityWeather);