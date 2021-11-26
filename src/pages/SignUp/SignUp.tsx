import React, { useState } from "react";
import image from '../../assets/signup.png';
import './SignUp.scss';
import { GrTwitter as Twitter } from 'react-icons/gr';
import Modal from "../../UI/Modal/Modal";
import InfoInput from "../../UI/InfoInput/InfoInput";

const SignUp: React.FC = () => {
   const [signUp, setSignUp] = useState<boolean>(false);
   const [signIn, setSignIn] = useState<boolean>(false);

   const handleOpenIn = () => {
      setSignIn(true);
   }

   const handleOpenUp = () => {
      setSignUp(true);
   }

   const handleCloseUp = () => {
      setSignUp(false);
   }

   const handleCloseIn = () => {
      setSignIn(false);
   }

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
                        className="signup-col-2__button reg-btn">
                        Зарегистрироваться
                     </div>
                     <div
                        onClick={handleOpenIn}
                        className="signup-col-2__button signin-btn">
                        Войти
                     </div>
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
         {signUp
            && <Modal
               onClose={handleCloseUp}
               title="Создайте учетную запись"
            >
               <form className="signup__form-up signup-form">
                  <InfoInput
                     name='name'
                     placeholder="Имя"
                  />
                  <InfoInput
                     name="email"
                     placeholder="Email"
                  />
                  <InfoInput
                     type="password"
                     name="password"
                     placeholder="Пароль"
                  />
                  <button
                     className="form-submit"
                     type="submit"
                  >
                     Создать учетную запись
                  </button>
               </form>
            </Modal>}

         {signIn
            && <Modal
               title="Войдите в аккаунт"
               onClose={handleCloseIn}
            >
               <form className="signup-form">
                  <InfoInput
                     type="text"
                     name="email"
                     placeholder="Email"
                  />
                  <InfoInput
                     type="password"
                     name="password"
                     placeholder="Пароль"
                  />
                  <button
                     type="submit"
                     className="form-submit"
                  >
                     Войти
                  </button>
               </form>
            </Modal>}
      </div>
   )
}

export default SignUp;
