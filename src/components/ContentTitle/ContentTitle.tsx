import React from "react";
import './ContentTitle.scss';

const ContentTitle: React.FC = ({ children }) => {
   return (
      <div className="h-content__header">
         <h2 className="h-content__title">
            {children}
         </h2>
      </div>
   )
}

export default ContentTitle;
