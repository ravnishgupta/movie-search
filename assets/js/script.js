var omdbURL = 'http://www.omdbapi.com/';
var imdbURL = '';
var ravAPIK = '95233c90';
var imdbKey = 'k_06r6ebsu';

var insertPosterEl = document.querySelector('.insert-posters');
var formEl = document.querySelector('.movie-search');
var inputEl = document.querySelector('#movie-title');

var formSubmitHandler = function(event) {
  event.preventDefault();

  insertPosterEl 

  var movieName = inputEl.value.trim();

  if (movieName) {
      getOMDBMovie(movieName);
  }
  else {
      alert('Please enter a valid movie title.');
  }
};

var getOMDBMovie = function(movieName) {

    //var movieName = 'Avengers'; //to be replaced with the text in the input box @Natalie need the name of the input box
    var apiURL = omdbURL + '?s=' + movieName + '&apikey=' + ravAPIK; //https://www.omdbapi.com/?s=ave*&apikey=95233c90
    
    fetch(apiURL).then(function(response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function(data) {
            console.log(data);
            displayPosters(data);
        });
      }
      else { 
        alert("Error: " + response.statusText);
      }
    })
    .catch(function(error) {
        alert("Unable to connect to OMDB. Please try again later.");
    });
};


var displayPosters = function(data) {

  for (var i = 0; i < 3; i++) {

    var movieTitle = data.Search[i].Title;
    var moviePoster = data.Search[i].Poster;

    var cardContainerEl = document.createElement("div");
    cardContainerEl.classList = ("pure-form");
    cardContainerEl.setAttribute("id", i);
    cardContainerEl.setAttribute("style", "width:33.33333%");
    insertPosterEl.appendChild(cardContainerEl);

    var cardEl = document.createElement("div");
    cardEl.classList = ("card");
    cardContainerEl.appendChild(cardEl);

    if (moviePoster != "N/A") {
      var cardImgEl = document.createElement("img");
      cardImgEl.classList = ("card-image");
      cardImgEl.setAttribute("src", moviePoster);
      cardEl.appendChild(cardImgEl);
    }

    else {
      break;
    }

    var cardBodyEl = document.createElement("div");
    cardBodyEl.classList = ("card-content");
    cardEl.appendChild(cardBodyEl);

    var cardTitleEl = document.createElement("h5")
    cardTitleEl.classList = ("card-footer");
    cardTitleEl.setAttribute("style", "text-align: center;");
    cardTitleEl.textContent = (movieTitle);
    cardBodyEl.appendChild(cardTitleEl);
  }

};

formEl.addEventListener('submit', formSubmitHandler);

{/* <div class="pure-form" style="width:33.33333%">
<div class="card">
    <img class="card-image" src="https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg" />
    <div class="card-content">
        <h5 class="card-footer" style="text-align: center;">Movie Title 1</h5>
    </div>
</div>
</div>


                <div class="pure-form" style="width:33.33333%">
                    <div class="card">
                        <img class="card-img-top" src="https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg" />
                        <div class="card-body">
                            <h5 class="card-title" style="text-align: center;">Movie Title 1</h5>
                        </div>
                    </div>
                </div> */}


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

