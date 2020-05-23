import React, { Component } from "react";

const STYLE = "btn btn-primary btn-sm";

class Pagination extends Component {

  render() {
    const { length, currentPage, pagsize } = this.props;
    if(length < 1)
      return null;
    let hasPrevious = (currentPage-1) >= 1;
    let hasNext = currentPage * pagsize <= length;
    return (
      <div className="row justify-content-around">
        <button
          className={STYLE}
          onClick={() => {
            this.props.pageHandler(-1);
          }}
          disabled={!hasPrevious}
        >
          Anterior
        </button>

        <button
          className={STYLE}
          onClick={() => {
            this.props.pageHandler(1);
          }}
          disabled={!hasNext}
        >
          Siguiente
        </button>
      </div>
    );
  }
}

export default Pagination;
