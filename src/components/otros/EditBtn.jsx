import React, { Component } from "react";
import editImg from "../../images/edit.png";

class EditBtn extends Component {
  state = {};
  render() {
    return (
      <button
        onClick={this.props.onClick}
        className="btn btn-light px-3 py-1"
      >
        <img src={editImg} width="16px" alt="edit"></img>
      </button>
    );
  }
}

export default EditBtn;
