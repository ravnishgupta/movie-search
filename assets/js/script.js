var omdbURL = 'http://www.omdbapi.com/';
var imdbURL = '';
var ravAPIK = '95233c90';
var imdbKey = 'k_06r6ebsu';

var insertPosterEl = document.querySelector('.insert-posters');
var formEl = document.querySelector('.movie-search');
var inputEl = document.querySelector('#movie-title');

var formSubmitHandler = function(event) {
  event.preventDefault();

  var movieName = inputEl.value.trim();

  if (movieName) {
    getOMDBMovie(movieName);
  }
  else {
      alert('Please enter a valid movie title.');
  }
};

var getOMDBMovie = function(movieName) {

    var apiURL = omdbURL + '?s=' + movieName + '&apikey=' + ravAPIK;
    
    fetch(apiURL).then(function(response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function(data) {
            console.log(data);
            if (data.Response === "True") {
            displayPosters(data);
            }
            else {
              alert("Please enter a valid movie title.")
            }
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

  insertPosterEl.innerHTML = "";

  for (var i = 0; i < 3; i++) {

    var movieTitle = data.Search[i].Title;
    var moviePoster = data.Search[i].Poster;

    if (moviePoster != "N/A") {
      var cardContainerEl = document.createElement("div");
      cardContainerEl.classList = ("pure-form");
      cardContainerEl.setAttribute("id", i);
      cardContainerEl.setAttribute("style", "width:33.33333%");
      insertPosterEl.appendChild(cardContainerEl);
  
      var cardEl = document.createElement("div");
      cardEl.classList = ("card");
      cardContainerEl.appendChild(cardEl);

      var cardImgEl = document.createElement("img");
      cardImgEl.classList = ("card-image");
      cardImgEl.setAttribute("src", moviePoster);
      cardEl.appendChild(cardImgEl);

      var cardBodyEl = document.createElement("div");
      cardBodyEl.classList = ("card-content");
      cardEl.appendChild(cardBodyEl);
  
      var cardTitleEl = document.createElement("h5")
      cardTitleEl.classList = ("card-footer");
      cardTitleEl.setAttribute("style", "text-align: center;");
      cardTitleEl.textContent = (movieTitle);
      cardBodyEl.appendChild(cardTitleEl);
    }

    else {
      break;
    }
  }
};




formEl.addEventListener('submit', formSubmitHandler);


function saveSearch(search) {
  var tmp = ''
  var existing = [];
  if (localStorage.getItem('movieSearch')) {
    existing = localStorage.getItem('movieSearch').split(';');
    tmp = localStorage.getItem('movieSearch');
  }
  if (existing.indexOf(search) === -1){
    tmp += search + ";";
    localStorage.setItem('movieSearch', tmp);
  }
}

function showRecentSearches() {
  var myDiv = $("#recentSearches")
  var existing = [];
  if (localStorage.getItem('movieSearch')) {
    existing = localStorage.getItem('movieSearch').split(';');
    for (var i=0; i<existing.length; i++) {
      var t =  document.createElement("h6");
      t.innerText = existing[i];
      myDiv.append(t) = existing[i]
    }
  }
}


/* <div class="pure-form" style="width:33.33333%">
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
                </div> */


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

