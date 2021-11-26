import React from "react";
import './CommentsForm.scss';
import { SmileIcon, ImageIcon } from "../../../assets/icons";
import { IUser } from "../../../types/userscol";

interface ICommentsFormProps {
   user: IUser
}

const CommentsForm: React.FC<ICommentsFormProps> = ({ user }) => {
   return (
      <form className="reply-form">
         <div className="reply-form__row">
            <div className="reply-form__avatar">
               <img src={user.avatar_url} alt="ava" />
            </div>
            <div className="reply-form__body">
               <div className="reply-form__textarea">
                  <textarea
                     placeholder="Введите ответ..."
                     name="comment"
                     className="reply-textarea"
                  />
               </div>
               <div className="reply-form__footer">
                  <div className="reply-form__icons">
                     <SmileIcon className="reply-form-i" />
                     <ImageIcon className="reply-form-i" />
                  </div>
                  <button
                     type="submit"
                     className="reply-form__submit"
                  >
                     Ответить
                  </button>
               </div>
            </div>
         </div>
      </form>
   )
}

export default CommentsForm
