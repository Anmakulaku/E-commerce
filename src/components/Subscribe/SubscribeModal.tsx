import React from 'react';

interface Props {
  isVisible: boolean;
  onCloseClick: () => void;
}

const SubscribeModal: React.FC<Props> = ({ isVisible, onCloseClick }) => {
  return (
    <div className={`modal ${isVisible ? 'show' : ''}`}>
      <div className='modal-content'>
        <p>Your subscription has been received.</p>
        <span className='close' onClick={onCloseClick}>
          &times;
        </span>
      </div>
    </div>
  );
};

export default SubscribeModal;
