import React from 'react';
import Modal from 'react-modal';

export default ({ message, toggleModal, handleClose, typeOfMessage }) => {
  return (
    <Modal
      isOpen={toggleModal}
      contentLabel="Selected Option"
      onRequestClose={handleClose}
      closeTimeoutMS={200}
      className="react-modal"
    >
      <div className={`notification ${ typeOfMessage }`}>
        { message }
      </div>
    </Modal>
  );
}