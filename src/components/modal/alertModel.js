import React, { useState } from "react";
import { Button, Modal, Alert} from "react-bootstrap";

  function AlertModal(props) {
    const { show, handleClose, body, handleConfirm, button1Label, button2Label} = props;
  
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        size="md"
        centered
      >
        <Modal.Header closeButton><h1>{body.headerLabel}</h1></Modal.Header>
        <Modal.Body>
          <Alert variant={body.variant}>
            <Alert.Heading>{body.header}</Alert.Heading>
            <table>
                <tbody>
                    {body.content.map((row, index) => {
                        return <tr key={index}>
                                <td>{row}</td>
                               </tr>
                    })}
                </tbody>
            </table>
          </Alert>
        </Modal.Body>
        {body.variant=="warning" &&(
        <Modal.Footer>
          <Button className="border-3 btn-upload save-header" onClick={handleConfirm}>
            {button1Label}
          </Button>
          <Button className="border-3 btn-upload cancel-header" onClick={handleClose}>
            {button2Label}
          </Button>
        </Modal.Footer>
        )}
      </Modal>
    </>
  );
}

export default AlertModal;