import React from "react";
import './TrandsItem.scss';
import { ITrand } from "../../../../types/trands";

interface ITrandsItemProps {
   item: ITrand
}

const TrandsItem: React.FC<ITrandsItemProps> = ({ item: { name, _id, count } }) => {
   return (
      <li className="home-column__item">
         <div className="home-column__topic">
            <div className="home-column__title">
               {name}
            </div>
            <div className="home-column__count">
               Твитов: {count}
            </div>
         </div>
      </li>
   )
}

export default TrandsItem
