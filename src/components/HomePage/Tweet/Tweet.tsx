import React, { useEffect, useRef, useState } from "react";
import avatar from '../../../assets/ava.jpg';
import './Tweet.scss';
import { BsThreeDots as Dots, BsHeart as Like } from 'react-icons/bs';
import { FaRegComment as Comments } from 'react-icons/fa';
import { FiUpload as Share, FiRepeat as Repost } from 'react-icons/fi';
import TweetPopup from "../TweetPopup/TweetPopup";
import { ITweet } from "../../../types/tweets";

interface ITweetProps {
   item: ITweet
}

const Tweet: React.FC<ITweetProps> = ({ item: { _id, user, text } }) => {
   const [popup, setPopup] = useState<boolean>(false);

   const ref = useRef<HTMLDivElement>(null);

   const checkClick = (e: Event) => {
      if (popup && ref.current && !ref.current.contains(e.target as Node)) {
         setPopup(false)
      }
   }

   const openPopup = () => {
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
   }, [popup])

   return (
      <div className="tweet">
         <div className="tweet__item">
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
                        21m
                     </div>
                  </div>
                  <div
                     ref={ref}
                     className="tweet__menu">
                     {popup
                        && <TweetPopup />}
                     <Dots
                        onClick={openPopup}
                        className="dots-icon" />
                  </div>
               </div>
               <div className="tweet__body">
                  <pre>
                     Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique corrupti nihil animi aliquid cum voluptatem, omnis beatae. Reprehenderit ex culpa optio deserunt minima.
                  </pre>
               </div>
               <div className="tweet__options">
                  <div className="tweet-default">
                     <button>
                        <Comments className="tweet-option-i" />
                     </button>
                     <span>1</span>
                  </div>
                  <div className="tweet-repost">
                     <button>
                        <Repost className="tweet-option-i" />
                     </button>
                     <span>142</span>
                  </div>
                  <div className="tweet-like">
                     <button>
                        <Like className="tweet-option-i" />
                     </button>
                     <span>1</span>
                  </div>
                  <div className="tweet-default">
                     <button>
                        <Share className="tweet-option-i" />
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Tweet
