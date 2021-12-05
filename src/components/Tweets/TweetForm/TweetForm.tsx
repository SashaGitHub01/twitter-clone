import React, { useState } from "react";
import './TweetForm.scss';
import { AiOutlineFileGif as Gif } from 'react-icons/ai';
import { BsCardImage as Image, BsEmojiSmile as Smile } from 'react-icons/bs';
import { useFormik } from "formik";
import { createNewTweet } from "../../../store/actions/tweetsActions";
import { useDispatch } from "react-redux";
import UploadImages from "./UploadImages/UploadImages";
import UploadsList from "./UploadsList/UploadsList";
import TweetFormTextarea from "./TweetFormTextarea/TweetFormTextarea";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { AlertIcon } from '../../../assets/icons';
import { IImage } from "../../../types/IImage";


const TweetForm: React.FC = () => {
   const [images, setImages] = useState<IImage[]>([]);

   const formError = useTypedSelector(state => state.tweets.formError)
   const user = useTypedSelector(state => state.auth.user)

   const dispatch = useDispatch();

   const initialValues = {
      text: '',
      images: images
   }

   const formik = useFormik({
      initialValues: initialValues,

      onSubmit: async (values, { resetForm }) => {
         values.images = images

         await dispatch(createNewTweet(values));

         if (formError) return;

         resetForm();
         setImages([])
      }
   })

   return (
      user
         ? <div className="h-content__create-f create-form">
            <div className="create-form__avatar">
               <img src={user.avatar_url} alt="avatar" />
            </div>
            <div className="create-form__body">
               <form className="create-form__form new-tweet-form" onSubmit={formik.handleSubmit}>
                  <TweetFormTextarea
                     handleChange={formik.handleChange}
                     value={formik.values.text}
                  />
                  {images.length
                     ? <UploadsList
                        images={images}
                        setImages={setImages}
                     />
                     : null}
                  <div className="new-tweet-form__footer">
                     <div className="new-tweet-form__btns">
                        <Gif className='new-tweet-icon' />
                        <UploadImages
                           handleChange={formik.handleChange}
                           value={formik.values.images}
                           setImages={setImages}
                        />
                        <Smile className='new-tweet-icon' />
                     </div>
                     <div className="new-tweet-form__control">
                        {formError
                           && <div className="form-error">
                              <AlertIcon className="error-icon" />
                              <div>Что-то пошло не так...</div>
                           </div>}
                        <button
                           disabled={!formik.values.text && images.length === 0 || formik.isSubmitting}
                           type="submit"
                           className="new-tweet-form__submit"
                        >
                           Tweet
                        </button>
                     </div>
                  </div>
               </form>
            </div>
         </div>
         : null
   )
}

export default TweetForm;
