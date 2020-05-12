import React, { Component } from 'react';
import { Modal } from "react-bootstrap";
class CustomModal extends Component {
    state = {  }
    render() { 
      const {children, hide, title, isOpen} = this.props;
        return ( 
            <Modal
          show={isOpen}
          onHide={hide}
          centered
        >
          <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {children}
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-primary btn-sm">Guardar</button>
            <button
              onClick={hide}
              className="btn btn-danger btn-sm"
            >
              Cancelar
            </button>
          </Modal.Footer>
        </Modal>
         );
    }
}
 
export default CustomModal;