import React, { useState } from "react";
import avatar from '../../../assets/ava.jpg';
import './TweetForm.scss';
import { AiOutlineFileGif as Gif } from 'react-icons/ai';
import { BsCardImage as Image, BsEmojiSmile as Smile } from 'react-icons/bs';


const TweetForm: React.FC = () => {

   return (
      <div className="h-content__create-f create-form">
         <div className="create-form__avatar">
            <img src={avatar} alt="avatar" />
         </div>
         <div className="create-form__body">
            <form className="create-form__form new-tweet-form">
               <textarea
                  placeholder="What's happening?"
                  className="new-tweet-form__textarea"
                  name="post"
               />
               <div className="new-tweet-form__footer">
                  <div className="new-tweet-form__btns">
                     <Gif className='new-tweet-icon' />
                     <Image className='new-tweet-icon' />
                     <Smile className='new-tweet-icon' />
                  </div>
                  <div className="new-tweet-form__control">
                     <button
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
   )
}

export default TweetForm;
