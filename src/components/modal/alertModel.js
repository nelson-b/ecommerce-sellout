import React, { useState } from "react";
import { Button, Modal, Alert} from "react-bootstrap";

  function AlertModal(props) {
    const { show, handleClose, body, button1, button2} = props;
  
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
      </Modal>
    </>
  );
}

export default AlertModal;