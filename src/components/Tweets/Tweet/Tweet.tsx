import React, { useEffect, useRef, useState } from "react";
import './Tweet.scss';
import { Link } from "react-router-dom";
import { ITweet } from "../../../types/tweets";
import TweetPopup from "../TweetPopup/TweetPopup";
import { LikeIcon, DotsIcon, ShareIcon, RepostIcon, CommentsIcon } from "../../../assets/icons";
import { formatDate } from "../../../utils/formatDate";

interface ITweetProps {
   item: ITweet
}

const Tweet: React.FC<ITweetProps> = ({ item: { _id, user, text, createdAt } }) => {
   const [popup, setPopup] = useState<boolean>(false);

   const ref = useRef<HTMLDivElement>(null);

   const checkClick = (e: Event) => {
      if (popup && ref.current && !ref.current.contains(e.target as Node)) {
         setPopup(false)
      }
   }

   const openPopup = (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();

      setPopup(true);
   }

   const closePopup = (e: Event) => {
      checkClick(e);
   }

   useEffect(() => {
      if (popup) {
         document.documentElement.addEventListener('click', closePopup);

         return;
      } else {
         return document.documentElement.removeEventListener('click', closePopup);
      }
   }, [popup, closePopup])

   return (
      <Link
         to={`/${user.username}/${_id}`}
         className="tweet"
      >
         <div className={popup ? "tweet__item disabled" : 'tweet__item'}>
            <div className="tweet__avatar">
               <img src={user.avatar_url} alt="ava" />
            </div>
            <div className="tweet__content">
               <div className="tweet__header">
                  <div className="tweet__info">
                     <div className="tweet__username">
                        <span className="name">
                           {user.fullName}
                        </span>
                        <span className="link">
                           @{user.username}
                        </span>
                     </div>
                     <div className="tweet__time">
                        {formatDate(new Date(createdAt))}
                     </div>
                  </div>
                  <div
                     ref={ref}
                     className="tweet__menu"
                     onClick={openPopup}
                  >
                     {popup
                        && <TweetPopup />}
                     <DotsIcon
                        className="dots-icon" />
                  </div>
               </div>
               <div className="tweet__body">
                  <pre>
                     {text}
                  </pre>
               </div>
               <div className="tweet__options">
                  <div className="tweet-default">
                     <button>
                        <CommentsIcon className="tweet-option-i" />
                     </button>
                     <span>1</span>
                  </div>
                  <div className="tweet-repost">
                     <button>
                        <RepostIcon className="tweet-option-i" />
                     </button>
                     <span>142</span>
                  </div>
                  <div className="tweet-like">
                     <button>
                        <LikeIcon className="tweet-option-i" />
                     </button>
                     <span>1</span>
                  </div>
                  <div className="tweet-default">
                     <button>
                        <ShareIcon className="tweet-option-i" />
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </Link>
   )
}

export default Tweet
