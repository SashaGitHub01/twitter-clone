import React, { useState } from "react";
import image from '../../assets/signup.png';
import './SignUp.scss';
import { GrTwitter as Twitter } from 'react-icons/gr';
import { useFormik } from "formik";
import { Navigate } from "react-router-dom";
import * as Yup from 'yup';
import Modal from "../../UI/Modal/Modal";
import InfoInput from "../../UI/InfoInput/InfoInput";
import { useDispatch } from "react-redux";
import { signIn, closeModal } from "../../store/actions/authActions";
import { AlertIcon } from "../../assets/icons";

interface ISignUpProps {
   isAuth: boolean,
   signInError: any,
   signUpError: any
}

const SignUp: React.FC<ISignUpProps> = ({ isAuth, signInError, signUpError }) => {
   const [signUpM, setSignUp] = useState<boolean>(false);
   const [signInM, setSignIn] = useState<boolean>(false);

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

   // SIGN-IN SCHEMA
   const schemaIn = Yup.object().shape({
      username: Yup.string()
         .min(2, 'Логин должен содержать от 2 до 40 символов')
         .max(40, 'Логин должен содержать от 2 до 40 символов')
         .required('Введите логин или email'),

      password: Yup.string()
         .required('Введите пароль'),
   })

   // SIGN-UP SCHEMA
   const schemaUp = Yup.object().shape({
      fullName: Yup.string()
         .min(2, 'Имя должно содержать от 2 до 40 символов')
         .max(40, 'Имя должено содержать от 2 до 40 символов')
         .required('Обязательное поле'),

      username: Yup.string()
         .min(2, 'Логин должен содержать от 2 до 40 символов')
         .max(2, 'Логин должен содержать от 2 до 40 символов')
         .required('Обязательное поле'),

      password: Yup.string()
         .min(6, 'Пароль должен содержать от 6 до 40 символов')
         .max(40, 'Пароль должен содержать от 6 до 40 символов')
         .required('Обязательное поле'),

      password2: Yup.string()
         .min(6, 'Пароль должен содержать от 6 до 40 символов')
         .max(40, 'Пароль должен содержать от 6 до 40 символов')
         .required('Обязательное поле'),
   })

   // SIGN-IN CONFIG
   const formikIn = useFormik({
      initialValues: {
         username: '',
         password: ''
      },

      validationSchema: schemaIn,

      onSubmit: (values) => {
         dispatch(signIn(values));
      }
   })

   // SIGN-UP CONFIG
   const formikUp = useFormik({
      initialValues: {
         fullName: '',
         username: '',
         password: '',
      },

      validationSchema: schemaUp,

      onSubmit: (values) => {
         console.log(values);
      }
   })

   if (isAuth) return Navigate({ to: '/home' })

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
         {signUpM
            && <Modal
               onClose={handleCloseUp}
               title="Создайте учетную запись"
            >
               <form className="signup-form">
                  <InfoInput
                     name='name'
                     placeholder="Имя"
                     onChange={formikUp.handleChange}
                     onBlur={formikUp.handleBlur}
                  />
                  <InfoInput
                     name="email"
                     placeholder="Email"
                     onChange={formikUp.handleChange}
                     onBlur={formikUp.handleBlur}
                  />
                  <InfoInput
                     type="password"
                     name="password"
                     placeholder="Пароль"
                     onChange={formikUp.handleChange}
                     onBlur={formikUp.handleBlur}
                  />
                  <button
                     className="form-submit"
                     type="submit"
                  >
                     Создать учетную запись
                  </button>
               </form>
            </Modal>}

         {signInM
            && <Modal
               title="Войдите в аккаунт"
               onClose={handleCloseIn}
            >
               <form className="signup-form" onSubmit={formikIn.handleSubmit}>
                  <InfoInput
                     className={
                        formikIn.errors.username && formikIn.touched.username
                           ? 'error'
                           : null
                     }
                     type="text"
                     name="username"
                     placeholder="Логин или e-mail"
                     onChange={formikIn.handleChange}
                     onBlur={formikIn.handleBlur}
                  />
                  <InfoInput
                     className={
                        formikIn.errors.password && formikIn.touched.password
                           ? 'error'
                           : null
                     }
                     type="password"
                     name="password"
                     placeholder="Пароль"
                     onChange={formikIn.handleChange}
                     onBlur={formikIn.handleBlur}
                  />
                  {
                     signInError
                        ? <div className="sign-error">
                           <div className="err-msg">
                              <AlertIcon className="err-icon" />
                              <span>Неверный логин или пароль</span>
                           </div>
                        </div>
                        : null
                  }
                  <button
                     disabled={formikIn.isSubmitting || !formikIn.isValid || !formikIn.dirty}
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
