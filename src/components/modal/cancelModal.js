import React, { useState } from "react";
import { Button, Modal} from "react-bootstrap";

  function CancelModal(props) {
    const { show, handleClose, handleConfirm, body, button1, button2} = props;
  
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        size="md"
        centered
      >
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
          <Button className="border-3" variant="outline-warning" onClick={handleClose}>
            {button1}
          </Button>
          <Button className="border-3" variant="success" onClick={handleConfirm}>
            {button2}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CancelModal;
