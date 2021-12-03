import React from "react";
import './TweetFormTextarea.scss';

interface ITweetFormTextareaProps {
   value: string,
   handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const TweetFormTextarea: React.FC<ITweetFormTextareaProps> = ({ value, handleChange }) => {
   return (
      <textarea
         value={value}
         onChange={handleChange}
         placeholder="What's happening?"
         className="new-tweet-form__textarea"
         name="text"
      />
   )
}

export default TweetFormTextarea
