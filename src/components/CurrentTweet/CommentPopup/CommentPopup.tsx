import React, { useEffect } from "react";
import '../../../css/components/Tweets/TweetPopup/TweetPopup.css'
import { IoTrashOutline as Trash } from 'react-icons/io5';
import { MdOutlineEdit as Edit } from 'react-icons/md';
import { fetchDeleteComment } from "../../../store/actions/currentTweet";
import { useDispatch } from "react-redux";

interface ICommentPopup {
   id: string
}

const CommentPopup: React.FC<ICommentPopup> = ({ id }) => {
   const dispatch = useDispatch();

   const handleDelete = () => {
      dispatch(fetchDeleteComment(id))
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

export default CommentPopup
