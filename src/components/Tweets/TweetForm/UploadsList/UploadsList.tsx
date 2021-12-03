import React, { Dispatch } from "react";
import './UploadsList.scss';
import { TimesIcon } from "../../../../assets/icons";
import { IImage } from "../../../../types/IImage";

interface IUploadListProps {
   images: IImage[],
   setImages: Dispatch<React.SetStateAction<IImage[]>>
}

const UploadsList: React.FC<IUploadListProps> = ({ images, setImages }) => {

   const handleRemove = (delId: string) => {
      const newImages = images.filter(({ id }) => {
         return delId !== id
      })

      setImages(newImages);
   }

   return (
      <div className={images.length === 1
         ? "new-tweet-form__uploads uploads uploads-1"
         : 'new-tweet-form__uploads uploads'
      }>
         {images && images.map(({ url, id }) => (
            <div
               className="uploads__item"
               style={{ backgroundImage: `url(${url})` }}
               key={id}
               id={id}
            >
               <div className="uploads__image">
                  <div className="uploads__remove" onClick={() => handleRemove(id)}>
                     <TimesIcon className="uploads-i" />
                  </div>
               </div>
            </div>)
         )}
      </div>
   )
}

export default UploadsList
