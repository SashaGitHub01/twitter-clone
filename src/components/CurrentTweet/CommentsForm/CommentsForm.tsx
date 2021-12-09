import React from "react";
import './CommentsForm.scss';
import { SmileIcon, ImageIcon } from "../../../assets/icons";
import { IUser } from "../../../types/IUser";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useDispatch } from "react-redux";
import { fetchCreateComment } from "../../../store/actions/currentTweet";

interface ICommentsFormProps {
   user: IUser,
   me: IUser,
   tweetId: string
}

const CommentsForm: React.FC<ICommentsFormProps> = ({ user, tweetId, me }) => {
   const dispatch = useDispatch();

   const validation = Yup.object().shape({
      text: Yup.string().min(1).max(250).required()
   })

   const initialValues = {
      text: ''
   }

   const formik = useFormik({
      initialValues: initialValues,

      validationSchema: validation,

      onSubmit: async (values, { resetForm }) => {
         await dispatch(fetchCreateComment(tweetId, values));

         resetForm();
      }
   })

   return (
      <form className="reply-form" onSubmit={formik.handleSubmit}>
         <div className="reply-form__row">
            <div className="reply-form__avatar">
               <img src={me.avatar_url} alt="ava" />
            </div>
            <div className="reply-form__body">
               <div className="reply-form__textarea">
                  <textarea
                     value={formik.values.text}
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                     placeholder="Введите ответ..."
                     name="text"
                     className="reply-textarea"
                  />
               </div>
               <div className="reply-form__footer">
                  <div className="reply-form__icons">
                     <SmileIcon className="reply-form-i" />
                     <ImageIcon className="reply-form-i" />
                  </div>
                  <button
                     disabled={formik.isSubmitting || !formik.isValid || !formik.dirty}
                     type="submit"
                     className="reply-form__submit"
                  >
                     Ответить
                  </button>
               </div>
            </div>
         </div>
      </form>
   )
}

export default CommentsForm
