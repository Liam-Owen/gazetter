
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

let currencyCode;
let currencyName;
let lon;
let lat;
//Ajax call to get all country names to populate the select form and display the data

$.ajax({
    url: 'libs/php/restCountries.php',
    type: 'POST',
    async:false,
    dataType: 'json',
    data: {},
    success: function(result) {
        
        console.log(result);

        if (result.status.name == 'ok') {
            
            $.each(result.data, (index, item) => { 
                $('#select').after($('<option>').text(item.name).attr('value', item.alpha3Code));
                
                index++;
            })

            // Iterates through the data and finds the index relating to the country selected, this can then be used to pull all of the data for that country 
            $('#selectForm').on('change', () => {
            console.log($('#selectForm').val());
            for(let i = 0; i < result.data.length; i++){
           

                if(result.data[i].alpha3Code === $('#selectForm').val()) {
                    
                    document.getElementById('modalHead').innerHTML = result.data[i].name;
                    document.getElementById('flag').setAttribute('src', result.data[i].flag);
                    document.getElementById('popBody').innerHTML = result.data[i].population;
                    document.getElementById('capBody').innerHTML = result.data[i].capital;
                    document.getElementById('langBody').innerHTML = " ";
                    document.getElementById('currenciesBody').innerHTML = " ";
                    lat = result.data[i].latlng[0];
                    lon = result.data[i].latlng[1];
                    currencyCode = result.data[i].currencies[0].code;
                    currencyName = result.data[i].currencies[0].name;
                    
                    
                    for(let j = 0; j <result.data[i].languages.length; j++){
                        $('#langBody').append(result.data[i].languages[j].name + ", ");
                    }
                    for(let k = 0; k <result.data[i].currencies.length; k++){
                        $('#currenciesBody').append(result.data[i].currencies[k].name + ", ");
                    }
  
                }
            }
          
          
           })

        }
    
    },
    error: function(jqXHR, textStatus, errorThrown) {
        // your error code
    }
}); 

// OpenWeather Ajax call
$('#selectForm').on('change', () => {
$.ajax({
    url: 'libs/php/openWeather.php',
    type: 'POST',
    async:false,
    dataType: 'json',
    data: {
        lat: lat,
        lon: lon,
    },
    success: function(result) {
        
        console.log(result);
      

        if (result.status.name == 'ok') {
            //for(let i = 0; i < result.data.length; i++){
           
            let currentTemp= Math.round(result.data.current.temp);
            console.log(currentTemp);

            document.getElementById('icon1').setAttribute('src',"http://openweathermap.org/img/wn/" + result.data.current.weather[0].icon + "@2x.png");
            document.getElementById('weatherDescription1').innerHTML = result.data.current.weather[0].description.toUpperCase();
           //reset elements 
            document.getElementById('currentTemp1').innerHTML = "";
            document.getElementById('tempDay1').innerHTML = "";
            document.getElementById('tempNight1').innerHTML = "";
            document.getElementById('tempDay2').innerHTML = "";
            document.getElementById('tempNight2').innerHTML = "";
            //Add relevant temp data
            $('#currentTemp1').prepend("Current Temperature: " + currentTemp);
            $('#tempDay1').prepend("Day Temperature: " + result.data.daily[0].temp.day);
            $('#tempNight1').prepend("Night Temperature: "+ result.data.daily[0].temp.night);

            document.getElementById('icon2').setAttribute('src',"http://openweathermap.org/img/wn/" + result.data.daily[1].weather[0].icon + "@2x.png");
            document.getElementById('weatherDescription2').innerHTML = result.data.daily[1].weather[0].description.toUpperCase();
            $('#tempDay2').prepend("Day Temperature: " + result.data.daily[1].temp.day);
            $('#tempNight2').prepend("Night Temperature: "+ result.data.daily[1].temp.night);
    
            
       // }
    
        }    
    },

    error: function(jqXHR, textStatus, errorThrown) {
        // your error code
    }
}); 
$.ajax({
    url: 'libs/php/exchange.php',
    type: 'POST',
    async:false,
    dataType: 'json',
    data: {
    },
    success: function(result) {
        
        console.log(result);
      
        
        const currencyNames = Object.keys(result.data.rates);

        if (result.status.name == 'ok') {
            $.each(currencyNames, (index, item) => { 
                $('#currencyOption').after($('<option>').text(item).attr('value', item));
                
                index++;
            })
            $('#currency').on('change', () => {

               let selCurrency = $('#currency').val()

                let selExchangeRate = result.data.rates[test];
                let UsdConversion = result.data.rates.usd;
                console.log(selExchangeRate);

                
                for(let i = 0; i < result.data.rates.length; i++){

                    
                }
            })
        
        }
    
           
    },

    error: function(jqXHR, textStatus, errorThrown) {
        // your error code
    }
}); 
});