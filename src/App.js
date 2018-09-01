import React, { Component } from 'react';
import './App.css';
import Films from "./Films"

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      films: []
    }
  }

  componentWillMount() {
    window.chrome.extension.sendMessage({ msg: 'films' }, (response) => {
      this.setState({ films: response.films ? response.films : [] });
    });
  }

  updateFilms() {
    this.setState({ films: [] });
    window.chrome.extension.sendMessage({ msg: 'updateFilms' }, (response) => {
      this.componentWillMount();
    });
  }

  render() {
    return (
      <div className="App">
        <button onClick={() => this.updateFilms()}>Обновить</button>
        {
          this.state.films.length ?
            <Films
              films={this.state.films}
            />
            :
            <p>Идет поиск...</p>
        }
      </div>
    );
  }
}

export default App;
