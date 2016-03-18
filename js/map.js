var lieu = [];  //contiendra la latitude/longitide de la position de départ et de destination
var departuredate = document.getElementById('date1').value;
var departure1 = document.getElementById('selecthour').value;

var select = document.getElementById("selecthour");
var valeur = select.options[select.selectedIndex].value;

var departure2 = document.getElementById('selectminute').value;
var now = new Date();
var tzOffset = (now.getTimezoneOffset() + 60) * 60 * 1000;

var time = new Date();
time.setHours(departure1);
time.setMinutes(departure2);

var ms = time.getTime() - tzOffset;
if (ms < now.getTime()) {
    ms += 24 * 60 * 60 * 1000;
}

var departureTime = new Date(ms);




//Enable search reinitialisation
routeForm = $('.routeForm');
resultSearch = $('.resultSearch');
newSearchButton = $('.newSearchButton');
newSearchButton.click(function(){
    resultSearch.fadeOut(500);
    routeForm.fadeIn(500);

    document.getElementById('arrivee').value = '';
    document.getElementById('depart').value = '';
    lieu = [];
    initMap();
});


//Enable research modification
modifSearchButton = $('.modifSearchButton');
modifSearchButton.click(function(){
    initMap();
    routeForm.fadeIn(500);
    resultSearch.fadeOut(500);
    //resultSearch.html('');

});



infodepart1 = $('#infodepart1');
infodepart1.click(function(){
    alert('eyo');
    //var x = document.getElementById("infodepart1").previousSibling.innerHTML.split(",");
    //document.getElementById("depart").value = x[0];
    //lieu['long1'] = x[1];
    //lieu['lat1'] = x[2];

});


infodestination1 = $('#infodestination1');
infodestination1.click(function(){
    var x = document.getElementById("infodestination1").previousSibling.previousSibling.previousSibling.innerHTML.split(",");
    document.getElementById("arrivee").value = x[0];
    lieu['long2'] = x[1];
    lieu['lat2'] = x[2];

});


