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
      genre: 878
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
      this.setState({
        favorites: result.data
      })
    })
  }

  saveMovie(e) {
    // onClick, save the movie to your database
    axios.post('/save', {
      id: e.id,
      poster: e.poster_path,
      title: e.original_title,
      releasedate: e.release_date,
      rating: e.vote_average
    })
  }

  deleteMovie(e) {
    // onClick, will delete the movie from the database
    axios.post('/delete', {
      id: e.id
    })
    .then(()=> {
      this.getFavorites();
    })
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
            getMovies={this.getMovies} selectGenre={this.selectGenre} getFavorites={this.getFavorites}/>
          <Movies movies={this.state.showFaves ? this.state.favorites : this.state.movies} showFaves={this.state.showFaves}
            saveMovie={this.saveMovie} deleteMovie={this.deleteMovie}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));