import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
class App extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    const url =
      'http://api.sl.se/api2/realtimedeparturesv4.jsonp?key=KEY&siteid=9192&timewindow=5';

    // axios
    //   .get(url, {
    //     headers: {
    //       'Access-Control-Allow-Origin': '*',
    //       'Content-Type': 'application/json'
    //     }
    //   })
    //   .then(data => {
    //     console.log(data);
    //   });

    // this.fetchAsJSONP(url)
    //   .then(data => {
    //     console.log('hio');
    //     console.log(data);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  }

  fetchAsJSONP = url => {
    const app = document.querySelector(`#jsonptag`);
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      window.jsoncallback = resolve;
      script.src = url + '&jsonCallback=jsoncallback';
      script.onerror = () => reject();

      script.addEventListener('load', () => {
        app.removeChild(script);
      });

      app.appendChild(script);
    });
  };

  render() {
    return (
      <div id="app" className="App">
        <p>Hello World</p>
        <div id="jsonptag" />
      </div>
    );
  }
}

export default App;