function initMap() {




    var map = new google.maps.Map(document.getElementById('map'), {         //instancie la google map
        center: {lat: 41.9257502, lng: 8.7399893},  //centrée sur Ajaccio
        zoom: 15
    });


    //Enable the map to stay centered while resizing the window
    google.maps.event.addDomListener(window, "resize", function() {
        var center = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(center);
    });


    var defaultBounds = new google.maps.LatLngBounds(
		new google.maps.LatLng(41.972243, 8.581899),
		new google.maps.LatLng(41.898944, 8.828748)
    );
    //
    //map.fitBounds(defaultBounds);

    var depart = document.getElementById('depart');
    var arrivee = document.getElementById('arrivee');

    var options = {
        //componentRestrictions: {country: 'France', state: 'Corse', city: 'Ajaccio'}, //Restriction sur la france, mais ne marche pas....
        //bounds: map.getBounds()
        //componentRestrictions: {country: 'fr', state: 'Corse', city: 'Ajaccio'},
        bounds: defaultBounds

        //type: 'transit_station'
    };

    var searchBoxDepart = new google.maps.places.SearchBox(depart, options);   // -->  intialise les input text en searchbox, permettant l'autocomplétion
    //var searchBoxArrivee = new google.maps.places.SearchBox(arrivee, options); //  ↗

    //var searchBoxDepart = new google.maps.places.Autocomplete(depart, options);   // -->  intialise les input text en searchbox, permettant l'autocomplétion
    var searchBoxArrivee = new google.maps.places.SearchBox(arrivee, options); //  ↗















    map.addListener('bounds_changed', function() {         // Listener sur l'input text pour la position de départ
        searchBoxDepart.setBounds(map.getBounds());
    });


    map.addListener('bounds_changed', function() {         // Listener sur l'input text pour la position de arrivée
        searchBoxArrivee.setBounds(map.getBounds());
    });


    //_________________Place le marqueur sur la carte pour le lieu de départ______________

    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBoxDepart.addListener('places_changed', function() {
        var places = searchBoxDepart.getPlaces();

        console.log(places);

;        if (places.length == 0) {
            return;
        }

        // Clear out the old markers.
        markers.forEach(function(marker) {
            marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {

            console.log('les places de départ : \n' + place.name);
            var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };


            var lemark;

            lemark = new google.maps.Marker({
                map: map,
                icon: icon,
                title: place.name,
                position: place.geometry.location
            });

            markers.push(lemark);

            // Create a marker for each place.
            //markers.push(new google.maps.Marker({
            //    map: map,
            //    icon: icon,
            //    title: place.name,
            //    position: place.geometry.location
            //}));
            var nom = place.name;
            var longitude = place.geometry.location.lng();
            var latitude = place.geometry.location.lat();

            var contentString = "<p><b>" + place.name + "</b></p><p>" + place.formatted_address + "</p><div hidden>"+ nom + "," + longitude + "," + latitude + "</div><a id='infodepart1'>Définir comme point de départ</a><br /><a id='infodestination1'>Définir comme point de destination</a></p>";

            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });

            lemark.addListener('click', function() {
                //alert(place.name);

                map.setZoom(16);
                map.setCenter(lemark.getPosition());
                infowindow.open(map, lemark);
            });




            lieu['long1'] = place.geometry.location.lng();
            lieu['lat1'] = place.geometry.location.lat();

            infodepart1 = $('#infodepart1');
            infodepart1.click(function(){
                alert('eyo');
                var x = document.getElementById("infodepart1").previousSibling.innerHTML.split(",");
                document.getElementById("depart").value = x[0];
                lieu['long1'] = x[1];
                lieu['lat1'] = x[2];

            });

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);




        //_______________Affiche la trajectoire en bus____________________
        if (lieu["lat1"] != undefined && lieu["lat2"] != undefined && lieu["long1"] != undefined && lieu["long2"] != undefined){

            var summaryPanel = $('.results'), resultSearch = $('.resultSearch'), routeForm = $('.routeForm'), modifSearchButton = $('.modifSearchButton');
            resultSearch.fadeIn(500);
            routeForm.fadeOut(500);
            modifSearchButton.click(function(){
                google.maps.event.trigger(map, 'resize');
                routeForm.fadeIn(500);
                resultSearch.fadeOut(500);
                summaryPanel.html('');
            });


            var depart = {lat: lieu['lat1'], lng: lieu['long1']};
            var arrivee = {lat: lieu['lat2'], lng: lieu['long2']};

            var directionsDisplay = new google.maps.DirectionsRenderer({
                map: map
            });

            /*var departure = document.getElementById('selecthour').value;
            var departure2 = document.getElementById('selectminutes').value;
            var now = new Date();
            var tzOffset = (now.getTimezoneOffset() + 60) * 60 * 1000;

            var time = new Date();
            time.setHours(departure);
            time.setMinutes(departure2);

            var ms = time.getTime() - tzOffset;
            if (ms < now.getTime()) {
                ms += 24 * 60 * 60 * 1000;
            }

            var departureTime = new Date(ms);*/


            // Set destination, origin and travel mode.
            var request = {
                origin: depart,
                destination: arrivee,
                travelMode: google.maps.TravelMode.TRANSIT,
                transitOptions: {

                    departureTime: departureTime,          // Foutre les critères de date et heure de depart
                    // arrivalTime: Date,                              // foutre les critères de date et heure d'arrivee
                    modes: [google.maps.TransitMode.BUS],
                    routingPreference: google.maps.TransitRoutePreference.FEWER_TRANSFERS, // le moins de correspondances
                    //routingPreference: google.maps.TransitRoutePreference.LESS_WALKING, // le moins de marche possible

                },
                optimizeWaypoints: true
            };

            // Pass the directions request to the directions service.
            var directionsService = new google.maps.DirectionsService();
            directionsService.route(request, function(response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    // Display the route on the map.
                    directionsDisplay.setDirections(response);

                    //console.log(response);

                    var route = response.routes[0];
                    console.log(route.legs);

                    // For each route, display summary information.
                    for (var i = 0; i <= route.legs.length; i++) {
                        if (route.legs[i].departure_time) { summaryPanel.append('Heure de départ : ' + route.legs[i].departure_time.text + '<br>'); } //'Heure de départ : ' + route.legs[i].departure_time.text + '<br>';
                        summaryPanel.append('Lieu de départ : ' + route.legs[i].start_address + '<br>');
                        summaryPanel.append('Distance du trajet : ' + route.legs[i].distance.text + '<br><br>');

                        summaryPanel.append('<b>Instructions : </b><br />');

                        for (var j = 0; i <= route.legs[i].steps.length-1; j++) {

                            if (route.legs[i].steps[j].travel_mode == 'TRANSIT'){

                                console.log('bus');
                                summaryPanel.append('Prendre ' + route.legs[i].steps[j].instructions + ', ligne => ', + route.legs[i].steps[j].transit.line.short_name + ', ' + route.legs[i].steps[j].duration.text + ', Distance : ' + route.legs[i].steps[j].distance.text + '<br>');

                            }else if (route.legs[i].steps[j].travel_mode == 'WALKING'){


                                for (var k = 0; k <= route.legs[i].steps[j].steps.length-1; k++) {
                                    console.log('à pied ' + k + 'fois');
                                    summaryPanel.append(route.legs[i].steps[j].steps[k].instructions + ', Durée : ' + route.legs[i].steps[j].steps[k].duration.text + ', Distance : ' + route.legs[i].steps[j].steps[k].distance.text + '<br>');
                                }
                                summaryPanel.append('<br>');

                            }

                        }



                        if (route.legs[i].arrival_time) {summaryPanel.append('Heure d\'arrivée : ' + route.legs[i].arrival_time.text + '<br>'); }
                        summaryPanel.append('Lieu d\'arrivée : ' + route.legs[i].end_address + '<br>');


                    }
                }else {
                    window.alert('La requête de direction a échoué pour la raison suivante : ' + status);
                }

            });
        }
    });


