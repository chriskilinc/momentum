import React, { Component } from 'react';

class Departure extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    if (this.props.data) {
      return (
        <div className="departure">
          <div className="departure--container">
            <p>
              <span className="line-number">
                {/* <img className="line-icon" src={trainIcon} /> */}
                {this.props.data.LineNumber ? this.props.data.LineNumber : 'x'}
              </span>
              {this.props.data.Destination
                ? this.props.data.Destination
                : 'missing'}
            </p>
            <div className="departure--time">
              {this.props.data.Deviations ? (
                <p>{this.props.data.DisplayTime}</p>
              ) : (
                <p className="delayed">
                  <span className="deviation">
                    {this.props.data.Deviations
                      ? this.props.data.Deviations
                      : ''}
                  </span>
                  {this.props.data.DisplayTime
                    ? this.props.data.DisplayTime
                    : 'missing time'}
                </p>
              )}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="departure">
          <div className="departure--container">
            <p>ops something went wrong</p>
          </div>
        </div>
      );
    }
  }
}

export default Departure;
