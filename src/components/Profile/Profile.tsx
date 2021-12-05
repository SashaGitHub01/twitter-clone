import React, { useEffect } from "react";
import ContentTitle from "../ContentTitle/ContentTitle";
import './Profile.scss';
import { CalendarIcon } from "../../assets/icons";
import { formatJoinDate } from "../../utils/formatJoinDate";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProfile } from "../../store/actions/currentProfile";
import Loader from "../Loader/Loader";



const Profile: React.FC = () => {
   const dispatch = useDispatch();
   const location = useLocation();
   const regexp = /\w/gi;

   const path = location.pathname.match(regexp)?.join('');

   const { error, isLoading, profile } = useTypedSelector(state => state.currentProfile)

   useEffect(() => {
      if (path) dispatch(getProfile(path))
   }, [path, dispatch])

   return (
      <>
         <ContentTitle>@{path}</ContentTitle>
         {profile
            ? <div className="profile">
               <div className="profile__col">
                  <div className="profile__head pr-head">
                     <div className="pr-head__background">
                        <div className="pr-head__avatar">
                           <img src={profile.avatar_url} alt="avatar" />
                        </div>
                     </div>
                     <div className="pr-head__row">
                        <div className="pr-head__button">
                           <div className="follow-btn">
                              Читать
                           </div>
                        </div>
                     </div>
                     <div className="pr-head__info">
                        <div className="pr-head__name">
                           {profile.fullName}
                        </div>
                        <div className="pr-head__login">
                           @{profile.username}
                        </div>
                        <div className="pr-head__joined">
                           <CalendarIcon className="cal-icon" />
                           <span>Присоединился в {formatJoinDate(new Date())}</span>
                        </div>
                        <div className="pr-head__followers-row">
                           <div className="pr-head__followers-item">
                              <span><b>15</b> Читает</span>
                           </div>
                           <div className="pr-head__followers-item">
                              <span><b>156</b> Читают</span>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="c">
                     {profile.tweets?.[0].text}
                  </div>
               </div>
            </div>
            : isLoading
               ? <Loader />
               : null}
      </>
   )
}

export default Profile
