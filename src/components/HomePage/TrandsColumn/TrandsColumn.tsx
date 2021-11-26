import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { getTrands } from "../../../store/actions/trandsActions";
import Loader from "../../Loader/Loader";
import './TrandsColumn.scss';
import TrandsItem from "./TrandsItem/TrandsItem";


const TrandsColumn: React.FC = () => {
   const dispatch = useDispatch();

   const { items, isLoading, error } = useTypedSelector(state => state.trands)

   useEffect(() => {
      dispatch(getTrands());
   }, [dispatch])

   return (
      <div className="home-aside__trands home-column">
         <div className="home-column__head">
            <span>Актуальные темы</span>
         </div>
         {isLoading
            ? <Loader />
            : error
               ? <div className="no-items">
                  Нет тем для вас
               </div>
               : <ul className="home-column__list">
                  {
                     items.map((item) => (
                        <TrandsItem item={item} key={item._id} />
                     ))
                  }
               </ul>}
      </div>
   )
}

export default TrandsColumn;
