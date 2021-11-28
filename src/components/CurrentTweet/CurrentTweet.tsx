import React, { useEffect, useRef, useState } from "react";
import './CurrentTweet.scss';
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useParams } from "react-router-dom";
import ContentTitle from "../ContentTitle/ContentTitle";
import { DotsIcon } from "../../assets/icons";
import { getTweet } from "../../store/actions/currentTweet";
import Loader from "../Loader/Loader";
import { LikeIcon, ShareIcon, RepostIcon, CommentsIcon, LikeActiveIcon } from "../../assets/icons";
import CommentsForm from "./CommentsForm/CommentsForm";
import TweetPopup from "../Tweets/TweetPopup/TweetPopup";
import { createDateString } from "../../utils/createDateString";

const CurrentTweet = () => {
   const dispatch = useDispatch();
   const { tweet, error, isLoading } = useTypedSelector(state => state.currentTweet);

   const { username, id } = useParams<string>();

   useEffect(() => {
      if (id) dispatch(getTweet(id));
   }, [id, dispatch]);

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
   }, [popup, closePopup])

   return (
      <>
         <ContentTitle>
            @{username}
         </ContentTitle>
         {isLoading
            ? <Loader />
            : error || !tweet
               ? <div className="not-found">Твит не найден!</div>
               : <>
                  <div className="curr-tweet">
                     <div className="curr-tweet__wrapper">
                        <div className="curr-tweet__head">
                           <div className="curr-tweet__user-i user-i">
                              <div className="user-i__avatar">
                                 <img src={tweet.user.avatar_url} alt="avatar" />
                              </div>
                              <div className="user-i__names">
                                 <div className="user-i__name">
                                    {tweet.user.fullName}
                                 </div>
                                 <div className="user-i__login">
                                    @{tweet.user.username}
                                 </div>
                              </div>
                           </div>
                           <div
                              onClick={openPopup}
                              className="curr-tweet__dots"
                              ref={ref}
                           >
                              {popup
                                 && <TweetPopup />}
                              <DotsIcon className="dots-i" />
                           </div>
                        </div>
                        <div className="curr-tweet__content">
                           <div className="curr-tweet__body">
                              {tweet.text}
                           </div>
                           <div className="curr-tweet__time">
                              {createDateString(new Date(tweet.createdAt))}
                           </div>
                        </div>
                        <div className="curr-tweet__stats tweet-row">
                           <div className="curr-tweet__count">
                              Likes:<span>21</span>
                           </div>
                           <div className="curr-tweet__count">
                              Retweets:<span>5</span>
                           </div>
                        </div>
                        <div className="curr-tweet__options tweet-row">
                           <div className="curr-tweet__icon def-icon">
                              <CommentsIcon className="curr-tweet-i" />
                           </div>
                           <div className="curr-tweet__icon rep-icon">
                              <RepostIcon className="curr-tweet-i" />
                           </div>
                           <div className="curr-tweet__icon like-icon">
                              <LikeIcon className="curr-tweet-i" />
                           </div>
                           <div className="curr-tweet__icon def-icon">
                              <ShareIcon className="curr-tweet-i" />
                           </div>
                        </div>
                     </div>
                     <CommentsForm user={tweet.user} />
                  </div>
               </>}
      </>
   )
}

export default CurrentTweet
