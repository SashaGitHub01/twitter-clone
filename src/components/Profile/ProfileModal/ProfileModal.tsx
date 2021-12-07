import React from "react";
import { IUser } from "../../../types/IUser";
import Modal from "../../../UI/Modal/Modal";
import './ProfileModal.scss';
import { CameraIcon } from "../../../assets/icons";

interface IProfileModalProps {
   handleClose: () => void,
   user: IUser
}

const ProfileModal: React.FC<IProfileModalProps> = ({ handleClose, user }) => {
   return (
      <Modal title="Редактировать профиль" onClose={handleClose}>
         <div className="profile-edit">
            <div className="profile-edit__col">
               <input type="file" id='avatar' name='avatar' hidden />
               <label className="profile-edit__avatar" htmlFor="avatar">
                  <div>
                     <span>Изменить</span>
                     <CameraIcon className="profile-cam-icon" />
                  </div>
                  <img src={user.avatar_url} alt="avatar" />
               </label>
            </div>
         </div>
      </Modal>
   )
}

export default ProfileModal
