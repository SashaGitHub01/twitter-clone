import React, { useEffect } from "react";
import Tweet from "../../Tweets/Tweet/Tweet";
import './ProfileMedia.scss';
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { getMedia } from "../../../store/actions/currentProfile";

const ProfileMedia: React.FC = () => {
   const dispatch = useDispatch();

   const items = useTypedSelector(state => state.currentProfile.media);

   useEffect(() => {
      dispatch(getMedia());
   }, []);

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

export default ProfileMedia;
