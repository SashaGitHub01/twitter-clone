import React, { useEffect, useRef, useState } from "react";
import './CurrentTweet.scss';
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useParams } from "react-router-dom";
import ContentTitle from "../ContentTitle/ContentTitle";
import { DotsIcon } from "../../assets/icons";
import { fetchCreateLike, fetchDeleteLike, getTweet } from "../../store/actions/currentTweet";
import Loader from "../Loader/Loader";
import { LikeIcon, ShareIcon, RepostIcon, CommentsIcon, LikeActiveIcon } from "../../assets/icons";
import CommentsForm from "./CommentsForm/CommentsForm";
import TweetPopup from "../Tweets/TweetPopup/TweetPopup";
import { createDateString } from "../../utils/createDateString";
import ImagesList from "../ImagesList/ImagesList";
import Linkify from 'react-linkify';
import CommentsList from "./CommentsList/CommentsList";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";

const CurrentTweet = () => {
   const { tweet, error, isLoading } = useTypedSelector(state => state.currentTweet);
   const me = useTypedSelector(state => state.auth.user);

   const [inProgress, setInProgress] = useState(false);
   const [isLiked, setIsLiked] = useState<boolean>(false);
   const [likesLength, setLikesLength] = useState<number>(0);

   const dispatch = useDispatch();

   const { username, id } = useParams<string>();

   useEffect(() => {
      if (tweet) setLikesLength(tweet.likes.length);
   }, [tweet]);

   useEffect(() => {
      if (me && tweet) setIsLiked(me.likes.includes(tweet._id));
   }, [tweet, me]);

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
   }, [popup, closePopup]);

   const handleLike = async (e: React.MouseEvent) => {
      if (!tweet) return;

      e.preventDefault();
      console.log(isLiked);
      if (!isLiked) {
         setInProgress(true);

         await dispatch(fetchCreateLike(tweet._id));

         setIsLiked(true);
         setInProgress(false);
         return setLikesLength(likesLength + 1);
      } else {
         setInProgress(true);

         await dispatch(fetchDeleteLike(tweet._id));

         setIsLiked(false);
         setInProgress(false);
         return setLikesLength(likesLength - 1);
      }
   }

   return (
      <>
         <ContentTitle>
            @{username}
         </ContentTitle>
         {isLoading
            ? <Loader />
            : error || !tweet
               ? <ErrorPage />
               : <>
                  <div className="curr-tweet">
                     <div className={inProgress
                        ? "curr-tweet__wrapper progress"
                        : "curr-tweet__wrapper"}
                     >
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
                                 && <TweetPopup id={tweet._id} />}
                              <DotsIcon className="dots-i" />
                           </div>
                        </div>
                        <div className="curr-tweet__content">
                           <div className="curr-tweet__body">
                              <Linkify>
                                 <pre>{tweet.text}</pre>
                              </Linkify>
                              {
                                 tweet.images && tweet.images.length > 0
                                 && <ImagesList images={tweet.images} />
                              }
                           </div>
                           <div className="curr-tweet__time">
                              {createDateString(new Date(tweet.createdAt))}
                           </div>
                        </div>
                        <div className="curr-tweet__stats tweet-row">
                           <div className="curr-tweet__count">
                              Likes:<span>{likesLength}</span>
                           </div>
                           <div className="curr-tweet__count">
                              Retweets:<span>5</span>
                           </div>
                        </div>
                        <div className="curr-tweet__options tweet-row">
                           <div className="curr-tweet__activity tweet-activity">
                              <div className="tweet-activity__icon def-icon">
                                 <CommentsIcon className="curr-tweet-i" />
                              </div>
                           </div>
                           <div className="curr-tweet__activity tweet-activity">
                              <div className="tweet-activity__icon rep-icon">
                                 <RepostIcon className="curr-tweet-i" />
                              </div>
                           </div>
                           <div className="curr-tweet__activity tweet-activity">
                              <div className="tweet-activity__icon like-icon" onClick={handleLike}>
                                 {isLiked
                                    ? <LikeActiveIcon className="curr-tweet-i liked" />
                                    : <LikeIcon className="curr-tweet-i" />}
                              </div>
                           </div>
                           <div className="curr-tweet__activity tweet-activity">
                              <div className="tweet-activity__icon def-icon">
                                 <ShareIcon className="curr-tweet-i" />
                              </div>
                           </div>
                        </div>
                     </div>
                     {me
                        && <CommentsForm
                           user={tweet.user}
                           tweetId={tweet._id}
                           me={me}
                        />}
                     <div className="curr-tweet__comments">
                        {tweet.comments
                           && <CommentsList comments={tweet.comments} />}
                     </div>
                  </div>
               </>}
      </>
   )
}

export default CurrentTweet
