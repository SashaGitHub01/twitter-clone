import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { getTweets } from "../../store/actions/tweetsActions";
import ContentTitle from "../ContentTitle/ContentTitle";
import Loader from "../Loader/Loader";
import Tweet from "./Tweet/Tweet";
import TweetForm from "./TweetForm/TweetForm";

const TweetsList: React.FC = () => {
   const dispatch = useDispatch();
   const { items, isLoading, error } = useTypedSelector(state => state.tweets);

   useEffect(() => {
      dispatch(getTweets());
   }, [dispatch])

   return (
      <>
         <ContentTitle>
            Home
         </ContentTitle>
         <TweetForm />
         <div className="h-content__tweets-list">
            {
               isLoading
                  ? <Loader />
                  : error || !items
                     ? <div className="h-content__placeholder">Твиты не найдены!</div>
                     : items.map((item) => <Tweet item={item} key={item._id} />)
            }
         </div>
      </>
   )
}

export default TweetsList
