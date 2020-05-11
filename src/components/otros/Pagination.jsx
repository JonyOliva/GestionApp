import React, { Component } from "react";

const PAGTAM = 15;
const STYLE = "btn btn-primary btn-sm";

class Pagination extends Component {
  state = {
    hasNext: true,
    hasPrevious: false
  };
  render() {
    const { length, currentPage } = this.props;
    return (
      <div className="row justify-content-around">
        <button
          className={STYLE}
          onClick={() => {
            this.props.pageHandler(-1);
            this.setState({hasPrevious: (currentPage-1) > 1, hasNext: true})
          }}
          disabled={!this.state.hasPrevious}
        >
          Anterior
        </button>

        <button
          className={STYLE}
          onClick={() => {
            this.props.pageHandler(1);
            this.setState({hasNext: (currentPage+1) * PAGTAM < length, hasPrevious: true})
          }}
          disabled={!this.state.hasNext}
        >
          Siguiente
        </button>
      </div>
    );
  }
}

export default Pagination;
