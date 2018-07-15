var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();
var axios = require('axios');
var apiHelpers = require('./apiHelpers');

app.use(bodyParser.json());

// Due to express, when you load the page, it doesn't make a get request to '/', it simply serves up the dist folder
app.use(express.static(__dirname + '/../client/dist'));

app.get('/search', function(req, res) {
    console.log('Console logging req.body from servers/index, app.GET/search: ', req.body)
    // get the search genre     

    // https://www.themoviedb.org/account/signup

    // use this endpoint to search for movies by genres, you will need an API key

    // https://api.themoviedb.org/3/discover/movie

    // and sort them by horrible votes using the search parameters in the API
});

app.get('/genres', function(req, res) {
    // make an axios request to get the list of official genres
    axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=dc4930730bcbbe062437aa6b52dee622')
    .then((result) => console.log(result))
    
    // use this endpoint, which will also require your API key: https://api.themoviedb.org/3/genre/movie/list
    // https://api.themoviedb.org/3/genre/movie/list?api_key=dc4930730bcbbe062437aa6b52dee622
    // ^ Gets all genres!

    // send back
});

app.post('/save', function(req, res) {

});

app.post('/delete', function(req, res) {

});

app.listen(3000, function() {
    console.log('listening on port 3000!');
});
