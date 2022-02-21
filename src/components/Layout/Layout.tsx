import React from "react"
import './Layout.scss';
import {
   AiOutlineHome as HomeIcon,
   AiOutlineUnorderedList as ListI,
   AiOutlineMail as MessagesI
} from 'react-icons/ai';
import { TwitterIcon } from "../../assets/icons";
import { IoMdNotificationsOutline as NotifI } from 'react-icons/io';
import { FaRegUser as ProfileI } from 'react-icons/fa';
import { BsBookmark as BookmarkI, BsSearch as SearchI } from 'react-icons/bs';
import { GiFeather as Feather } from 'react-icons/gi';
import { Link, NavLink } from "react-router-dom";
import TrandsColumn from "../HomePage/TrandsColumn/TrandsColumn";
import UsersColumn from "../HomePage/UsersColumn/UsersColumn";
import UserPanel from "../HomePage/UserPanel/UserPanel";
import { useTypedSelector } from "../../hooks/useTypedSelector";

const Layout: React.FC = ({ children }) => {
   const { user } = useTypedSelector(state => state.auth)

   return (
      <div className="home">
         <header className="home__header">
            <nav className="home__nav home-nav">
               <div className="nav-fake"></div>
               <ul className="home-nav__list">
                  <div className="home-nav__list-main">
                     <li className="home-nav__item">
                        <TwitterIcon className="home-twitter-h" />
                     </li>
                     <li className="home-nav__item">
                        <NavLink to='/home'>
                           <HomeIcon className="home-nav-icon" />
                           <div>
                              Главная
                           </div>
                        </NavLink>
                     </li>
                     <li className="home-nav__item">
                        <NavLink to='/search'>
                           <SearchI className="home-nav-icon" />
                           <div>
                              Поиск
                           </div>
                        </NavLink>
                     </li>
                     <li className="home-nav__item">
                        <NavLink to='/notifications'>
                           <NotifI className="home-nav-icon" />
                           <div>
                              Уведомления
                           </div>
                        </NavLink>
                     </li>
                     <li className="home-nav__item">
                        <NavLink to='/messages'>
                           <MessagesI className="home-nav-icon" />
                           <div>
                              Сообщения
                           </div>
                        </NavLink>
                     </li>
                     <li className="home-nav__item">
                        <NavLink to='/bookmarks'>
                           <BookmarkI className="home-nav-icon" />
                           <div>
                              Закладки
                           </div>
                        </NavLink>
                     </li>
                     <li className="home-nav__item">
                        <NavLink to='/lists'>
                           <ListI className="home-nav-icon" />
                           <div>
                              Список
                           </div>
                        </NavLink>
                     </li>
                     <li className="home-nav__item">
                        <NavLink to={`/${user?.username}`}>
                           <ProfileI className="home-nav-icon" />
                           <div>
                              Профиль
                           </div>
                        </NavLink>
                     </li>
                     <li className="home-nav__btn">
                        <Feather className="home-new-tweet" />
                        <span>Новый твит</span>
                     </li>
                  </div>
                  <li className="home-nav__panel">
                     {user
                        ? <UserPanel user={user} />
                        : <Link to='/' className="home-nav__sign-btn">
                           <span>Войти</span>
                        </Link>}
                  </li>
               </ul>
            </nav>
         </header>
         <main className="home__main">
            <div className="home__content h-content">
               {children}
            </div>
            <div className="home__aside home-aside">
               <div className="home-aside__search">
                  <label className="home-aside__label"
                     htmlFor="searchInput"
                     tabIndex={0}
                  >
                     <SearchI className="home-aside-i" />
                     <input
                        id='searchInput'
                        name='search'
                        placeholder="Поиск"
                        type="text"
                        className="home-aside__input home-search-input"
                     />
                  </label>
               </div>
               <TrandsColumn />
               <UsersColumn />
            </div>
         </main>
      </div>
   )
}

export default Layout;