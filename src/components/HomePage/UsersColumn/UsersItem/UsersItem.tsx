import React from "react";
import { IUser } from "../../../../types/IUser";
import './UsersItem.scss';

interface IUsersItemProps {
   item: IUser
}

const UsersItem: React.FC<IUsersItemProps> = ({ item: { fullName, username, avatar_url, _id } }) => {
   return (
      <li className="home-column__item">
         <div className="home-column__avatar">
            <img src={avatar_url} alt="avatar" />
         </div>
         <div className="home-column__body">
            <div className="home-column__title user-name">
               <span>
                  {fullName}
               </span>
               <div className="home-column__link">
                  @{username}
               </div>
            </div>
            <div className="home-column__button">
               <span>Читать</span>
            </div>
         </div>
      </li>
   )
}

export default UsersItem;
