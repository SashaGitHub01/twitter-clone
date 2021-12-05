import React, { useEffect, useRef, useState } from "react";
import { DotsIcon } from "../../../assets/icons";
import { useDispatch } from "react-redux";
import './UserPanel.scss';
import { IUser } from "../../../types/IUser";
import UserPopup from "../UserPopup/UserPopup";

interface IUserPanelProps {
   user: IUser
}

const UserPanel: React.FC<IUserPanelProps> = ({ user }) => {
   const [popup, setPopup] = useState<boolean>(false);

   const ref = useRef<HTMLDivElement>(null);

   const checkClick = (e: Event) => {
      if (popup && ref.current && !ref.current.contains(e.target as Node)) {
         setPopup(false)
      }
   }

   const openPopup = (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();

      setPopup(true);
   }

   const closePopup = (e: Event) => {
      checkClick(e);
   }

   useEffect(() => {
      if (popup) {
         document.documentElement.addEventListener('click', closePopup);

         return;
      } else {
         return document.documentElement.removeEventListener('click', closePopup);
      }
   }, [popup, closePopup])

   return (
      <div className="user-panel" onClick={openPopup} ref={ref}>
         {popup
            && <UserPopup />}
         <div className="user-panel__row">
            <div className="user-panel__avatar">
               <img src={user.avatar_url} alt="avatar" />
            </div>
            <div className="user-panel__content">
               <div className="user-panel__body">
                  <div className="user-panel__name">
                     {user.fullName}
                  </div>
                  <div className="user-panel__login">
                     @{user.username}
                  </div>
               </div>
               <div className="user-panel__dots">
                  <div className="dots_circle">
                     <DotsIcon className="user-panel-icon" />
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default UserPanel
