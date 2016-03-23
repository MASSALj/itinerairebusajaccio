var map;  //The Google Map
var depart; //Variable that will hold the starting point location
var arrivee; //Variable that will hold the ending point location






//the searchbox that are going to be used
var searchBoxDepart;
var searchBoxArrivee;






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






//Enable direction details printing
var button_print = $('.impression');
button_print.click(function() {

    //var jstopdf = new jsPDF();
    //jstopdf.setFontSize(20);
    //var thehtml = $('.results').html().replace('<br>', '\n');
    //console.log(thehtml);
    //jstopdf.text(17, 12, 'Départ : ' + document.getElementById('depart').value + '\nArrivée : ' + document.getElementById('arrivee').value + '\n' + thehtml);
    //jstopdf.save('itineraire.pdf');

    var win = window.open();
    win.document.write($('.results').html());
    win.print();
    win.close();

});



function encode_utf8(s) {
    return encodeURIComponent(s);
}

function decode_utf8(s) {
    return decodeURIComponent(s);
}






/**
 * Add starting point
 * @param google_window The opened infoWindow
 * @param google_element the div element containing the name, the position, and the index of the place
 */
function addDepart(google_window, google_element){

    var x = google_element.previousSibling.innerHTML.split(",");
    document.getElementById("depart").value = x[0];

    if (x[4] == 'searchBoxDepart'){ var laplace =  searchBoxDepart.getPlaces(); } else { var laplace =  searchBoxArrivee.getPlaces(); }

    //var laplace =  searchBoxDepart.getPlaces();

    laplace.forEach(function(place, j) {
        if (j == x[3]){
            setDirection(place.geometry.location, 'depart');
            google_window.fadeOut(500);
        }
    });

}







/**
 * Add ending point
 * @param google_window The opened infoWindow
 * @param google_element the div element containing the name, the position, and the index of the place
 */
function addDestination(google_window, google_element){

    var x = google_element.previousSibling.previousSibling.previousSibling.innerHTML.split(",");
    document.getElementById("arrivee").value = x[0];

    if (x[4] == 'searchBoxDepart'){ var laplace =  searchBoxDepart.getPlaces(); } else { var laplace =  searchBoxArrivee.getPlaces(); }
    //var laplace =  searchBoxArrivee.getPlaces();

    laplace.forEach(function(place, j) {
        if (j == x[3]){
            setDirection(place.geometry.location, 'arrivee');
            google_window.fadeOut(500);
        }
    });
}






/**
 * Displays the google map and turns the two inputs into Google maps SearchBoxes
 */
function initMap() {


    map = new google.maps.Map(document.getElementById('map'), { // the google map instanciation
        center: {lat: 41.9257502, lng: 8.7399893},  //centered on Ajaccio
        zoom: 18
    });


    //Enable the map to stay centered while resizing the window
    google.maps.event.addDomListener(window, "resize", function () {
        var center = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(center);
    });


    //The bounds (in order to have an accurate autocompletion on Ajaccio)
    var defaultBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(41.972243, 8.581899),
        new google.maps.LatLng(41.898944, 8.828748)
    );

    map.fitBounds(defaultBounds); //The map fits now in the bounds

    var elem_depart = document.getElementById('depart');
    var elem_arrivee = document.getElementById('arrivee');


    var options = {
        bounds: map.getBounds()
    };


    searchBoxDepart = new google.maps.places.SearchBox(elem_depart, options);   // -->  turns the inputs in searchbox allowing the autocompletion
    searchBoxArrivee = new google.maps.places.SearchBox(elem_arrivee, options); //  ↗




    map.addListener('bounds_changed', function () { // Listener on the input which will give autocompletion based on the map's bounds
        searchBoxDepart.setBounds(map.getBounds());
    });


    map.addListener('bounds_changed', function () { // Listener on the input which will give autocompletion based on the map's bounds
        searchBoxArrivee.setBounds(map.getBounds());
    });




    //listener on the starting input, which has similarities with onkeypress, but here it's about places
    searchBoxDepart.addListener('places_changed', function () {
        var places =  searchBoxDepart.getPlaces(); //get the places found

        if (places.length == 0){
            alert('Lieu ou adresse introuvable !')
        }else if (places.length == 1){ // one place
            console.log(places[0].geometry.location.lng());
            setDirection(places[0].geometry.location, 'depart');
            setMarkers(places, 'searchBoxDepart'); //puts the marker on the place
        }else{
            setMarkers(places, 'searchBoxDepart'); // puts the markers on every places found, the user will have to choose the wanted place
        }
    });



    //listener on the destination input, which has similarities with onkeypress, but here it's about places
    searchBoxArrivee.addListener('places_changed', function () {
        var places =  searchBoxArrivee.getPlaces(); //get the places found

        if (places.length == 0){
            alert('Lieu ou adresse introuvable !')
        }else if (places.length == 1){ // one place
            console.log(places[0].geometry.location);
            setDirection(places[0].geometry.location, 'arrivee');  //we put the place directly as the starting point
            setMarkers(places,  'searchBoxArrivee'); //puts the marker on the place
        }else{
            setMarkers(places, 'searchBoxArrivee');  // puts the markers on every places found, the user will have to choose the wanted place
        }
    });

}






/**
 * Set starting or ending point
 *
 * @param location Lat and Lng
 * @param str départ ou arrivée
 */
function setDirection(location, str){

    if (str == 'depart') { depart = location; } else { arrivee = location; }

}






/**
 * Puts the markers on the places
 *
 * @param theplaces
 * @param elem The input text which made the search
 */
