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
  render() {
    return (
      <div className="App">
        {
          this.state.films.length ?
            <Films
              films={this.state.films}
            />
            :
            <p>films founding</p>
        }
      </div>
    );
  }
}

export default App;
