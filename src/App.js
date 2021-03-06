import React, { Component } from 'react';
import './App.css';
import './Components/Spinner.css';
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
        production: this.isProduction()
      },
      meta: {
        fetched: null,
        message: ''
      },
      trains: null,
      buses: null,
      clientError: null,
      fetches: 0
    };

    console.log(this.state.app);
  }

  componentDidMount() {
    if (this.state.app.production) {
      this.fetchTimetables();
    } else {
      console.log('Momentum Developement mode');
    }
  }

  fetchTimetables = (
    apiUrl = 'https://momentum-api-container.herokuapp.com'
  ) => {
    fetch(
      `${apiUrl}/api/v1/timetable/${this.state.app.data.stationId}/${this.state.app.data.timespan}`
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
        const currentFetch = this.state.fetches;

        if (currentFetch < 4) {
          this.setState({
            fetches: currentFetch + 1
          });
          setTimeout(this.fetchTimetables, 5000);
        } else {
          this.setState({
            clientError: 'Unable to connect to the server'
          });
          console.log(`Current Api Fetch: ${this.state.fetches}, Ending retry`);
          this.setState({
            fetches: 0
          });
        }
        console.log(`Current Api Fetch: ${this.state.fetches}`);
        console.log(err);
      });
  };

  onClick = () => {
    this.fetchTimetables();
  };

  isProduction = () => {
    return window.location.href.indexOf('localhost') > -1 ? false : true;
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
            <button onClick={this.onClick}>Uppdatera</button>
            {this.state.meta.updatedData ? (
              <p className="meta--time">
                Uppdaterad: {this.state.meta.updatedData}
              </p>
            ) : (
              <div className="meta--time">
                {this.state.app.production ? (
                  <div className="lds-facebook">
                    <div />
                    <div />
                    <div />
                  </div>
                ) : (
                  <p>no data</p>
                )}
              </div>
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
                <div>
                  {this.state.app.production ? (
                    <div className="lds-facebook">
                      <div />
                      <div />
                      <div />
                    </div>
                  ) : (
                    <p>no data</p>
                  )}
                </div>
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
                <div>
                  {this.state.app.production ? (
                    <div className="lds-facebook">
                      <div />
                      <div />
                      <div />
                    </div>
                  ) : (
                    <p>no data</p>
                  )}
                </div>
              )}
            </div>
          </section>
          <footer className="row footer" />
        </main>
      </div>
    );
  }
}

export default App;
