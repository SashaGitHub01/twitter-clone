import React, { useEffect } from "react";
import Tweet from "../../Tweets/Tweet/Tweet";
import '../../../css/components/Profile/ProfileMedia/ProfileMedia.css';
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { getMedia } from "../../../store/actions/currentProfile";
import { IUser } from "../../../types/IUser";

interface IProfileMediaProps {
   profile: IUser
}

const ProfileMedia: React.FC<IProfileMediaProps> = ({ profile }) => {
   const dispatch = useDispatch();

   const items = useTypedSelector(state => state.currentProfile.media);

   useEffect(() => {
      dispatch(getMedia(profile._id));
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
