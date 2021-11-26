import React from "react";
import { IoTrashOutline as Trash } from 'react-icons/io5';
import { MdOutlineEdit as Edit } from 'react-icons/md';
import './TweetPopup.scss';

const TweetPopup: React.FC = () => {

   return (
      <div className="tweet-popup">
         <ul className="tweet-popup__list">
            <li className="tweet-popup__item">
               <Trash className="popup-icon" />
               <span>Удалить</span>
            </li>
            <li className="tweet-popup__item">
               <Edit className="popup-icon" />
               <span>Редактировать</span>
            </li>
         </ul>
      </div>
   )
}

export default TweetPopup;