//_________________Place le marqueur sur la carte pour le lieu d'arrivée______________

    var Amarkers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBoxArrivee.addListener('places_changed', function() {
        var places = searchBoxArrivee.getPlaces();

        //console.log(searchBoxArrivee.getPlaces())

        if (places.length == 0) {
            return;
        }

        // Clear out the old markers.
        Amarkers.forEach(function(marker) {
            marker.setMap(null);
        });
        Amarkers = [];

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
            var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            Amarkers.push(new google.maps.Marker({
                map: map,
                icon: icon,
                title: place.name,
                position: place.geometry.location
            }));

            lieu['long2'] = place.geometry.location.lng();
            lieu['lat2'] = place.geometry.location.lat();

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);


        //console.log(lieu);
        //console.log(lieu.length);

        //_______________Affiche la trajectoire en bus____________________
        if (lieu["lat1"] != undefined && lieu["lat2"] != undefined &&lieu["long1"] != undefined && lieu["long2"] != undefined){
            var summaryPanel = $('.results'), resultSearch = $('.resultSearch'), routeForm = $('.routeForm'), modifSearchButton = $('.modifSearchButton');
            resultSearch.fadeIn(500);
            routeForm.fadeOut(500);
            modifSearchButton.click(function(){
                google.maps.event.trigger(map, 'resize');
                routeForm.fadeIn(500);
                resultSearch.fadeOut(500);
                summaryPanel.html('');
            });

            var depart = {lat: lieu['lat1'], lng: lieu['long2']};
            var arrivee = {lat: lieu['lat2'], lng: lieu['long2']};

            var directionsDisplay = new google.maps.DirectionsRenderer({
                map: map
            });

            // Set destination, origin and travel mode.
            var request = {
                origin: depart,
                destination: arrivee,
                travelMode: google.maps.TravelMode.TRANSIT,
                transitOptions: {
                    //departureTime: Date,          // Foutre les critères de date et heure de depart
                    //arrivalTime: Date,                              // foutre les critères de date et heure d'arrivee
                    modes: [google.maps.TransitMode.BUS],
                    routingPreference: google.maps.TransitRoutePreference.FEWER_TRANSFERS

                },
                optimizeWaypoints: true

            };

            // Pass the directions request to the directions service.
            var directionsService = new google.maps.DirectionsService();
            directionsService.route(request, function(response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    // Display the route on the map.
                    directionsDisplay.setDirections(response);

                    //console.log(response);

                    var route = response.routes[0];
                    console.log(route.legs);

                    // For each route, display summary information.
                    for (var i = 0; i <= route.legs.length; i++) {
                        if (route.legs[i].departure_time) { summaryPanel.append('Heure de départ : ' + route.legs[i].departure_time.text + '<br>'); } //'Heure de départ : ' + route.legs[i].departure_time.text + '<br>';
                        summaryPanel.append('Lieu de départ : ' + route.legs[i].start_address + '<br>');
                        summaryPanel.append('Distance du trajet : ' + route.legs[i].distance.text + '<br><br>');
                        if (route.legs[i].arrival_time) {summaryPanel.append('Heure d\'arrivée : ' + route.legs[i].arrival_time.text + '<br>'); };
                        summaryPanel.append('Lieu d\'arrivée : ' + route.legs[i].end_address + '<br>');

                        summaryPanel.append('<b>Instructions : </b><br />');

                        for (var j = 0; i <= route.legs[i].steps.length-1; j++) {

                            if (route.legs[i].steps[j].travel_mode == 'TRANSIT'){

                                console.log('bus');
                                summaryPanel.append('Prendre ' + route.legs[i].steps[j].instructions + ', ligne => ', + route.legs[i].steps[j].transit.line.short_name + ', ' + route.legs[i].steps[j].duration.text + ', Distance : ' + route.legs[i].steps[j].distance.text + '<br>');

                            }else if (route.legs[i].steps[j].travel_mode == 'WALKING'){


                                for (var k = 0; k <= route.legs[i].steps[j].steps.length-1; k++) {
                                    console.log('à pied ' + k + 'fois');
                                    summaryPanel.append(route.legs[i].steps[j].steps[k].instructions + ', Durée : ' + route.legs[i].steps[j].steps[k].duration.text + ', Distance : ' + route.legs[i].steps[j].steps[k].distance.text + '<br>');
                                }
                                summaryPanel.append('<br>');

                            }

                        }



                        if (route.legs[i].arrival_time) {summaryPanel.append('Heure d\'arrivée : ' + route.legs[i].arrival_time.text + '<br>'); };
                        summaryPanel.append('Lieu d\'arrivée : ' + route.legs[i].end_address + '<br>');


                    }

                } else {
                    window.alert('La requête de direction a échoué pour la raison suivante : ' + status);
                }

            });
        }
    });

}