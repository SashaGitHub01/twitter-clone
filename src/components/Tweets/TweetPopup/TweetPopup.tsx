import React from "react";
import { IoTrashOutline as Trash } from 'react-icons/io5';
import { MdOutlineEdit as Edit } from 'react-icons/md';
import './TweetPopup.scss';
import { useDispatch } from "react-redux";
import { deeleteTweet } from "../../../store/actions/tweetsActions";

interface ITweetPopupProps {
   id: string
}

const TweetPopup: React.FC<ITweetPopupProps> = ({ id }) => {
   const dispatch = useDispatch();

   const handleDelete = () => {
      dispatch(deeleteTweet(id))
   }

   return (
      <div className="tweet-popup">
         <ul className="tweet-popup__list">
            <li className="tweet-popup__item" onClick={handleDelete}>
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
