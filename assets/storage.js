function renderCities() {
  cities.innerHTML = "";
  if (localStorage.getItem("cities") === null) {
      allCities = citiesList;
      return
  } 
  else {
for (var i = 0; i < allCities.length; i++) {
    $('.cities').append('<button type="button" class="city btn btn-outline-secondary" id="' + allCities[i] + '">' + allCities[i] + '</button>');
  sortList();
  }
}}

function init() {
  var citiesList = JSON.parse(localStorage.getItem("allCities"));
  if (citiesList !== null) {
    allCities = citiesList;
  }
  renderCities();
}

init();
