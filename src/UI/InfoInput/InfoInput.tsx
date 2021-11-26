import React, { useState, useRef } from "react";
import './InfoInput.scss';

interface IInfoInput {
   className?: string,
   placeholder?: string,
   type?: string,
   name: string,
   [prop: string]: any,
}

const InfoInput: React.FC<IInfoInput> = ({ className, type, name, placeholder, ...other }) => {
   const [active, setActive] = useState<boolean>(false);
   const [isEmpty, setIsEmpty] = useState<boolean>(true);

   const ref = useRef<HTMLInputElement>(null);

   const handleActive = () => {
      setActive(true);

      if (ref.current) {
         ref.current.focus();
      };
   }

   const handleDisable = () => {
      setActive(false);
   }

   const hanldeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value) return setIsEmpty(false);

      setIsEmpty(true);
   }

   return (
      <div
         onClick={handleActive}
         className={className
            ? `info-input ${className}`
            : active
               ? "info-input active"
               : "info-input"}
      >
         <div className={isEmpty
            ? "info-input__placeholder"
            : "info-input__placeholder filled"}
         >
            {placeholder}
         </div>
         <input
            onChange={hanldeChange}
            {...other}
            onBlur={handleDisable}
            ref={ref}
            className="info-input__input"
            name={name}
            type={type || 'text'}
         />
      </div>
   )
}

export default InfoInput
