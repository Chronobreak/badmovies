import React from 'react';
import axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      genres: []
    };
  }
  getGenres() {
    //make an axios request in this component to get the list of genres from your endpoint GET GENRES
    axios.get('/genres')
    .then((result) => {
      this.setState({
        genres: result.data
      });
    });
  }

  componentDidMount() {
    this.getGenres();
  }

  render() {
    return (
      <div className="search">
        <button onClick={() => {
          this.props.swapFavorites()
          this.props.getFavorites()
          }}>{this.props.showFaves ? "Show Results" : "Show Favorites"}</button>
        <br/><br/>

        <select onChange={this.props.selectGenre}>
          {
            this.state.genres.map((item) => {
              return (
                <option value={item.id}>{item.name}</option>
              )
            })
          }
        </select>
        <br/><br/>

        <button onClick={this.props.getMovies}>Search</button>

      </div>
    );
  }
}

export default Search;
