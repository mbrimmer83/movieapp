//page of results, currently being displayed
var page = 1;
var currentForm;
var movieID;
var img;

//fucntions
function getMovies() {
  currentForm = $('input:text').val();
  //ajax call to get results based on user input; currentForm
  $.ajax({
    method: 'GET',
    url: 'http://www.omdbapi.com/',
    dataType: 'json',
    data: {
      s: currentForm,
      page: page
    },
    success: function(data) {
      //increment the page variable
      page++;
        console.log(data);
       if(data.totalResults > 10){
         $('#moreResults').show();
       }
      //display results to page
      var dataSearch = data.Search;
      for(var i = 0; i < dataSearch.length; i++){
        var a  = $('<a>').attr('href', 'http://www.imdb.com/title/' + dataSearch[i].imdbID).data('imdbID', dataSearch[i].imdbID);
        // var a  = $('<a>').attr('href', '#details-page');
        var img = $('<img>').attr('src', dataSearch[i].Poster).attr('alt', dataSearch[i].Title);
        a.append(img)
        $('#results').append(a);

      }
    }
  });
}

//function that gets the movie data for the moive img selected
function getMovieDetails(){
  console.log($('a').data('imdbID'));
  $.ajax({
    method: 'GET',
    url: 'http://www.omdbapi.com/',
    dataType: 'json',
    data: {
      i: movieID,
    },
    success: function(data) {
      console.log(data);
      img = $('<img>').attr('src', data.Poster).attr('alt', data.Title);
      console.log(data.Poster);
      //poster, title, actors, director, country, genre, plot, rated, runtime, year, rating, votes
      $('#details-page').append(img);
      $('#details-page .title').text(data.Title);
      $('#details-page .director').text(data.Director);
      $('#details-page .actors').text(data.Actors);
      $('#details-page .country').text(data.Country);
      $('#details-page .genre').text(data.Genre);
      $('#details-page .plot').text(data.Plot);
      $('#details-page .rated').text(data.Rated);
      $('#details-page .runtime').text(data.Runtime);
      $('#details-page .year').text(data.Year);
      $('#details-page .rating').text(data.imdbRating);
      $('#details-page .votes').text(data.imdbVotes);
    }
  });
}

//docuemnt ready funtion
$(function() {
  //hides the moreResults button
  $('#moreResults').hide();
  $('#details-page').hide();

  $('form').submit(function(event) {
    event.preventDefault(); // prevents default submit from html
    $('#results').html('');
    page = 1;
    getMovies();
  });

  $('#moreResults').click(function() {
    getMovies();
  });
  $('#results').on('click', 'a', function(event) {
    event.preventDefault();

    $('#search-page').hide();
    $('#details-page').show();
    movieID = $(this).data('imdbID');

    getMovieDetails();
  });
  $('#backResults').click(function() {
    img.remove();
    $('#details-page').hide();
    $('#search-page').show();
  });

});
