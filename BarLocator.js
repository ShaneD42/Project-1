let map;
let infowindow;

function initMap(url) {
  const endpoint = url || "https://maps.googleapis.com/maps/api/geocode/json?address=Phoenix&key=AIzaSyDSGGxwR4nSLuVZlNjj_cozRakQsNmeZnU"
  $.get(endpoint, function(coords) {
    let centerpoint = coords.results[0].geometry.location;

    map = new google.maps.Map(document.getElementById('map'), {
      center: centerpoint,
      zoom: 12
    });

    infowindow = new google.maps.InfoWindow();
    let service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
      location: centerpoint,
      // radius: 50000,
      type: ['bar'],
      keyword: ['brewery'],
      rankBy: google.maps.places.RankBy.DISTANCE
    }, callback);
  })
}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (let i = 0; i < results.length; i++) {
      createMarker(results[i]);
      let p = $('<p></p>')
      let placesNearMe = (`Name: ${results[i].name} <br> Address: ${results[i].vicinity} Rating: ${results[i].rating}`)
      p.text(placesNearMe)
      $('#listings').append(p)
      console.log(results)
    }
  }
}

let finder = $('#findBreweries')
finder.click(function(e) {
  initMap("https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDSGGxwR4nSLuVZlNjj_cozRakQsNmeZnU&address=" + $('#search').val())
  $('#listings').empty().append()
})

function createMarker(place) {
  let placeLoc = place.geometry.location;
  let marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}

// var currentLoc = new google.maps.LatLng(33.3062, -111.8413);
// var mapOptions = {
//   zoom: 11,
//   center: currentLoc
// }
// var map = new google.maps.Map(document.getElementById("map"), mapOptions);
//
