import React, { Component } from "react";
import { Modal } from "react-bootstrap";

class ConfirmationModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { item, show, hide, confirm } = this.props;
    return (
      <Modal show={show} onHide={hide} centered>
        <Modal.Body>
          <p className="text-center mb-2">
            Está seguro que desea eliminar el item:
            <br />
          </p>
          <div className="alert alert-warning m-auto text-center">{item}</div>
        </Modal.Body>
        <Modal.Footer className="p-1">
          <button onClick={confirm} className="btn btn-primary btn-sm">Confirmar</button>
          <button onClick={hide} className="btn btn-warning btn-sm">Cancelar</button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ConfirmationModal;
