

//initialize map
const map = L.map('map').fitWorld();

L.tileLayer.provider('OpenTopoMap').addTo(map);

//set view to current location on load
map.locate({setView: true, maxZoom: 14});

function onLocationFound(e) {
    var radius = e.accuracy;

    L.marker(e.latlng).addTo(map)
        .bindPopup("You are within " + radius + " metres of this area").openPopup();

    L.circle(e.latlng, radius).addTo(map);
}

map.on('locationfound', onLocationFound);

function onLocationError(e) {
    alert(e.message);
}

map.on('locationerror', onLocationError);

//Ajax call to get all country names to populate the select form

$.ajax({
    url: 'libs/php/restCountries.php',
    type: 'POST',
    dataType: 'json',
    data: {},
    success: function(result) {

        console.log(result);

        if (result.status.name == 'ok') {
            
            $.each(result.data, (index, item) => { 
                $('#select').after($('<option>').text(item.name).attr('value', item.alpha3Code));
                
                index++;
            })
   

        }
    
    },
    error: function(jqXHR, textStatus, errorThrown) {
        // your error code
    }
}); 