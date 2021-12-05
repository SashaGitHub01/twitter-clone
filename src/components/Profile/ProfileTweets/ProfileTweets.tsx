import React from "react";
import { ITweet } from "../../../types/ITweet";
import Tweet from "../../Tweets/Tweet/Tweet";
import './ProfileTweets.scss';

interface IProfileTweetsProps {
   items?: ITweet[],
}

const ProfileTweets: React.FC<IProfileTweetsProps> = ({ items }) => {
   return (
      <>
         {items
            ? items.map((item) => (
               <Tweet item={item} key={item._id} />
            ))
            : <div className="tweets-not-found">
               <span>Твиты не найдены</span>
            </div>}
      </>
   )
}

export default ProfileTweets
