import React, { useEffect } from "react";
import '../../../css/components/HomePage/UsersColumn/UsersColumn.css';
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import Loader from "../../Loader/Loader";
import UsersItem from "./UsersItem/UsersItem";
import { getUsers } from "../../../store/actions/userscolActions";

const UsersColumn: React.FC = () => {
   const dispatch = useDispatch();

   const { items, isLoading, error } = useTypedSelector(state => state.userscol);

   useEffect(() => {
      dispatch(getUsers());
   }, [dispatch])

   return (
      <div className="home-aside__trands home-column users-col">
         <div className="home-column__head">
            <span>Кого читать</span>
         </div>
         <ul className="home-column__list">
            {
               isLoading
                  ? <Loader />
                  : error || !items
                     ? <div className="no-items">
                        Пользователи не найдены
                     </div>
                     : items.map((item) => <UsersItem item={item} key={item._id} />)
            }
         </ul>
      </div>
   )
}

export default UsersColumn;
