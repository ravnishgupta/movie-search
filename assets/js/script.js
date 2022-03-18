var omdbURL = 'https://www.omdbapi.com/';
var imdbURL = 'https://imdb-api.com/en/API/Title/';
var omdbAPIK = '95233c90';
var imdbKey = 'k_06r6ebsu';

var insertPosterEl = document.querySelector('.insert-posters');
var formEl = document.querySelector('.movie-search');
var inputEl = document.querySelector('#movie-title');


var formSubmitHandler = function(event) {
  event.preventDefault();

  var movieName = inputEl.value.trim();

  if (movieName) {
    getOMDBMovie(movieName);
    saveSearch(movieName);
    showRecentSearches()
  }

  else {
      showModal('Please enter a valid movie title.');
  }
};

var getOMDBMovie = function(movieName) {

    var apiURL = omdbURL + '?s=' + movieName + '&apikey='  + omdbAPIK;
    
    fetch(apiURL).then(function(response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function(data) {
            console.log(data);
            if (data.Response === "True") {
            displayPosters(data);
            }
            else {
              showModal("Please enter a valid movie title.");
              inputEl.value = '';
              
            }
        });
      }
      else { 
        showModal("Error: " + response.statusText);
      }
    })
    .catch(function(error) {
      showModal("Unable to connect to OMDB. Please try again later.");
    });
};


