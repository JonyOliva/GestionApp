import React, { Component } from 'react';
import { Modal } from "react-bootstrap";
class CustomModal extends Component {
    state = {  }
    render() { 
      const {children, hide, title, isOpen, size, backdrop} = this.props;
        return ( 
            <Modal
          show={isOpen}
          onHide={hide}
          centered
          size={size || ""}
          backdrop={backdrop || true}
        >
          <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {children}
          </Modal.Body>
        </Modal>
         );
    }
}
 
export default CustomModal;