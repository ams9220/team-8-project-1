/*-----------------------------------------------------------------------------------------------------                        
-                                           GLOBAL VARIABLES                  
-----------------------------------------------------------------------------------------------------*/

const clientId = '03d8e475016f40709515ff7168828110';
const clientSecret = 'a5e76637ec5544bb88cdc130e089668d';
var token = "";

var selectedGenre = "edm"; // needs to be replaced to clicked genre
var artistID = "";
var top10ArtistsNames = [];
var top10ArtistsImages = [];
var top10TrackImages = [];
var top10ArtistsPopularity = [];
var top10ArtistsGenre = [];
var top10ArtistsLink = [];

var top10trackImages = [];

$(document).ready(function(){
    $('.button-collapse').sideNav({
      menuWidth: 300, // Default is 300
      edge: 'left', // Choose the horizontal origin
      closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      draggable: true, // Choose whether you can drag to open on touch screens,
      onOpen: function(el) { /* Do Stuff*/ }, // A function to be called when sideNav is opened
      onClose: function(el) { /* Do Stuff*/ }, // A function to be called when sideNav is closed
    }
  );
      $('.parallax').parallax();
          $('#demo-carousel').carousel();   
});

/*-----------------------------------------------------------------------------------------------------                        
-                                           FETCH FUNCTIONS                   
-----------------------------------------------------------------------------------------------------*/

const _getToken = async () => {

    const result = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded', 
            'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    });
        // console.log(result.access_token);
    const data = await result.json();
//  console.log(data.access_token);
    token = data.access_token;
    _getGenres();
    // _getArtists();
    }
    
const _getGenres = async () => {

    const result = await fetch(`https://api.spotify.com/v1/browse/categories?locale=sv_US`, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
    });
        
    const data = await result.json();
    //console.log(data.categories.items);
    return data.categories.items;
}

const _getArtists = async () => {

    const result = await fetch('https://api.spotify.com/v1/search?q=genre:' + selectedGenre +'*&type=artist&market=US&limit=10', {
        method: 'GET',
        headers: {'Authorization' : 'Bearer ' + token},
        header: 'Content-Type : application/json' 
    });
    const data = await result.json();
    console.log(data.artists.items);
    //artistID = data.artists.items[0].id;
    for (i=0; i<10; i++) {

        top10ArtistsNames[i] = data.artists.items[i].name;
        top10ArtistsImages[i] = data.artists.items[i].images[0].url;
        top10ArtistsPopularity[i] = data.artists.items[i].popularity;
        top10ArtistsGenre[i] = data.artists.items[i].genres[0];
        top10ArtistsLink[i] = data.artists.items[i].external_urls.spotify;
        
    }
    //console.log(top10ArtistsNames);   
    //console.log(top10ArtistsImages);
    //console.log(top10ArtistsPopularity);
    //console.log(top10ArtistsGenre);
    //console.log(top10ArtistsLink);
    

    for (i=0; i<9; i++) {
        allocateImage(top10ArtistsImages[i]);
       // allocateImageTracks(top10TracksImages[i]);
    }
    
    return data.artists.items;
    
}

const _getTracks = async () => {
    const result = await fetch('https://api.spotify.com/v1/search?q=genre:' + selectedGenre + '*&type=track&market=US&limit=10', {
        methid: 'GET',
        headers: {'Authorization' : 'Bearer ' + token},
        header: 'Content-Type : application/json' 
    });
    const data = await result.json();
    console.log(data.tracks.items);

    for (i=0; i<10; i++) {
        
        top10trackImages[i] = data.tracks.items[i].album.images[0].url;
  
    }

    for (i=0; i<9; i++) {
        
        allocateImageTracks(top10trackImages[i]);
    }
    return data.tracks.items;
}

const _getAlbums = async () => {
    const result = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums?market=US&limit=3', {
        methid: 'GET',
        headers: {'Authorization' : 'Bearer ' + token},
        header: 'Content-Type : application/json' 
    });
    const data = await result.json();
    console.log(data);
    return data;
}
_getToken();

/*-----------------------------------------------------------------------------------------------------                        
-                                           POPULATE HTML                    
-----------------------------------------------------------------------------------------------------*/

var artist1 = document.querySelector('#artist1');
var artist2 = document.querySelector('#artist2');
var artist3 = document.querySelector('#artist3');
var artist4 = document.querySelector('#artist4');
var artist5 = document.querySelector('#artist5');
var artist6 = document.querySelector('#artist6');
var artist7 = document.querySelector('#artist7');
var artist8 = document.querySelector('#artist8');
var artist9 = document.querySelector('#artist9');

var track1 = document.querySelector('#track1');
var track2 = document.querySelector('#track2');
var track3 = document.querySelector('#track3');
var track4 = document.querySelector('#track4');
var track5 = document.querySelector('#track5');
var track6 = document.querySelector('#track6');
var track7 = document.querySelector('#track7');
var track8 = document.querySelector('#track8');
var track9 = document.querySelector('#track9');

var artistArr = [artist1, artist2, artist3, artist4, artist5, artist6, artist7, artist8, artist9];
var trackArr = [track1, track2, track3, track4, track5, track6, track7, track8, track9];

var imageCounter = 0;
var imageCounter2 = 0;

var allocateImage = function (img) {

    var imgEl = document.createElement('img');
    imgEl.src = img;
    artistArr[i].appendChild(imgEl);
    imageCounter++;
}

var allocateImageTracks = function (img) {

    var imgEl = document.createElement('img');
    imgEl.src = img;
    trackArr[i].appendChild(imgEl);
    imageCounter2++;
}

/*-----------------------------------------------------------------------------------------------------                        
-                                           GENRE SELECTION                    
-----------------------------------------------------------------------------------------------------*/


$('.genre-selection').each(function() {
    $(".genre-section").on("click", function assignGenre() {
    selectedGenre = $(this).attr('id');
    console.log('RIGHT HERE')
    console.log(selectedGenre);
    //console.log(this.id);
    //console.log(this);
    _getArtists();
    _getTracks();
    imageCounter = 0;
    imageCounter2 = 0;
    });
})

    // var clickedEl = document.addEventListener('click', function assignGenre() {
    // selectedGenre = $('.genre-section').attr('id');
    // console.log(this.id);
    // console.log(selectedGenre);

    // var currentID = this.id;
    // console.log(currentID);
    // $(this).html(currentID);




//var rockDivButton = document.querySelector('')