import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import trainIcon from './logo.svg';
import Departure from './Components/Departure';
class App extends Component {
  constructor() {
    super();
    this.state = {
      meta: {
        fetched: null,
        message: ''
      },
      trains: null,
      buses: null
    };
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

        if (json.meta) {
          if (json.meta.updatedData) {
            json.meta = {
              updatedData: new Date(json.meta.updatedData)
                .toTimeString()
                .substring(0, 8)
            };
          }
          meta = json.meta;
        }

        if (json.timetable) {
          timetable = json.timetable;
          trains = json.timetable.Trains ? json.timetable.Trains : null;
          buses = json.timetable.Buses ? json.timetable.Buses : null;
        }

        this.setState({
          meta: meta,
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
          <section className="row meta">
            {this.state.meta.updatedData ? (
              <p className="meta--time">
                Uppdaterad: {this.state.meta.updatedData}
              </p>
            ) : (
              <p className="meta--time">Loading...</p>
            )}
            {this.state.meta.message ? <p>{this.state.meta.message}</p> : null}
          </section>
          <section className="row trains">
            <h1 className="title">Pendeltåg</h1>
            <div className="departures">
              {this.state.trains && this.state.trains.length > 0 ? (
                this.state.trains.map(trainData => (
                  <Departure key={trainData.JourneyNumber} data={trainData} />
                ))
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </section>
          <section className="row buses">
            <h1 className="title">Bussar</h1>
            <div className="departures">
              {this.state.buses && this.state.buses.length > 0 ? (
                this.state.buses.map(busesData => (
                  <Departure key={busesData.JourneyNumber} data={busesData} />
                ))
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </section>
        </main>
      </div>
    );
  }
}

export default App;
