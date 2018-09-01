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
    window.chrome.storage.sync.get('films', async (result) => {      
      this.setState({ films: result.films.hasOwnProperty('films') ? result.films.films : [] });
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
