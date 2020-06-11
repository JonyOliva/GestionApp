import React, { Component } from "react";
import {SesionContext} from "./SesionComponent";

class UserInfo extends Component {
  static contextType = SesionContext;
  state = {};

  render() {
    return <span className="navbar-text text-primary sesion"></span>;
  }
}

export default UserInfo;
