import React, { Component } from 'react';

class Tabs extends Component {
  state = {};
  render() {
    const {headers, activo} = this.props;
    return (
      <ul className="nav nav-tabs mb-2">
        {headers.map((e, i) => {
          return (
            <li className="nav-item" key={i}>
              <button
                onClick={() => {
                  this.props.onChange(i);
                }}
                className={activo === i ? "nav-link active" : "nav-link"}
              >
                {e}
              </button>
            </li>
          );
        })}
      </ul>
    );
  }
}
 
export default Tabs;