import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
class App extends Component {
  constructor() {
    super();
  }

  componentDidMount() {}

  onClick = () => {
    fetch('http://localhost:3000/api/v1/timetable/9731/30')
      .then(data => {
        if (data.ok) {
          return data.json();
        } else {
          return {
            fault: 'Unexcpected Error',
            error: data
          };
        }
      })
      .then(json => {
        console.log(json);
        let timetable, trains, buses, meta;

        if (json.timetable) {
          timetable = json.timetable;
          trains = json.timetable.Trains ? json.timetable.Trains : null;
          buses = json.timetable.Buses ? json.timetable.Buses : null;
        }

        this.setState({
          trains: trains,
          buses: buses
        });
      });
  };

  render() {
    return (
      <div id="app" className="App">
        <a href="#" onClick={this.onClick}>
          Click Me
        </a>
        <main className="container">
          <section className="row trains">
            <h1 className="title">Pendeltåg</h1>
            <div className="journey">
              <p>
                43 Västerhaninge - 7 min /{' '}
                <span className="delay">21:06:00</span> 21:06:00
              </p>
            </div>
            <div className="journey">
              <p>43 Västerhaninge - 8 min</p>
            </div>
          </section>
          <section className="row buses">
            <h1 className="title">Bussar</h1>
          </section>
        </main>
      </div>
    );
  }
}

export default App;
