// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 41.9231855, lng: 8.7407447},
        zoom: 13
    });
    var input = /** @type {!HTMLInputElement} */(
        document.getElementById('pac-input'));

    var dep = /** @type {!HTMLInputElement} */(
        document.getElementById('dep'));

    var dest = /** @type {!HTMLInputElement} */(
        document.getElementById('dest'));


    var options = {
        types: ['(cities)'],
        componentRestrictions: {country: 'fr'}
    };



    var types = document.getElementById('type-selector');
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(types);

    var autocomplete = new google.maps.places.Autocomplete(input, options);
    autocomplete.bindTo('bounds', map);

    var autocomplete2 = new google.maps.places.Autocomplete(dep, options);
    autocomplete2.bindTo('bounds', map);

    var autocomplete3 = new google.maps.places.Autocomplete(dest, options);
    autocomplete3.bindTo('bounds', map);




    //var infowindow = new google.maps.InfoWindow({
    //    content: '<div id="depart" onclick="alert(\'départ\');">Partir d\'ici</div>'
    //});
    var infowindow = new google.maps.InfoWindow();
    var marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
    });

    autocomplete.addListener('place_changed', function() {
        infowindow.close();
        marker.setVisible(false);
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            window.alert("Autocomplete's returned place contains no geometry");
            return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);  // Why 17? Because it looks good.
        }
        marker.setIcon(/** @type {google.maps.Icon} */({
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(35, 35)
        }));
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);
        //marker.set

        var address = '';
        if (place.address_components) {
            address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
        }

        infowindow.setContent('<strong>' + place.name + '</strong><br />' + address + '<br /><a style="text-decoration: underline; color : blue;" onclick="alert(\'Point de départ : ' + place.name + '\');">Point de départ</a><br /><a style="text-decoration: underline; color : blue;" onclick="alert(\'Point d\'arrivée : ' + place.name + '\');">Point de destination</a>');
        infowindow.open(map, marker);
    });

    autocomplete2.addListener('place_changed', function() {
        infowindow.close();
        marker.setVisible(false);
        var place = autocomplete2.getPlace();
        if (!place.geometry) {
            window.alert("Autocomplete's returned place contains no geometry");
            return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);  // Why 17? Because it looks good.
        }
        marker.setIcon(/** @type {google.maps.Icon} */({
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(35, 35)
        }));
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);
        //marker.set

        var address = '';
        if (place.address_components) {
            address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
        }

        infowindow.setContent('<strong>' + place.name + '</strong><br />' + address + '<br /><a style="text-decoration: underline; color : blue;" onclick="alert(\'Point de départ : ' + place.name + '\');">Partir de cet endroit</a>');
        infowindow.open(map, marker);
    });
    autocomplete3.addListener('place_changed', function() {
        infowindow.close();
        marker.setVisible(false);
        var place = autocomplete3.getPlace();
        if (!place.geometry) {
            window.alert("Autocomplete's returned place contains no geometry");
            return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);  // Why 17? Because it looks good.
        }
        marker.setIcon(/** @type {google.maps.Icon} */({
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(35, 35)
        }));
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);
        //marker.set

        var address = '';
        if (place.address_components) {
            address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
        }

        infowindow.setContent('<strong>' + place.name + '</strong><br />' + address + '<br /><a style="text-decoration: underline; color : blue;" onclick="alert(\'Point de départ : ' + place.name + '\');">Partir de cet endroit</a>');
        infowindow.open(map, marker);
    });

    // Sets a listener on a radio button to change the filter type on Places
    // Autocomplete.
    function setupClickListener(id, types) {
        var radioButton = document.getElementById(id);
        radioButton.addEventListener('click', function() {
            autocomplete.setTypes(types);
        });
    }

    setupClickListener('changetype-all', []);
    setupClickListener('changetype-address', ['address']);
    setupClickListener('changetype-establishment', ['establishment']);
    setupClickListener('changetype-geocode', ['geocode']);



    var depart = {lat: 41.919969, lng: 8.737142};
    var arrivee = {lat: 41.929380, lng: 8.740230};


    var directionsDisplay = new google.maps.DirectionsRenderer({
        map: map
    });

    // Set destination, origin and travel mode.
    var request = {
        destination: depart,
        origin: arrivee,
        travelMode: google.maps.TravelMode.TRANSIT
    };

    // Pass the directions request to the directions service.
    var directionsService = new google.maps.DirectionsService();
    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            // Display the route on the map.
            directionsDisplay.setDirections(response);
        }
    });
}
