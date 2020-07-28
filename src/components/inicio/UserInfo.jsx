import React, { Component } from "react";
import {SesionContext} from "./SesionComponent";

class UserInfo extends Component {
  static contextType = SesionContext;
  render() {
  return <span className="navbar-text text-primary sesion">{this.context.nombre}</span>;
  }
}

export default UserInfo;
