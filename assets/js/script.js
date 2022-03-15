var omdbURL = 'http://www.omdbapi.com/';
var imdbURL = '';
var ravAPIK = '95233c90';

function getOMDBMovie() {
    var movieName = 'Guardians of the Galaxy Vol. 2' //to be replaced with the text in the input box @Natalie need the name of the input box
    var apiURL = omdbURL + '?s=' + movieName + '&apikey=' + ravAPIK; //https://www.omdbapi.com/?s=ave*&apikey=95233c90
    fetch(apiURL).then(function(response) {
      if (response.ok) {
        response.json().then(function(data) {
            console.log(data);
        
        })
      }
      else alert("Unable to connect to OMDB. Please try again later.");
    })
    .catch(function(error) {
        alert("Unable to connect to OMDB. Please try again later.");
    })
}


// function getLatLong(city) {
  
//     var apiURL = geoAPI + "?q=" + city + "&limit=1&appid=" + apiKey;
//     fetch(apiURL).then(function(response) {
//       if (response.ok) {
//         response.json().then(function(data) {
//           if (Object.keys(data).length === 0) {
    
//             lblCity.text("Invalid City. Please try again");
//             resetVal();
//           }
//           else {
//             lblCity.text(data[0].name + ", " + data[0].state + ", " + data[0].country);
//             lat = data[0].lat;
//             lon = data[0].lon; 
//             getCurrConditions(city);
          
//           }
//         })
//       }
//       else alert("Unable to connect to Open Weather. Please try again later.");
//     })
//     .catch(function(error) {
//       // Notice this `.catch()` getting chained onto the end of the `.then()` method
//       alert("Unable to connect to Open Weather. Please try again later.");
//     })
//   }