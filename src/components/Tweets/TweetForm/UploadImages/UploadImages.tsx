import React, { Dispatch, SetStateAction } from "react";
import './UploadImages.scss';
import { BsCardImage as Image } from 'react-icons/bs';
import { IImage } from "../../../../types/IImage";

interface IUploadImages {
   setImages: Dispatch<SetStateAction<IImage[]>>,
   handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
   value: IImage[],
}

const UploadImages: React.FC<IUploadImages> = ({ setImages, value, handleChange }) => {

   const uploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      handleChange(e);

      e.target.value = '';

      if (file) {
         const blob = new Blob([file]);
         const url = URL.createObjectURL(blob);

         setImages(prev => [...prev, { url, id: url + Date.now(), file }]);
      }
   }

   return (
      <>
         <input type="file" hidden id='images' onChange={uploadFile} />
         <label htmlFor="images">
            <Image className='new-tweet-icon' />
         </label>
      </>
   )
}

export default UploadImages;
