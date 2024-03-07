import React from 'react';

interface Props {
    showModal: boolean;
    closeModal: () => void;
}

const SubscribeModal: React.FC<Props> = ({ showModal, closeModal }) => {
    return (
        <div className={`modal ${showModal ? 'show' : ''}`}>
            <div className='modal-content'>
                <p>Your subscription has been received.</p>
                <span className='close' onClick={closeModal}>&times;</span>
            </div>
        </div>
    );
}

export default SubscribeModal;
