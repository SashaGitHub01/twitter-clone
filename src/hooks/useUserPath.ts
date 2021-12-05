import { useLocation } from "react-router-dom";


export const useUserPath = () => {
   const location = useLocation();
   const regexp = /\w/gi;

   return location.pathname.split('/')[1].match(regexp)?.join('');
}