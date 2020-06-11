import React, { Component } from "react";
import "../otros/Navbar.css";

export const SesionContext = React.createContext("Invitado");

class SesionComponent extends Component {
  state = {
      sesion: false,
      nombre: "Invitado"
  };

  render() {
    return <SesionContext.Provider value={this.state}>
        {this.props.children}
    </SesionContext.Provider>;
  }
}

export default SesionComponent;
