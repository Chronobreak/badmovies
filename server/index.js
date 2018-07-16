var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var axios = require('axios');
var apiHelpers = require('./apiHelpers');
var db = require('../server/database')

app.use(bodyParser.json());

// Due to express, when you load the page, it doesn't make a get request to '/', it simply serves up the dist folder
app.use(express.static(__dirname + '/../client/dist'));

app.get('/search', function(req, res) {
    axios.get(`https://api.themoviedb.org/3/discover/movie/?with_genres=${req.query.term}&sort_by=vote_average.asc&api_key=dc4930730bcbbe062437aa6b52dee622`)
        .then((result) => {
            res.send(result.data)})
        .catch(() => console.log('Console logging error in server APP.GET/SEARCH'))
    // use this endpoint to search for movies by genres, you will need an API key
    // https://api.themoviedb.org/3/discover/movie
    // and sort them by horrible votes using the search parameters in the API
});

app.get('/genres', function(req, res) {
    // make an axios request to get the list of official genres
    axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=dc4930730bcbbe062437aa6b52dee622')
    .then((result) => {
        res.send(result.data.genres);
    })
});

app.get('/favorites', function(req, res) {
    let sqlQuery = "SELECT * FROM favorites";
    db.connection.query(sqlQuery, (err, data) => {
        if (err) console.log("Console logging error from app.get/FAVORITES: ", err)
        else {
            console.log('Console logging result when fetching favorites: ', data)
            // let returnObj = data.map(() => {

            // })
            res.send(data)
        }
    })
})

app.post('/save', function(req, res) {
    console.log('Console logging to see if app.post/SAVE is firing')
    let sqlQuery = "INSERT INTO favorites (id, poster_path, original_title, release_date, vote_average) values (?, ?, ?, ?, ?)";
    let params = [req.body.id, req.body.poster, req.body.title, req.body.releasedate, req.body.rating]
    db.connection.query(sqlQuery, params, (err, data) => {
        if (err) console.log("Console logging error from app.post/SAVE: ", err)
        else {
            console.log(data);
            res.sendStatus(201);
        }
    })


});

app.post('/delete', function(req, res) {
    let sqlQuery = "";


});

app.listen(3000, function() {
    console.log('listening on port 3000!');
});
