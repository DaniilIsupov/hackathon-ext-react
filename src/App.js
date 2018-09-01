import React, { Component } from 'react';
import './App.css';
import Films from "./Films"

class App extends Component {
  constructor(props) {
    super(props);

    let d = new Date().getDate();
    let m = new Date();
    let month = [
      "Января",
      "Февраля",
      "Марта",
      "Апреля",
      "Мая",
      "Июня",
      "Июля",
      "Августа",
      "Сентября",
      "Октября",
      "Ноября",
      "Декабря"
    ];

    this.state = {
      films: [],
      time: (d + month[m.getMonth()]).toLocaleString()
    }
  }

  componentWillMount() {
    window.chrome.extension.sendMessage({ msg: 'films' }, (response) => {
      console.log(response);
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
    let showFilms = this.state.films.length > 0;
    return (
      <div className="App">
        <p className="App-clock">
          Расписание на {this.state.time}
        </p>
        <button onClick={() => this.updateFilms()}>Обновить</button>
        {
          showFilms &&
          <Films
            films={this.state.films}
            updateFilms={() => this.updateFilms()}
          />
        }
        {!showFilms &&
          <div>
            <p>Идет поиск...</p>
          </div>}
      </div >
    );
  }
}

export default App;
