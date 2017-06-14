/* global google:ignore */

$(() => {

  function initAutocomplete(map) {

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
      const lat = (places[0].geometry.location.lat()).toFixed(6);
      const lng = (places[0].geometry.location.lng()).toFixed(6);
      const country = places[0].address_components.find((property) => {
        return property.key === 'short_name';
      });
      const placeName = (`${places[0].name}`);
      $('h3.place-name').html(placeName);
      $('p.lat').html(`Latitude: ${lat}`);
      $('p.lng').html(`Longitude: ${lng}`);
      if(places[0].name.length > 0){
        $('.add-places').attr('hidden', false);
      }

      $('input.place-name').val(placeName);
      $('input.lat').val(lat);
      $('input.lng').val(lng);

      var icon = {
        url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 32),
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


  function initMap() {
    const $maps = $('.map');
    $maps.each((i, mapDiv) => {
      const hasData = !$.isEmptyObject($(mapDiv).data());
      const data = hasData ? $(mapDiv).data() : { lat: 0, lng: 0 };

      const map = new google.maps.Map(mapDiv, {
        center: data,
        zoom: $(mapDiv).hasClass('small') ? 10 : 2,
        mapTypeId: 'terrain',
        zoomControl: false,
        scaleControl: false,
        scrollwheel: false
      });

      if(hasData) {
        new google.maps.Marker({
          map: map,
          position: $(mapDiv).data()
        });

        getForecast(data.lat, data.lng, mapDiv);
      }
      console.log(mapDiv);

      if($(mapDiv).hasClass('autocomplete')) initAutocomplete(map);
    });
  }

  function getForecast(lat,lng, mapDiv) {
    const $forecast = $(mapDiv).parent().find('.forecast');

    $.ajax({
      url: '/probability',
      method: 'GET',
      data: { lat, lng }
    })
    .then((forecast) => {
      const kp = forecast.ace.kp1hour;
      const time = forecast.ace.date;
      const sunrise = forecast.weather.sunrise;
      const sunset = forecast.weather.sunset;
      console.log(new Date(time) > new Date(sunrise));
      console.log(new Date(time) < new Date(sunset));
      let probability;
      if(lat >= 60 && kp >= 5 ||
         lat >= 62 && kp >= 4 ||
         lat >= 65 && kp >= 3 ||
         lat >= 68 && kp >= 2 ||
         lat >= 70 && kp >= 1){
        if(time > sunrise && time < sunset || sunrise === 'n\/a'|| sunset === 'n\/a'){
          probability = 'High magnetic activity, but too light outside to see it';
        } else{
          probability = 'You wll see it';
        }
      } else {
        probability = 'Kp too weak for this location';
      }
      $forecast.html(`The KP in 1 hour will be ${forecast.ace.kp1hour} and the temperature is ${forecast.weather.temperature} <br><p>${probability}</p>`);
      $('.forecast-big').html(`The KP in 1 hour will be ${forecast.ace.kp1hour} and the temperature is ${forecast.weather.temperature} <br><p>${probability}`);
    });
  }

  function addPulse(){
    $('.pulse').addClass('animated pulse');
  }
  function removePulse(){
    $('.pulse').removeClass('animated pulse');
  }

  $('.pulse').on('click', addPulse);
  $('.pulse').on('mouseleave', removePulse);

  initMap();
});
