/* global google:ignore */

$(() => {

  function initAutocomplete() {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 51.476369, lng: -0.151669},
      zoom: 2,
      mapTypeId: 'terrain'
    });

    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    var markers = [];
    // // Listen for the event fired when the user selects a prediction and retrieve
    // // more details for that place.
    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();
      if (places.length === 0) {
        return;
      }
      markers.forEach(function(marker) {
        marker.setMap(null);
      });
      markers = [];
    //   // For each place, get the icon, name and location.
      var bounds = new google.maps.LatLngBounds();
      if (!places[0].geometry) {
        console.log('Returned place contains no geometry');
        return;
      }
      const lat = places[0].geometry.location.lat();
      const lng = places[0].geometry.location.lng();
      const placeName = places[0].formatted_address;
      $('h3.place-name').html(placeName);
      $('p.lat').html(lat);
      $('p.lng').html(lng);

      $('input.place-name').val(placeName);
      $('input.lat').val(lat);
      $('input.lng').val(lng);

      var icon = {
        url: places[0].icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };
  //     // Create a marker for each places[0].
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: places[0].name,
        position: places[0].geometry.location
      }));
      if (places[0].geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(places[0].geometry.viewport);
      } else {
        bounds.extend(places[0].geometry.location);
      }
      map.fitBounds(bounds);

      getForecast(lat,lng);
    });
  }

  function getForecast(lat,lng) {
    const $forecast = $('#forecast');
    $.ajax({
      url: '/probability',
      method: 'GET',
      data: { lat, lng }
    })
    .then((forecast) => {
      $forecast.html(`The kp in 1 hour will be ${forecast.ace.kp1hour} and the temperature is ${forecast.weather.temperature} `);
    });
  }
  initAutocomplete();
});
