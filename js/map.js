var map;  //The Google Map
var depart; //Variable that will hold the starting point location
var arrivee; //Variable that will hold the ending point location





//the searchboxes that are going to be used
var searchBoxDepart;
var searchBoxArrivee;





/**
 * Add starting point from the user's selection
 * @param google_window The opened infoWindow
 * @param google_element the div element containing the name, the position, and the index of the place
 * @return none
 */
function addDepart(google_window, google_element){

    var x = google_element.previousSibling.innerHTML.split(","); //splits the hidden div containing the location details
    document.getElementById("depart").value = x[0];

    var laplace;

    //get places from the right searchbox used
    if (x[4] == 'searchBoxDepart'){ var laplace =  searchBoxDepart.getPlaces(); } else { var laplace =  searchBoxArrivee.getPlaces(); }

    laplace.forEach(function(place, j) {
        if (j == x[3]){ //number of the place choosed
            setDirection(place.geometry.location, 'depart');
            google_window.fadeOut(500);
        }
    });

}






/**
 * Add ending point from the user's selection
 * @param google_window The opened infoWindow
 * @param google_element the div element containing the name, the position, and the index of the place
 * @return none
 */
function addDestination(google_window, google_element){

    var x = google_element.previousSibling.previousSibling.previousSibling.innerHTML.split(","); //splits the hidden div containing the location details
    document.getElementById("arrivee").value = x[0];

    var laplace;

    //get places from the right searchbox used
    if (x[4] == 'searchBoxDepart'){ laplace =  searchBoxDepart.getPlaces(); } else { laplace =  searchBoxArrivee.getPlaces(); }

    laplace.forEach(function(place, j) {
        if (j == x[3]){ //number of the place choosed
            setDirection(place.geometry.location, 'arrivee');
            google_window.fadeOut(500);
        }
    });
}






/**
 * Displays the google map and turns the two inputs into Google maps SearchBoxes
 * @return none
 */
function initMap() {

    map = new google.maps.Map(document.getElementById('map'), { // the google map instanciation
        center: {lat: 41.9257502, lng: 8.7399893},  //centered on Ajaccio
        zoom: 14
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

    //map.fitBounds(defaultBounds); //The map fits now in the bounds

    var elem_depart = document.getElementById('depart');
    var elem_arrivee = document.getElementById('arrivee');


    var options = {
        bounds: map.getBounds() //bounds based on the map's bounds
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
            //error message
            var $toasttext = $('<div class="alert"> <span> Lieu ou adresse introuvable ! </span> <button id="closebutton" type="button" class="close" data-dismiss="alert">×</button> </div> ');
            Materialize.toast( $toasttext,6500);
            $( "#closebutton" ).click(function() {
                $( ".toast" ).remove();
            });

        }else if (places.length == 1){ // one place
            //console.log(places[0].geometry.location.lng());
            setDirection(places[0].geometry.location, 'depart');
            setMarkers(places, 'searchBoxDepart'); //puts the marker on the place
        }else{
            setMarkers(places, 'searchBoxDepart'); // puts the markers on every places found, the user will have to choose the wanted place
        }
        map.setZoom(17);
    });



    //listener on the destination input, which has similarities with onkeypress, but here it's about places
    searchBoxArrivee.addListener('places_changed', function () {
        var places =  searchBoxArrivee.getPlaces(); //get the places found

        if (places.length == 0){
            //error message
            var $toasttext = $('<div class="alert"> <span> Lieu ou adresse introuvable ! </span> <button id="closebutton" type="button" class="close" data-dismiss="alert">×</button> </div> ');
            Materialize.toast( $toasttext,6500);
            $( "#closebutton" ).click(function() {
                $( ".toast" ).remove();
            });
        }else if (places.length == 1){ // one place
            console.log(places[0].geometry.location);
            setDirection(places[0].geometry.location, 'arrivee');  //we put the place directly as the starting point
            setMarkers(places,  'searchBoxArrivee'); //puts the marker on the place
        }else{
            setMarkers(places, 'searchBoxArrivee');  // puts the markers on every places found, the user will have to choose the wanted place
        }
        map.setZoom(17);
    });
}






/**
 * Set starting or ending point depending on the parameter
 *
 * @param location Lat and Lng
 * @param str 'départ' or 'arrivée'
 * @return none
 */
function setDirection(location, str){

    if (str == 'depart') { depart = location; } else { arrivee = location; }

}






