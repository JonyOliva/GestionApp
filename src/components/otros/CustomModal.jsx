import React, { Component } from 'react';
import { Modal } from "react-bootstrap";
class CustomModal extends Component {
    state = {  }
    render() { 
      const {children, hide, title, isOpen, size} = this.props;
        return ( 
            <Modal
          show={isOpen}
          onHide={hide}
          centered
          size={size || ""}
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