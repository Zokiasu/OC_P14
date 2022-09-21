import React from 'react';
import './modal.css'

export const Modal = ({ mainBackground, modalBackground, classText, classButton, text, close }) => {

	return (
    <div className={ mainBackground ? mainBackground : 'classMainBack' }>
      <div className={ modalBackground ? modalBackground : 'classModal' }>
        <p className={ classText }>{ text }</p>
        <button 
          className={ classButton ? classButton : "classButton" }
          onClick={ close } 
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
	);
};

export default Modal;