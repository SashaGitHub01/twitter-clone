import React from "react"
import { GrTwitter as Twitter, GrFormClose as Close } from 'react-icons/gr';
import './Modal.scss';

interface IModal {
   title: string,
   onClose: () => void,
}

const Modal: React.FC<IModal> = ({ title, children, onClose }) => {
   return (
      <div className="modal">
         <div className="modal__content">
            <div className="modal__header">
               <div className="modal__close" onClick={onClose}>
                  <Close className="modal-close" />
               </div>
               <div className="modal__logo">
                  <Twitter className="modal-twitter" />
               </div>
            </div>
            <div className="modal__body">
               <div className="modal__title">
                  {title}
               </div>
               {children}
            </div>
         </div>
      </div>
   )
}

export default Modal
