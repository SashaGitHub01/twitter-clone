import React from "react";
import { LogoutIcon, ProfileIcon } from "../../../assets/icons";
import { useDispatch } from "react-redux";
import './UserPopup.scss';
import { logout } from "../../../store/actions/authActions";
import { useNavigate } from "react-router-dom";

const UserPopup = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const handleLogout = () => {
      dispatch(logout());

      navigate('/');
   }

   return (
      <div className="user-popup">
         <ul className="user-popup__list">
            <li className="user-popup__item">
               <ProfileIcon className="u-popup-icon" />
               <span>Ваш профиль</span>
            </li>
            <li className="user-popup__item" onClick={handleLogout}>
               <LogoutIcon className="u-popup-icon logout-i" />
               <span>Выйти</span>
            </li>
         </ul>
      </div>
   )
}

export default UserPopup
