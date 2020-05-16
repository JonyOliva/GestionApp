import React, { Component } from "react";
import "./buttons.css";
import deleteImg from "../../images/delete.png";

class DeleteBtn extends Component {
  state = {};
  render() {
    return (
      <button onClick={this.props.onClick} className="btn btn-light btn-inl">
        <img src={deleteImg} width="16px" alt="delete"></img>
      </button>
    );
  }
}

export default DeleteBtn;
