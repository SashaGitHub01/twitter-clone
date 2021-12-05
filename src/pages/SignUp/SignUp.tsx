import React, { useState, useMemo, useEffect } from "react";
import image from '../../assets/signup.png';
import './SignUp.scss';
import { GrTwitter as Twitter } from 'react-icons/gr';
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import Modal from "../../UI/Modal/Modal";
import InfoInput from "../../UI/InfoInput/InfoInput";
import { useDispatch } from "react-redux";
import { signIn, closeModal, signUp } from "../../store/actions/authActions";
import { AlertIcon } from "../../assets/icons";

interface ISignUpProps {
   isAuth: boolean,
   signInError: any,
   signUpError: any,
   isLoading: boolean
}

const SignUp: React.FC<ISignUpProps> = ({ isAuth, signInError, signUpError, isLoading }) => {
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
         .min(2, 'Логин должен содержать от 2 до 25 символов')
         .max(25, 'Логин должен содержать от 2 до 25 символов')
         .required('Обязательное поле'),

      password: Yup.string()
         .min(6, 'Пароль должен содержать от 6 до 40 символов')
         .max(40, 'Пароль должен содержать от 6 до 40 символов')
         .required('Обязательное поле'),

      password2: Yup.string()
         .oneOf([Yup.ref('password'), null])
         .required('Обязательное поле'),

      email: Yup.string()
         .email('Неверный формат адреса электрнной почты')
         .min(4, 'Неверный формат адреса электрнной почты')
         .max(40, 'Email должен содержать от 2 до 40 символов')
         .required('Обязательное поле'),
   })

   // SIGN-IN CONFIG
   const formikIn = useFormik({
      initialValues: {
         username: '',
         password: ''
      },

      validationSchema: schemaIn,

      onSubmit: async (values, { setSubmitting }) => {
         dispatch(signIn(values));

         setSubmitting(false);
      }
   })

   // SIGN-UP CONFIG
   const formikUp = useFormik({
      initialValues: {
         fullName: '',
         email: '',
         username: '',
         password: '',
         password2: '',
      },

      validationSchema: schemaUp,

      onSubmit: (values, { setSubmitting }) => {
         dispatch(signUp(values));

         setSubmitting(false);
      }
   })

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
               <form className="signup-form" onSubmit={formikUp.handleSubmit}>
                  <InfoInput
                     className={
                        formikUp.errors.fullName && formikUp.touched.fullName
                           ? 'error'
                           : null
                     }
                     name='fullName'
                     placeholder="Ваше Имя"
                     onChange={formikUp.handleChange}
                     onBlur={formikUp.handleBlur}
                     icon={formikUp.errors.fullName && formikUp.touched.fullName}
                  />
                  <InfoInput
                     className={
                        formikUp.errors.username && formikUp.touched.username
                           ? 'error'
                           : null
                     }
                     name='username'
                     placeholder="Имя пользователя"
                     onChange={formikUp.handleChange}
                     onBlur={formikUp.handleBlur}
                     icon={formikUp.errors.username && formikUp.touched.username}
                  />
                  <InfoInput
                     className={
                        formikUp.errors.email && formikUp.touched.email
                           ? 'error'
                           : null
                     }
                     name="email"
                     placeholder="Email"
                     onChange={formikUp.handleChange}
                     onBlur={formikUp.handleBlur}
                     icon={formikUp.errors.email && formikUp.touched.email}
                  />
                  <InfoInput
                     className={
                        formikUp.errors.password && formikUp.touched.password
                           ? 'error'
                           : null
                     }
                     type="password"
                     name="password"
                     placeholder="Пароль"
                     onChange={formikUp.handleChange}
                     onBlur={formikUp.handleBlur}
                     icon={formikUp.errors.password && formikUp.touched.password}
                  />
                  <InfoInput
                     className={
                        formikUp.errors.password2 && formikUp.touched.password2
                           ? 'error'
                           : null
                     }
                     type="password"
                     name="password2"
                     placeholder="Подтвердите пароль"
                     onChange={formikUp.handleChange}
                     onBlur={formikUp.handleBlur}
                     icon={formikUp.errors.password2 && formikUp.touched.password2}
                  />
                  {
                     signUpError
                        ? <div className="sign-error">
                           <div className="err-msg">
                              <AlertIcon className="err-icon" />
                              <span>Что-то пошло не так</span>
                           </div>
                        </div>
                        : null
                  }
                  <button
                     className="form-submit"
                     type="submit"
                     disabled={formikUp.isSubmitting || !formikUp.isValid || !formikUp.dirty}
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
