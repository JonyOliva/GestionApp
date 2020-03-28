import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import homeImg from "../images/home.png";
import buyImg from "../images/buy.png";
import sellImg from "../images/sell.png";
import reportImg from "../images/report.png";
import valueImg from "../images/value.png";

class Navbar extends Component {
  state = {};

  addDot = _path => {
    if (_path === window.location.pathname)
      return <span className="nav-item dot"></span>
    else return <span></span>;
    
  };

  render() {
    console.log(window.location.pathname);
    return (
      <nav className="navbar navbar-dark nav-container">
        <span className="navbar-brand mb-0 h1" style={{ color: "#708090" }}>
          {this.props.children}
        </span>
        <div className="ml-3">
          <Link to="/" className="nav-btn btn">
            {" "}
            <img className="nav-icon" src={homeImg} alt="inicio"></img>{" "}
            <div className="nav-item">Inicio</div>{" "}
          </Link>
          <Link to="/Compras" className="nav-btn btn">
            <img className="nav-icon" src={buyImg} alt="compras"></img>
            <div className="nav-item">Compras</div>
          </Link>
          <Link className="nav-btn btn">
            <img className="nav-icon" src={sellImg} alt="ventas"></img>
            <div className="nav-item">Ventas</div>
          </Link>
          <Link className="nav-btn btn">
            <img className="nav-icon" src={valueImg} alt="valores"></img>
            <div className="nav-item">Valores</div>
          </Link>
          <Link className="nav-btn btn">
            <img className="nav-icon" src={reportImg} alt="reportes"></img>
            <div className="nav-item">Reportes</div>
          </Link>
        </div>
      </nav>
    );
  }
}

export default Navbar;
