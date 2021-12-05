import React from "react";
import './ImagesList.scss';

interface IImagesListProps {
   images: string[]
}

const ImagesList: React.FC<IImagesListProps> = ({ images }) => {
   return (
      <div className="tweet__pictures tweet-pictures">
         {
            images.map(url => (
               <div className="tweet-pictures__item" style={{ backgroundImage: `url(${url})` }} key={url}>
               </div>

            ))
         }
      </div>
   )
}

export default ImagesList