function setMarkers(theplaces, elem){

    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.


        // Clear out the old markers.
        markers.forEach(function(marker) {
            marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        theplaces.forEach(function(place, k) {

            console.log('les endroits trouvés : \n' + place.name);
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
            //console.log(typeof place.geometry.location);

            var nom = place.name;
            var longitude = place.geometry.location.lng();
            var latitude = place.geometry.location.lat();

            //var contentString = "<p><b>" + place.name + "</b></p><p>" + place.formatted_address + "</p><div hidden>" + nom + "," + longitude + "," + latitude + "</div><a id='infodepart1' onclick='addDepart($(this).parent().parent().parent().parent(), this)'>Définir comme point de départ</a><br /><a id='infodestination1' onclick='addDestination($(this).parent().parent().parent().parent(), this)'>Définir comme point de destination</a></p>";
            var contentString = "<p><b>" + place.name + "</b></p><p>" + place.formatted_address + "</p><div hidden>" + nom + "," + longitude + "," + latitude + "," + k + "," + elem + "</div><a id='infodepart1' onclick='addDepart($(this).parent().parent().parent().parent(), this)'>Définir comme point de départ</a><br /><a id='infodestination1' onclick='addDestination($(this).parent().parent().parent().parent(), this)'>Définir comme point de destination</a></p>";



            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });


            lemark.addListener('click', function () {
                map.setZoom(16);
                map.setCenter(lemark.getPosition());
                infowindow.open(map, lemark);
            });

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }

            map.fitBounds(bounds);


        });
}






/**
 * Draw the direction
 *
 */
function drawDirection(){


    if (!depart || !arrivee){
        alert('Renseigner un lieu de départ et d\'arrivée ');
        return false;
    }else{
        var summaryPanel = $('.results'), resultSearch = $('.resultSearch'), routeForm = $('.routeForm'), modifSearchButton = $('.modifSearchButton');
        resultSearch.fadeIn(500);
        routeForm.fadeOut(500);
        modifSearchButton.click(function(){
            google.maps.event.trigger(map, 'resize');
            routeForm.fadeIn(500);
            resultSearch.fadeOut(500);
            summaryPanel.html('');
        });

    }


    var directionsDisplay = new google.maps.DirectionsRenderer({
        map: map
    });

    var less;
    //Get the option choosed by the user
    if (document.getElementById('radio_marche').checked) {
        less = document.getElementById('radio_marche').value;
    }else{
        less = document.getElementById('radio_correspondance').value;
    }

    // Set destination, origin and travel mode.
    var request = {
        origin: depart,
        destination: arrivee,
        travelMode: google.maps.TravelMode.TRANSIT,
        transitOptions: {
            departureTime: getDateTimeUser(),
            modes: [google.maps.TransitMode.BUS],
            routingPreference: google.maps.TransitRoutePreference[$(less)]

        },
        optimizeWaypoints: true

    };


    // Pass the directions request to the directions service.
    var directionsService = new google.maps.DirectionsService();
    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            // Display the route on the map.
            directionsDisplay.setDirections(response);

            var route = response.routes[0];

            console.log(route.legs);
            // For each route, display summary information.
            for (var i = 0; i <= route.legs.length; i++) {
                if (route.legs[i].departure_time) { summaryPanel.append('Heure de départ : ' + route.legs[i].departure_time.text + '<br>'); } //'Heure de départ : ' + route.legs[i].departure_time.text + '<br>';
                summaryPanel.append('Lieu de départ : ' + route.legs[i].start_address + '<br>');
                summaryPanel.append('Distance du trajet : ' + route.legs[i].distance.text + '<br><br>');

                summaryPanel.append('<b>Instructions : </b><br />');

                for (var j = 0; j <= route.legs[i].steps.length-1; j++) {


                    if (route.legs[i].steps[j].travel_mode == 'TRANSIT') {

                        summaryPanel.append('Prendre ' + route.legs[i].steps[j].instructions + ', ligne => ', +route.legs[i].steps[j].transit.line.short_name + ', ' + route.legs[i].steps[j].duration.text + ', Distance : ' + route.legs[i].steps[j].distance.text + '<br>');

                    } else if (route.legs[i].steps[j].travel_mode == 'WALKING') {


                        for (var k = 0; k <= route.legs[i].steps[j].steps.length - 1; k++) {
                            summaryPanel.append(route.legs[i].steps[j].steps[k].instructions + ', Durée : ' + route.legs[i].steps[j].steps[k].duration.text + ', Distance : ' + route.legs[i].steps[j].steps[k].distance.text + '<br>');
                        }

                        summaryPanel.append('<br>');
                    }


                }


                if (route.legs[i].arrival_time) {summaryPanel.append('Heure d\'arrivée : ' + route.legs[i].arrival_time.text + '<br>'); }
                summaryPanel.append('Lieu d\'arrivée : ' + route.legs[i].end_address + '<br>');

            }

        } else {
            window.alert('La requête de direction a échoué pour la raison suivante : ' + status);
        }

    });
}





/**
 * Get the date and the time specified by the user in the form
 */
function getDateTimeUser(){


    var date = document.getElementById('date1').value;

    //var date = document.getElementsByName('date1_submit')[0].value;

    var currDate = new Date();

    var time = new Date(date);
    time.setHours(document.getElementById('selecthour').value);
    time.setMinutes(document.getElementById('selectminute').value);

    if (time.getDate() < currDate.getDate()){ time.setDate(currDate.getDate()); } // handles old date
    if (time.getTime() < currDate.getTime()){ time.setTime(currDate.getTime()); } // handles old time

    //handles hours below 6:30
    if (time.getHours() < 6 || (time.getHours() == 6 && time.getMinutes() < 30 )){
        time.setHours(6);
        time.setMinutes(30);
    }

    return time;

}