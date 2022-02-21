import React, { useEffect } from "react";
import '../styles/Tweets.scss'
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { getTweets } from "../store/actions/tweetsActions";
import ContentTitle from "../components/ContentTitle/ContentTitle";
import Layout from "../components/Layout/Layout";
import Loader from "../components/Loader/Loader";
import Tweet from "../components/Tweets/Tweet/Tweet";
import TweetForm from "../components/Tweets/TweetForm/TweetForm";
import { useNavigate } from "react-router-dom";

const TweetsList: React.FC = () => {
   const dispatch = useDispatch();
   const nav = useNavigate()
   const { isAuth } = useTypedSelector(state => state.auth);
   const { items, isLoading, error } = useTypedSelector(state => state.tweets);

   useEffect(() => {
      if (isAuth) dispatch(getTweets());
   }, [dispatch, isAuth])

   useEffect(() => {
      if (!isAuth) nav('/');
   }, [isAuth])

   return (
      <Layout>
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
                     : items.map((item) => (
                        <Tweet
                           item={item}
                           key={item._id}
                        />
                     ))
            }
         </div>
      </Layout>
   )
}

export default TweetsList
