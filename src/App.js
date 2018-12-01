import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import trainIcon from './logo.svg';
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
          <section className="row meta">
            <p>Uppdaterad: 14:32</p>
          </section>
          <section className="row trains">
            <h1 className="title">Pendeltåg</h1>
            <div className="departures">
              <div className="departure">
                <div className="departure--container">
                  <p>
                    <span className="line-number">
                      <img className="line-icon" src={trainIcon} />
                      43
                    </span>
                    Västerhaninge
                  </p>
                  <div className="departure--time">
                    {false ? (
                      <p>8min</p>
                    ) : (
                      <p className="delayed">
                        <span className="deviation">
                          Delayed because of delayes Delayed because of delayes
                          Delayed because
                        </span>
                        <span className="delay">8min</span> 12min
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="departure">
              <div className="departure--container">
                <p>
                  <span className="line-number">
                    <img className="line-icon" src={trainIcon} />
                    43
                  </span>
                  Västerhaninge
                </p>
                <div className="departure--time">
                  {false ? (
                    <p>8min</p>
                  ) : (
                    <p className="delayed">
                      <span className="deviation">
                        Delayed because of delayes Delayed because of delayes
                        Delayed because
                      </span>
                      <span className="delay">8min</span> 12min
                    </p>
                  )}
                </div>
              </div>
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
