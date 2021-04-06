import React, { Component } from "react";
import deleteImg from "../../images/delete.png";

class DeleteBtn extends Component {
  state = {};
  render() {
    return (
      <button onClick={this.props.onClick} className="btn btn-light px-3 py-1">
        <img src={deleteImg} width="16px" alt="delete"></img>
      </button>
    );
  }
}

export default DeleteBtn;
