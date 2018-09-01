import React, { Component } from 'react';
import FilmItem from "./FilmItem";
import FilmDetail from "./FilmDetail";

class Films extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showFilms: true,
      showDetail: false,
      film: null
    }
  }

  handleShowFilms() {
    this.setState({ showDetail: false, showFilms: true });
  }

  handleShowDetails(film) {
    this.setState({ showDetail: true, showFilms: false, film: film });
  }

  generateFilms() {
    return this.props.films.map(film => {
      return (
        <FilmItem
          film={film}
          handleShowDetails={() => { this.handleShowDetails(film) }}
        />
      )
    });
  }

  render() {
    return (
      <div>
        {this.state.showFilms && this.generateFilms()}
        {this.state.showDetail && <FilmDetail
          detail={this.state.film}
          handleShowFilms={() => { this.handleShowFilms() }}
        />}
      </div>
    );
  }
}

export default Films;
