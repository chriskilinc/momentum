import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import trainIcon from './logo.svg';
import Departure from './Components/Departure';
import packagejson from '../package.json';
class App extends Component {
  constructor() {
    super();
    const application = document.getElementById('momentum');

    this.state = {
      app: {
        name: packagejson.name,
        version: packagejson.version,
        author: packagejson.author,
        data: {
          stationId: application.dataset.station
            ? application.dataset.station
            : '9731',
          timespan: application.dataset.timespan
            ? application.dataset.timespan
            : '30'
        },
        production: false
      },
      meta: {
        fetched: null,
        message: ''
      },
      trains: null,
      buses: null,
      clientError: null
    };

    console.log(this.state.app);
  }

  componentDidMount() {
    if (this.state.app.production) {
      console.log('PRODUCTION');
      this.fetchTimetables();
    }
  }

  fetchTimetables = () => {
    fetch(
      `http://localhost:3000/api/v1/timetable/${
        this.state.app.data.stationId
      }/${this.state.app.data.timespan}`
    )
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
      })
      .catch(err => {
        this.setState({
          clientError: 'Fetch Error'
        });
      });
  };

  onClick = () => {
    this.fetchTimetables();
  };

  render() {
    return (
      <div id="app" className="App">
        {this.state.app.production ? null : (
          <section className="debugger">
            <p>DEBUG MODE</p>
            <a href="#" onClick={this.onClick}>
              Fetch Timetables
            </a>
          </section>
        )}

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
            {this.state.clientError ? <p>{this.state.clientError}</p> : null}
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
