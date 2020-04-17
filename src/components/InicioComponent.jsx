import React, { Component } from "react";
import "./InicioComponent.css";

class InicioComponent extends Component {
  state = {};
  render() {
    return (
      <div className="container mt-2">
        <h4>Inicio</h4>
        <div className="row row-cols-3 justify-content-around">
          <div className="col-5 border border-primary">
            <div className="head-session">
              <br />
              <p className="text-session"> Usted ha iniciado sesión como # </p>
            </div>
          </div>
          <div className="col-5 border border-primary">asd</div>
          <div className="col-11 border border-primary">asd</div>
        </div>
      </div>
    );
  }
}

export default InicioComponent;
