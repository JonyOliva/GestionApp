import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import homeImg from "../../images/home.png";
import buyImg from "../../images/buy.png";
import sellImg from "../../images/sell.png";
import reportImg from "../../images/report.png";
import valueImg from "../../images/value.png";
import UserInfo from "../inicio/UserInfo"

class Navbar extends Component {
  state = {};

  render() {
    return (
      <nav className="navbar navbar-dark nav-container">
        <span className="navbar-brand mb-0 h1" style={{ color: "#708090" }}>
          {this.props.children}
        </span>

        <Link to="/" className="nav-btn btn">
          {" "}
          <img className="nav-icon" src={homeImg} alt="inicio"></img>{" "}
          <div className="nav-item">Inicio</div>{" "}
        </Link>
        <Link to="/compras" className="nav-btn btn">
          <img className="nav-icon" src={buyImg} alt="compras"></img>
          <div className="nav-item">Compras</div>
        </Link>
        <Link to="/ventas" className="nav-btn btn">
          <img className="nav-icon" src={sellImg} alt="ventas"></img>
          <div className="nav-item">Ventas</div>
        </Link>
        <Link to="/valores" className="nav-btn btn">
          <img className="nav-icon" src={valueImg} alt="valores"></img>
          <div className="nav-item">Valores</div>
        </Link>
        <Link to="/reportes" className="nav-btn btn">
          <img className="nav-icon" src={reportImg} alt="reportes"></img>
          <div className="nav-item">Reportes</div>
        </Link>
        <UserInfo />

      </nav>
    );
  }
}

export default Navbar;
