import React, { useEffect, useRef, useState } from "react";
import './Tweet.scss';
import { Link } from "react-router-dom";
import TweetPopup from "../TweetPopup/TweetPopup";
import {
   LikeIcon, DotsIcon, ShareIcon,
   RepostIcon, CommentsIcon, LikeActiveIcon
} from "../../../assets/icons";
import { formatDate } from "../../../utils/formatDate";
import { ITweet } from "../../../types/ITweet";
import ImagesList from "../../ImagesList/ImagesList";
import { useDispatch } from "react-redux";
import { fetchCreateLike, fetchDeleteLike } from "../../../store/actions/currentTweet";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

interface ITweetProps {
   item: ITweet
}

const Tweet: React.FC<ITweetProps> = ({ item: { _id, user, text, createdAt, images, comments, likes } }) => {
   const me = useTypedSelector(state => state.auth.user);

   const [popup, setPopup] = useState<boolean>(false);
   const [isLiked, setIsLiked] = useState<boolean>(me?.likes.includes(_id) || false)
   const [likesLength, setLikesLength] = useState<number>(likes.length);

   const dispatch = useDispatch();

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

   const handleLike = (e: React.MouseEvent) => {
      e.preventDefault();

      if (!isLiked) {
         setIsLiked(true);
         setLikesLength(likesLength + 1);

         return dispatch(fetchCreateLike(_id));
      } else {
         setIsLiked(false);
         setLikesLength(likesLength - 1);

         return dispatch(fetchDeleteLike(_id));
      }
   }

   return (
      <Link
         to={`/${user.username}/status/${_id}`}
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
                        && <TweetPopup id={_id} />}
                     <DotsIcon
                        className="dots-icon" />
                  </div>
               </div>
               <div className="tweet__body">
                  <pre>
                     {text}
                  </pre>
                  {images && images.length > 0
                     && <ImagesList images={images} />
                  }
                  <div className="tweet__options">
                     <div className="tweet-default">
                        <button>
                           <CommentsIcon className="tweet-option-i" />
                        </button>
                        <span>
                           {comments
                              ? comments.length
                              : null}
                        </span>
                     </div>
                     <div className="tweet-repost">
                        <button>
                           <RepostIcon className="tweet-option-i" />
                        </button>
                        <span>142</span>
                     </div>
                     <div className="tweet-like">
                        <button onClick={handleLike}>
                           {isLiked
                              ? <LikeActiveIcon className="tweet-option-i liked" />
                              : <LikeIcon className="tweet-option-i" />}
                        </button>
                        <span>
                           {likesLength}
                        </span>
                     </div>
                     <div className="tweet-default">
                        <button>
                           <ShareIcon className="tweet-option-i" />
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </Link>
   )
}

export default Tweet
