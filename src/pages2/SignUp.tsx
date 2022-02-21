import React, { useState, useEffect } from "react";
import image from '../assets/signup.png';
import '../styles/SignUp.scss';
import { GrTwitter as Twitter } from 'react-icons/gr';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { closeModal } from "../store/actions/authActions";
import { GoogleIcon } from "../assets/icons";
import SignUpForm from "../components/SignUp/SignUpForm/SignUpForm";
import SignInForm from "../components/SignUp/SignInForm/SignInForm";


interface ISignUpProps {
   isAuth: boolean,
   signInError: any,
   signUpError: any,
   isLoading: boolean
}

const SignUp: React.FC<ISignUpProps> = ({ isAuth, isLoading }) => {
   const [signUpM, setSignUp] = useState<boolean>(false);
   const [signInM, setSignIn] = useState<boolean>(false);

   const nav = useNavigate();
   const dispatch = useDispatch();

   const handleOpenIn = () => {
      setSignIn(true);
   }

   const handleOpenUp = () => {
      setSignUp(true);
   }

   const handleCloseUp = () => {
      dispatch(closeModal());

      setSignUp(false);
   }

   const handleCloseIn = () => {
      dispatch(closeModal())

      setSignIn(false);
   }

   useEffect(() => {
      if (isAuth && !isLoading) nav('/home');
   }, [isAuth]);

   return (
      <div className="signup">
         <section className="signup__content">
            <div className="signup__column signup-col-1" style={{ backgroundImage: `url(${image})` }}>
               <div className='signup-col-1__icon'>
                  <Twitter className='twitter-icon' />
               </div>
            </div>
            <div className="signup__column signup-col-2">
               <div className="signup-col-2__body">
                  <div className="signup-col-2__icon-bl">
                     <Twitter className="twitter-icon-bl" />
                  </div>
                  <div className="signup-col-2__title">
                     <span>В курсе <p>происходящего</p></span>
                  </div>
                  <div className="signup-col-2__subtitle">
                     Присоединяйтесь к Твиттеру <p>прямо сейчас!</p>
                  </div>
                  <div className="signup-col-2__buttons">
                     <div
                        onClick={handleOpenUp}
                        className="signup-col-2__button reg-btn"
                     >
                        Зарегистрироваться
                     </div>
                     <div
                        onClick={handleOpenIn}
                        className="signup-col-2__button signin-btn"
                     >
                        Войти
                     </div>
                     <a
                        href={`${process.env.REACT_APP_SERVER}/auth/google`}
                        className="signup-col-2__button signin-btn"
                     >
                        <GoogleIcon className="google-icon" />
                        <span>Войти с Google</span>
                     </a>
                  </div>
               </div>
            </div>
         </section>
         <nav className="signup__nav signup-nav">
            <ul className="signup-nav__list">
               <li className="signup-nav__item">
                  О нас
               </li>
               <li className="signup-nav__item">
                  Политика конфиденциальности
               </li>
               <li className="signup-nav__item">
                  Реклама
               </li>
               <li className="signup-nav__item">
                  Ресурсы бренда
               </li>
               <li className="signup-nav__item">
                  Справочный центр
               </li>
               <li className="signup-nav__item">
                  Работа
               </li>
               <li className="signup-nav__item">
                  Блог
               </li>
            </ul>
            <div className="signup-nav__titile">
               © Twitter, Inc., 2021.
            </div>
         </nav>
         {signUpM
            && <SignUpForm
               handleCloseUp={handleCloseUp}
            />}

         {signInM
            && <SignInForm
               handleCloseIn={handleCloseIn}
            />}
      </div>
   )
}

export default SignUp;
