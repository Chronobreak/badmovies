import React from 'react';
import ReactDOM from 'react-dom';
// import AnyComponent from './components/filename.jsx'
import Search from './components/Search.jsx'
import Movies from './components/Movies.jsx'
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
      movies: [{deway: "movies"}],
      favorites: [{deway: "favorites"}],
      showFaves: false,
      genre: 28
    };
    
    // you might have to do something important here!
    // bind functions
    this.getMovies = this.getMovies.bind(this);
    this.getFavorites = this.getFavorites.bind(this);
    this.saveMovie = this.saveMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
    this.swapFavorites = this.swapFavorites.bind(this);
    this.selectGenre = this.selectGenre.bind(this);
  }

  selectGenre(e) {
    this.setState({
      genre: e.target.value
    })
  }

  getMovies() {
    axios.get('/search', {
      params: {term: this.state.genre} // Remember this part - send as params
    })
      .then((result) => {
        console.log('Console logging result.data.result from getMovies axios call: ', result.data.results)
        this.setState({
          movies: result.data.results
        })
      })
      .catch(() => console.log('CONSOLE LOGGING ERROR FROM GETMOVIES AXIOS REQUEST'))
  }

  getFavorites() {
    // Function will call and get results from database
    axios.get('/favorites')
    .then((result) => {
      console.log("Console logging return from app.get/FAVORITES", result)
      this.setState({
        favorites: result
      })
    })
  }

  saveMovie() {

    // onClick, save the movie to your database
  }

  deleteMovie() {
    // onClick, will delete the movie from the database
  }

  swapFavorites() {
  //dont touch
    this.setState({
      showFaves: !this.state.showFaves
    });
  }

  componentDidMount() {
    this.getMovies();
    this.getFavorites();
  }

  render () {
  	return (
      <div className="app">
        <header className="navbar"><h1>Bad Movies</h1></header> 
        
        <div className="main">
          <Search swapFavorites={this.swapFavorites} showFaves={this.state.showFaves}
            getMovies={this.getMovies} selectGenre={this.selectGenre}/>
          <Movies movies={this.state.showFaves ? this.state.favorites : this.state.movies} showFaves={this.state.showFaves}
            saveMovie={this.saveMovie} deleteMovie={this.deleteMovie}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));