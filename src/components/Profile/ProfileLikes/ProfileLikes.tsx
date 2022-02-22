import React, { useEffect } from "react";
import Tweet from "../../Tweets/Tweet/Tweet";
import '../../../css/components/Profile/ProfileLikes/ProfileLikes.css';
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { getLikes } from "../../../store/actions/currentProfile";
import { IUser } from "../../../types/IUser";

interface IProfileLikesProps {
   profile: IUser
}

const ProfileLikes: React.FC<IProfileLikesProps> = ({ profile }) => {
   const dispatch = useDispatch();

   const items = useTypedSelector(state => state.currentProfile.liked);

   useEffect(() => {
      dispatch(getLikes(profile._id));
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

export default ProfileLikes;
