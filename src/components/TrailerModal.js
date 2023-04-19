import React from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

const TrailerModal = ({ isOpen, closeModal, videoId }) => {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Trailer Modal"
    >
      {!videoId ? (
        <div>
          <h2>No trailers available for this movie</h2>
          <FontAwesomeIcon icon={faXmark} onClick={closeModal} size='2xl'/>
        </div>
      ) : (
        <div>
          <iframe
            title="trailer"
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${videoId}`}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
          <FontAwesomeIcon icon={faXmark} onClick={closeModal} size='2xl'/>
        </div>
      )}
    </Modal>
  );
};

export default TrailerModal;
