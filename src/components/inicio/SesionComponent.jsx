import React, { Component } from "react";
import "../otros/Navbar.css";

export const SesionContext = React.createContext("Invitado");

class SesionComponent extends Component {
  state = {
      sesion: false,
      nombre: "Invitado",
      token: ""
  };

  login = (nombre, token) => {
    this.setState({sesion: true, nombre: nombre, token: token});
  }

  render() {
    return <SesionContext.Provider value={{...this.state, login: this.login}}>
        {this.props.children}
    </SesionContext.Provider>;
  }
}

export default SesionComponent;
