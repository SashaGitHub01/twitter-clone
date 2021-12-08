import React, { useState } from "react";
import { IUser } from "../../../types/IUser";
import Modal from "../../../UI/Modal/Modal";
import './ProfileModal.scss';
import { CameraIcon } from "../../../assets/icons";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useDispatch } from "react-redux";
import { changeProfileAvatar } from "../../../store/actions/currentProfile";

interface IProfileModalProps {
   handleClose: () => void,
   user: IUser
}

const ProfileModal: React.FC<IProfileModalProps> = ({ handleClose, user }) => {
   const dispatch = useDispatch();
   const [avatar, setAvatar] = useState<string>(user.avatar_url);
   const [file, setFile] = useState<File | null>(null);

   const formik = useFormik({
      initialValues: {
         avatar: file
      },

      onSubmit: async (values) => {
         if (!file) return;

         await dispatch(changeProfileAvatar(file));

         setFile(null);
         handleClose();
      }
   })

   const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      if (!file) return;

      formik.handleChange(e);

      e.target.value = '';

      const blob = new Blob([file]);
      const url = URL.createObjectURL(blob)

      setAvatar(url);
      setFile(file);
   }

   return (
      <Modal title="Редактировать профиль" onClose={handleClose}>
         <form className="profile-edit" onSubmit={formik.handleSubmit}>
            <div className="profile-edit__col">
               <input
                  type="file"
                  id='avatar'
                  name='avatar'
                  hidden
                  onChange={handleUpload} />
               <label className="profile-edit__avatar" htmlFor="avatar">
                  <div className="avatar-layout">
                     <span>Изменить</span>
                     <CameraIcon className="profile-cam-icon" />
                  </div>
                  <div
                     className="edit-img"
                     style={{ backgroundImage: `url(${avatar})` }} >s
                  </div>
               </label>
               <div className="profile-edit__submit">
                  <button
                     className="submit-btn"
                     type='submit'
                     disabled={!formik.dirty || formik.isSubmitting}
                  >
                     Сохранить
                  </button>
               </div>
            </div>
         </form>
      </Modal>
   )
}

export default ProfileModal
