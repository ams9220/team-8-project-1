var genres = [];

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


const clientId = '03d8e475016f40709515ff7168828110';
const clientSecret = 'a5e76637ec5544bb88cdc130e089668d';
var token = "";


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
    console.log(data.access_token);
    token = data.access_token;
    _getGenres();
        
    }
    
const _getGenres = async () => {

    const result = await fetch(`https://api.spotify.com/v1/browse/categories?locale=sv_US`, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
    });
        
    const data = await result.json();
    console.log(data);

    return data.categories.items;
}




_getToken();