/**
 * Puts the marker(s) on the map
 *
 * @param theplaces The place(s) found
 * @param elem The input text which used to make the search
 * @return none
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

            //icon creation
            var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            //marker creation
            var lemark = new google.maps.Marker({
                map: map,
                icon: icon,
                title: place.name,
                position: place.geometry.location
            });

            markers.push(lemark);


            var nom = place.name;
            var longitude = place.geometry.location.lng();
            var latitude = place.geometry.location.lat();

            //content of the infowindow
            var contentString = "<p><b>" + place.name + "</b></p><p>" + place.formatted_address + "</p><div hidden>" + nom + "," + longitude + "," + latitude + "," + k + "," + elem + "</div><a id='infodepart1' onclick='addDepart($(this).parent().parent().parent().parent(), this)'>Définir comme point de départ</a><br /><a id='infodestination1' onclick='addDestination($(this).parent().parent().parent().parent(), this)'>Définir comme point de destination</a></p>";


            //infowindow
            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });


            //the infowindow will pop-up when clicking on the marker
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
 * Draw the direction onsubmit of the form, direction details will be shown on the div result
 * @return none
 */
function drawDirection(){

    if (!depart || !arrivee){ //no locations defined

        //error message
        var $toasttext = $('<div class="alert"> <span> Veuillez renseigner les champs des adresses de <strong>départ</strong> et de <strong>destination</strong> ! </span> <button id="closebutton" type="button" class="close" data-dismiss="alert">×</button> </div> ');
        Materialize.toast( $toasttext,6500);
        $( "#closebutton" ).click(function() {
            $( ".toast" ).remove();
            $( "#toast-container" ).remove();
        });
        if(!$( "#toast-container").length){
            $( "div").delay(6500).remove(".alert");
        }
        return false;

    }else{

        var summaryPanel = $('.results');
        var resultSearch = $('.resultSearch');
        var routeForm = $('.routeForm');
        var modifSearchButton = $('.modifSearchButton');


        //Enable search modification
        modifSearchButton.click(function(){
            initMap();
            google.maps.event.trigger(map, 'resize');
            $('#map').css('height', '100%');
            routeForm.fadeIn(500);
            resultSearch.fadeOut(500);
            summaryPanel.html('');
        });



        //Enable search reinitialisation
        newSearchButton = $('.newSearchButton');
        newSearchButton.click(function(){
            $('#map').css('height', '100%');
            resultSearch.fadeOut(500);
            routeForm.fadeIn(500);

            document.getElementById('arrivee').value = '';
            document.getElementById('depart').value = '';
            document.getElementById('date1').value = '';
            document.getElementById('timepicker').value = '';
            document.getElementById('radio_correspondance').checked = true;
            document.getElementById('check_rapide').checked = false;
            summaryPanel.html('');
            
            depart = false; arrivee = false;

            initMap();
        });




        //Enable direction details printing
        var button_print = $('.impression');
        button_print.click(function() {


            var theresults = $('.results');
            var content_print = $(".content_print");
            document.getElementsByClassName("content_print")[0].innerHTML = document.getElementsByClassName("results")[0].innerHTML

            var material = document.getElementsByClassName('material-icons');
            content_print.find(material).remove();
            var win = window.open();
            win.document.write(content_print.html());
            win.print();
            win.close();

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


    var short;
    //Get shortest route option
    short = document.getElementById('check_rapide').checked ? true : false;

    // Set destination, origin and travel mode.
    var request = {
        origin: depart,
        destination: arrivee,
        travelMode: google.maps.TravelMode.TRANSIT,
        transitOptions: {

            departureTime: getDateTimeUser(),
            modes: [google.maps.TransitMode.BUS],
            routingPreference: google.maps.TransitRoutePreference[less]

        },
        optimizeWaypoints: short

    };

    // Pass the directions request to the directions service.
    var directionsService = new google.maps.DirectionsService();
    directionsService.route(request, function(response, status) {
    	console.log(response+"____"+status);
        if (status == google.maps.DirectionsStatus.OK) {
            // Display the route on the map.
            directionsDisplay.setDirections(response);

            var route = response.routes[0];


            // For each route, display summary information.
            var cpt=1;
            for (var i = 0; i <= route.legs.length-1; ++i) {
                summaryPanel.append("<h3>De " + document.getElementById('depart').value + " vers " + document.getElementById('arrivee').value + "</h3><br />");
                summaryPanel.append('<h3>Résumé : </h3><br />');
                
                if (route.legs[i].departure_time) {summaryPanel.append('<i class="material-icons">date_range</i>Date : ' + route.legs[i].departure_time.value.getDate() + "/" + route.legs[i].departure_time.value.getMonth() + "/" + route.legs[i].departure_time.value.getFullYear() + "<br />");}
                if (route.legs[i].departure_time) { summaryPanel.append('<i class="material-icons">access_time</i>Heure de départ : ' + route.legs[i].departure_time.text + '<br>'); } //'Heure de départ : ' + route.legs[i].departure_time.text + '<br>';
                summaryPanel.append('<i class="material-icons">my_location</i>Lieu de départ : ' + document.getElementById('depart').value + ", " +route.legs[i].start_address + '<br>');
                summaryPanel.append('<i class="material-icons">transfer_within_a_station</i>Distance du trajet : ' + route.legs[i].distance.text + '<br><br>');

                summaryPanel.append('<br /><h3>Instructions : </h3><br />');

                for (var j = 0; j <= route.legs[i].steps.length-1; ++j) {
                    if(cpt > 1) {
                          summaryPanel.append('<br /><br />');
                    }
                    summaryPanel.append('<i class="material-icons">filter_'+cpt+'</i> <b>Etape n°'+cpt+'</b><br /><br />');
                    ++cpt;
                    if (route.legs[i].steps[j].travel_mode == 'TRANSIT'){

                        //console.log('bus');
                        summaryPanel.append('<div class="travelStep"><i class="material-icons">directions_bus</i> Ligne <div class="busIcon" style="margin-right: 0.5%; background-color: '+route.legs[i].steps[j].transit.line.color+'">'+ route.legs[i].steps[j].transit.line.short_name + '</div>'+route.legs[i].steps[j].instructions+'<br/><i class="material-icons">timer</i> Durée : ' + route.legs[i].steps[j].duration.text + '<br /><i class="material-icons">transfer_within_a_station</i>Distance : ' + route.legs[i].steps[j].distance.text+'</div>');
                    //
                    
                    }else if (route.legs[i].steps[j].travel_mode == 'WALKING'){


                        for (var k = 0; k <= route.legs[i].steps[j].steps.length-1; ++k) {
                            //console.log('à pied ' + k + 'fois');
                            summaryPanel.append('<div class="travelStep"><i class="material-icons">subdirectory_arrow_right</i>'+route.legs[i].steps[j].steps[k].instructions + '<br /><i class="material-icons">timer</i>Durée : ' + route.legs[i].steps[j].steps[k].duration.text + '<br /><i class="material-icons">transfer_within_a_station</i>Distance : ' + route.legs[i].steps[j].steps[k].distance.text+'</div>');
                            if(k<route.legs[i].steps[j].steps.length-1){
                                 summaryPanel.append('<i class="material-icons transition">arrow_downward</i>');
                            }
                        }
                        //summaryPanel.append('<i class="material-icons resultTransition">arrow_downward</i><br>');

                    }

                }
                
                if (route.legs[i].arrival_time) {summaryPanel.append('<p><i class="material-icons">access_time</i> Heure d\'arrivée : ' + route.legs[i].arrival_time.text + '<br>'); }
                summaryPanel.append('<i class="material-icons">pin_drop</i>Lieu d\'arrivée : ' + document.getElementById('arrivee').value + ", " + route.legs[i].end_address+'</p>');


                $('#map').css('height', '70%');
                resultSearch.fadeIn(500); // display the direction detail
                routeForm.fadeOut(500); // hide form

            }

        } else {

            //error message
            var $toasttext = $('<div class="alert"> <span> La requête de direction a échoué, veuillez faire une nouvelle recherche </span> <button id="closebutton" type="button" class="close" data-dismiss="alert">×</button> </div> ');
            Materialize.toast( $toasttext,6500);
            $( "#closebutton" ).click(function() {
                $( ".toast" ).remove();
            });
        }

    });
}





/**
 * Get the date and the time specified by the user in the form
 * @return none
 */
function getDateTimeUser(){

    // value of input date
    var date = document.getElementsByName('date1_submit')[0].value;
    var heureChoisie = $("#timepicker").val().split(":");
    var currDate = new Date();
    
    if(date != ""){
    	// create timestamp
    	var time = new Date(date);
    }else {
    	var time = currDate;
    }
    if(heureChoisie != "" && heureChoisie.length == 2){
    	var heure = heureChoisie[0];
    	var minutes = heureChoisie[1];
    	
    	time.setHours(heure);
    	time.setMinutes(minutes);
    }else {
    	currHours = currDate.getHours();
    	currMinutes = currDate.getMinutes();
    	time.setHours(currHours);
    	time.setMinutes(currMinutes);
    }


    if (time.getDate() < currDate.getDate()){ time.setDate(currDate.getDate()); } // handles old date
//    if (time.getTime() < currDate.getTime()){ time.setTime(currDate.getTime()); } // handles old time

    //handles hours below 6:30
    if (time.getHours() < 6 || (time.getHours() == 6 && time.getMinutes() < 30 )){
        time.setHours(6);
        time.setMinutes(30);
    }
    
    return time;
    // create timestamp for the departureTime option from the var Request, google map api ONLY accepts this formulation for departure Time
}


/**
 * Switches the two locations specified by the user and showes returning direction
 * @return none
 */
function showReturnDirection(){

    //form values swapping
    var x = document.getElementById('depart').value;
    document.getElementById('depart').value = document.getElementById('arrivee').value;
    document.getElementById('arrivee').value = x;

    var summaryPanel = $('.results'), resultSearch = $('.resultSearch'), routeForm = $('.routeForm'), modifSearchButton = $('.modifSearchButton');
    summaryPanel.html('');

    initMap();

    //locations swapping
    var t = arrivee; arrivee = depart; depart = t;

    //draw returning direction
    drawDirection();

}