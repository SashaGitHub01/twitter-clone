import React, { useEffect, useState } from "react";
import ContentTitle from "../ContentTitle/ContentTitle";
import './Profile.scss';
import { CalendarIcon, LinkIcon, LocationIcon } from "../../assets/icons";
import { formatJoinDate } from "../../utils/formatJoinDate";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { Routes, Route, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProfile } from "../../store/actions/currentProfile";
import Loader from "../Loader/Loader";
import { useUserPath } from "../../hooks/useUserPath";
import { useTabName } from "../../hooks/useTabName";
import ProfileTweets from "./ProfileTweets/ProfileTweets";
import ProfileMedia from "./ProfileMedia/ProfileMedia";
import ProfileModal from "./ProfileModal/ProfileModal";
import ProfileLikes from "./ProfileLikes/ProfileLikes";
import { fetchFollow, fetchUnfollow } from "../../store/actions/authActions";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";

const tabs = [
   { name: 'Твиты', path: '', id: 1 },
   { name: 'Медиа', path: 'media', id: 2 },
   { name: 'Нравится', path: 'likes', id: 3 },
   { name: 'Ответы', path: 'replies', id: 4 },
]

const Profile: React.FC = () => {
   const { error, isLoading, profile } = useTypedSelector(state => state.currentProfile);
   const { user } = useTypedSelector(state => state.auth)

   const [modal, setModal] = useState<boolean>(false);
   const [avatar, setAvatar] = useState<string>('');
   const [isFollowing, setIsFollowing] = useState<boolean>(false);
   const [followFetching, setFollowFetching] = useState<boolean>(false);

   useEffect(() => {
      if (profile) setAvatar(profile.avatar_url);
   }, [profile])

   useEffect(() => {
      if (user && profile) setIsFollowing(user.following.includes(profile?._id) || false);
   }, [user, profile])

   const activeTab = useTabName();
   const userPath = useUserPath();
   const dispatch = useDispatch();
   let isOwner;

   if (user && profile) {
      isOwner = user._id === profile._id;
   }

   const [tab, setTab] = useState<string>(activeTab || '');


   useEffect(() => {
      if (userPath) dispatch(getProfile(userPath))
   }, [userPath, dispatch])

   const handleClose = () => {
      setModal(false);
   }

   const handleOpen = () => {
      setModal(true);
   }

   const handleFollow = async () => {
      const id = profile?._id;

      if (!id) return;

      if (!isFollowing) {
         setFollowFetching(true);

         await dispatch(fetchFollow(profile?._id));

         setFollowFetching(false);
      } else {
         setFollowFetching(true);

         await dispatch(fetchUnfollow(profile?._id));

         setFollowFetching(false);
      }

      return;
   }

   if (error) return <ErrorPage />

   return (
      <>
         <ContentTitle>@{userPath}</ContentTitle>
         {isLoading
            ? <Loader />
            : profile
               ? <div className="profile">
                  {modal
                     && <ProfileModal
                        handleClose={handleClose}
                        user={profile}
                        setAvatar={setAvatar}
                        avatar={avatar}
                     />}
                  <div className="profile__col">
                     <div className="profile__head pr-head">
                        <div className="pr-head__background">
                           <div className="pr-head__avatar">
                              <img src={avatar} alt="avatar" />
                           </div>
                        </div>
                        <div className="pr-head__row">
                           <div className="pr-head__button">
                              {isOwner
                                 ? <div className="edit-btn" onClick={handleOpen}>
                                    Редактировать
                                 </div>
                                 : isFollowing
                                    ? <button
                                       disabled={followFetching}
                                       className="follow-btn active"
                                       onClick={handleFollow}
                                    >
                                       Отписаться
                                    </button>
                                    : <button
                                       className="follow-btn"
                                       onClick={handleFollow}
                                    >
                                       Подписаться
                                    </button>}
                           </div>
                        </div>
                        <div className="pr-head__info">
                           <div className="pr-head__name">
                              {profile.fullName}
                           </div>
                           <div className="pr-head__login">
                              @{profile.username}
                           </div>
                           <div className="pr-head__about">
                              <span>
                                 Honoring music excellence through the #GRAMMYs.
                                 @TrevorNoah
                                 is hosting Music’s Biggest Night. Watch  live on
                                 @CBS
                                 Monday, Jan. 31.
                              </span>
                           </div>
                           <ul className="pr-head__list pr-info-list">
                              <li className="pr-info-list__item">
                                 <LocationIcon className="pr-info-icon" />
                                 <span>USA, Boston</span>
                              </li>
                              <li className="pr-info-list__item">
                                 <LinkIcon className="pr-info-icon link-icon" />
                                 <a href={''}>HLTV.org</a>
                              </li>
                              <li className="pr-info-list__item">
                                 <CalendarIcon className="pr-info-icon" />
                                 <span>Присоединился в {formatJoinDate(new Date(profile.createdAt))}</span>
                              </li>
                           </ul>
                           <div className="pr-head__followers-row">
                              <div className="pr-head__followers-item">
                                 <span><b>15</b> Читает</span>
                              </div>
                              <div className="pr-head__followers-item">
                                 <span><b>156</b> Читают</span>
                              </div>
                           </div>
                        </div>
                        <div className="pr-head__tab pr-head-tab">
                           <div className="pr-head-tab__list" role={'tablist'}>
                              {tabs.map(({ name, id, path }) => (
                                 <Link
                                    to={`${path}`}
                                    key={id}
                                    className={tab === path
                                       ? "pr-head-tab__item active"
                                       : "pr-head-tab__item"}
                                    role={'tab'}
                                    tabIndex={id === 1 ? 0 : -1}
                                    onClick={() => setTab(path)}
                                 >
                                    <span>
                                       {name}
                                       <div className="underline"></div>
                                    </span>
                                 </Link>
                              ))}
                           </div>
                        </div>
                     </div>
                     <div className="profile__content">
                        <div className="profile-list">
                           <Routes>
                              <Route path='/' element={<ProfileTweets items={profile.tweets} />} />
                              <Route path='/media' element={<ProfileMedia profile={profile} />} />
                              <Route path='/replies' element={<ProfileMedia profile={profile} />} />
                              <Route path='/likes' element={<ProfileLikes profile={profile} />} />
                           </Routes>
                        </div>
                     </div>
                  </div>
               </div>
               : null}
      </>
   )
}

export default Profile
