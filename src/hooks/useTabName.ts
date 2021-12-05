import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const useTabName = () => {
   const params = useParams();
   let arr = Object.values(params);

   useEffect(() => {
      arr = Object.values(params)
   }, [params])

   return arr[0];
}