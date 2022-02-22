import React, { useEffect, useRef, useState } from "react";
import { DotsIcon, ReplyIcon } from "../../../../assets/icons";
import { IComment } from "../../../../types/IComment";
import '../../../../css/components/CurrentTweet/CommentsList/Comment/Comment.css'
import Linkify from "react-linkify";
import { createDateString } from "../../../../utils/createDateString";
import CommentPopup from "../../CommentPopup/CommentPopup";

interface ICommentProps {
   comment: IComment,
}

const Comment: React.FC<ICommentProps> = ({ comment }) => {
   const [popup, setPopup] = useState<boolean>(false);

   const handleOpen = () => {
      setPopup(true);
   }

   const ref = useRef<HTMLDivElement>(null);

   const checkClick = (e: Event) => {
      if (popup && ref.current && !ref.current.contains(e.target as Node)) {
         setPopup(false)
      }
   }

   const handleClose = (e: Event) => {
      checkClick(e);
   }

   useEffect(() => {
      if (popup) {
         document.documentElement.addEventListener('click', handleClose)

         return;
      } else {
         return document.documentElement.removeEventListener('click', handleClose);
      }
   }, [popup, handleClose])

   return (
      <div className="comment-item">
         <div className="comment-item__row">
            <div className="comment-item__avatar">
               <img src={comment.user.avatar_url} alt="avatar" />
            </div>
            <div className="comment-item__content">
               <div className="comment-item__user">
                  <div className="comment-item__name">
                     {comment.user.fullName}
                  </div>
                  <div className="comment-item__login">
                     @{comment.user.username}
                  </div>
               </div>
               <div className="comment-item__body">
                  <Linkify>
                     <pre>
                        {comment.text}
                     </pre>
                  </Linkify>
               </div>
               <div className="comment-item__time">
                  <div>
                     <ReplyIcon className="comm-reply-icon" />
                     <span>
                        Ответил {createDateString(new Date(comment.createdAt))}
                     </span>
                  </div>
               </div>
            </div>
            <div className="comment-item__dots">
               <div
                  className="comm-dots-btn"
                  onClick={handleOpen}
                  ref={ref}
               >
                  {popup
                     && <CommentPopup id={comment._id} />}
                  <DotsIcon className="comment-dots-icon" />
               </div>
            </div>
         </div>
      </div>
   )
}

export default Comment