var displayPosters = function(data) {

  insertPosterEl.innerHTML = "";

  for (var i = 0; i < 3; i++) {

    var movieTitle = data.Search[i].Title;
    var moviePoster = data.Search[i].Poster;
    var movieId = data.Search[i].imdbID;

    if (moviePoster != "N/A") {
      var cardContainerEl = document.createElement("div");
      cardContainerEl.classList = ("pure-form");
      cardContainerEl.setAttribute("style", "width:33.33333%");
      insertPosterEl.appendChild(cardContainerEl);
  
      var cardEl = document.createElement("div");
      cardEl.classList = ("card");
      cardContainerEl.appendChild(cardEl);

      var cardImgEl = document.createElement("img");
      cardImgEl.classList = ("card-image");
      cardImgEl.setAttribute("src", moviePoster);
      cardImgEl.setAttribute("id", movieId);
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

var moviePosterHandler = function(event) {
  
  var targetEl = event.target;

  if (targetEl.matches(".card-image")) {
    var imdbId = targetEl.getAttribute("id");
    fetchMovieInfo(imdbId);
  }
};

var fetchMovieInfo = function(imdbId) {

    var apiURL = imdbURL + imdbKey + "/" + imdbId;
    
    fetch(apiURL).then(function(response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function(data) {
          console.log(data);
          displayMovieInfo(data);
        });
      }
      else { 
        showModal("Error: " + response.statusText);
      }
    })
    .catch(function(error) {
      showModal("Unable to connect to OMDB. Please try again later.");
    });
};

var displayMovieInfo = function(data) {

  insertPosterEl.innerHTML = "";

  var poster = data.image;
  var title = data.fullTitle;
  var rating = data.contentRating;
  var director = data.directors;
  var writers = data.writers;
  var genres = data.genres;
  var stars = data.stars;
  var imdbRating = data.imDbRating;
  var runtime = data.runtimeStr;
  var plot = data.plot;
  var metaCritic = data.metacriticRating;

  var posterContainerEl = document.createElement("div");
  posterContainerEl.classList = ("col-3 poster");
  insertPosterEl.appendChild(posterContainerEl);

  var posterImageEl = document.createElement("img");
  posterImageEl.setAttribute("src", poster);
  posterContainerEl.appendChild(posterImageEl);

  var movieInfoContainerEl = document.createElement("div");
  movieInfoContainerEl.classList = ("col-9 movie-info");
  insertPosterEl.appendChild(movieInfoContainerEl);

  var rowEl = document.createElement("div");
  rowEl.classList = ("row");
  movieInfoContainerEl.appendChild(rowEl);

  var generalInfoContainerEl = document.createElement("div");
  generalInfoContainerEl.classList = ("col-6");
  rowEl.appendChild(generalInfoContainerEl);

  var titleEl = document.createElement("h2");
  titleEl.classList = ("movie-title");
  titleEl.textContent = title;
  generalInfoContainerEl.appendChild(titleEl);

  var generalInfoGroupEl = document.createElement("ul");
  generalInfoGroupEl.classList = ("title-info");
  generalInfoContainerEl.appendChild(generalInfoGroupEl);

  var runtimeEl = document.createElement("li");
  runtimeEl.textContent = "Runtime: " + runtime;
  generalInfoGroupEl.appendChild(runtimeEl);

  var ratingEl = document.createElement("li");
  ratingEl.textContent = "Rating: " + rating;
  generalInfoGroupEl.appendChild(ratingEl);

  var genresEl = document.createElement("li");
  genresEl.textContent = "Genres: " + genres;
  generalInfoGroupEl.appendChild(genresEl);

  var castCrewContainerEl = document.createElement("div");
  castCrewContainerEl.classList = ("col-6");
  rowEl.appendChild(castCrewContainerEl);

  var castCrewTitleEl = document.createElement("h3");
  castCrewTitleEl.classList = ("cast-title");
  castCrewTitleEl.textContent = "Cast and Crew";
  castCrewContainerEl.appendChild(castCrewTitleEl);

  var castCrewUlEl = document.createElement("ul");
  castCrewUlEl.classList = ("cast-crew");
  castCrewContainerEl.appendChild(castCrewUlEl);

  var directorEl = document.createElement("li");
  directorEl.textContent = "Directors: " + director;
  castCrewUlEl.appendChild(directorEl);

  var writersEl = document.createElement("li");
  writersEl.textContent = "Writers: " + writers;
  castCrewUlEl.appendChild(writersEl);

  var starsEl = document.createElement("li");
  starsEl.textContent = "Starring: " + stars;
  castCrewUlEl.appendChild(starsEl);

  var plotReviewsContainerEl = document.createElement("div");
  plotReviewsContainerEl.classList = ("row plot-reviews-container");
  movieInfoContainerEl.appendChild(plotReviewsContainerEl);

  var plotReviewsTitleEl = document.createElement("h3");
  plotReviewsTitleEl.classList = ("plot-title");
  plotReviewsTitleEl.textContent = "Plot";
  plotReviewsContainerEl.appendChild(plotReviewsTitleEl);

  var plotReviewsUlEl = document.createElement("ul");
  plotReviewsUlEl.classList = ("plot-reviews");
  plotReviewsContainerEl.appendChild(plotReviewsUlEl);

  var plotEl = document.createElement("li");
  plotEl.textContent = plot;
  plotReviewsUlEl.appendChild(plotEl);

  var breakEl = document.createElement("br");
  plotReviewsUlEl.appendChild(breakEl);

  var ratingsTitleEl = document.createElement("h3");
  ratingsTitleEl.classList = ("ratings-title");
  ratingsTitleEl.textContent = "Ratings";
  plotReviewsUlEl.appendChild(ratingsTitleEl);

  var imdbRatingEl = document.createElement("li");
  imdbRatingEl.textContent = "IMDB Rating: " + imdbRating;
  plotReviewsUlEl.appendChild(imdbRatingEl);

  var metacriticRatingEl = document.createElement("li");
  metacriticRatingEl.textContent = "MetaCritic Rating: " + metaCritic;
  plotReviewsUlEl.appendChild(metacriticRatingEl);

};


insertPosterEl.addEventListener("click", moviePosterHandler);

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
  
  var ulEl = document.getElementById("recents");
  ulEl.innerHTML = ''
  var existing = [];
  if (localStorage.getItem('movieSearch')) {
    existing = localStorage.getItem('movieSearch').split(';');
    for (var i=0; i<existing.length; i++) {
      if (existing[i].length > 0) {
        var liEl = document.createElement("li");
        //debugger;

        var a =  document.createElement("a");
        var link = document.createTextNode(existing[i]);

        a.appendChild(link);
        a.title = existing[i];
        a.href = "test.html"
    
        liEl.appendChild(a);
        ulEl.appendChild(liEl);
        
      }
    }
  }
}

//Modal stuff



function showModal(message) {
  var myModal = document.getElementById("page-modal");
  var modalBody = document.getElementById("modalBody")
  modalBody.innerText = message
  myModal.style.display='block';

  inputEl.focus();
  
}

function closeModal() {
  var myModal = document.getElementById("page-modal");
  myModal.style.display = "none";
  inputEl.focus();
}
