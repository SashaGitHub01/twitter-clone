import React, { useState, useRef } from "react";
import { AlertIcon } from "../../assets/icons";
import '../../css/UI/InfoInput/InfoInput.css';

interface IInfoInput {
   className?: string | null,
   placeholder?: string,
   type?: string,
   name: string,
   onChange: (e: React.ChangeEvent<any>) => void,
   onBlur: (e: React.FocusEvent<any>) => void,
   icon?: any,
   [prop: string]: any,
}

const InfoInput: React.FC<IInfoInput> = ({
   className, type, name, placeholder, onChange, onBlur, icon, ...other
}) => {
   const [active, setActive] = useState<boolean>(false);
   const [isEmpty, setIsEmpty] = useState<boolean>(true);

   const ref = useRef<HTMLInputElement>(null);

   const handleActive = () => {
      setActive(true);

      if (ref.current) {
         ref.current.focus();
      };
   }

   const handleDisable = (e: React.FocusEvent<HTMLInputElement>) => {
      onBlur(e);
      setActive(false);
   }

   const hanldeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e);

      if (e.target.value && isEmpty) {
         return setIsEmpty(false)
      };

      if (!e.target.value) setIsEmpty(true);
   }

   return (
      <div
         onClick={handleActive}
         className={
            active && className
               ? `info-input ${className} active`
               : active
                  ? "info-input active"
                  : `info-input ${className}`
         }
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
         {icon
            && <AlertIcon className="input-err-icon" />}
      </div>
   )
}

export default InfoInput
