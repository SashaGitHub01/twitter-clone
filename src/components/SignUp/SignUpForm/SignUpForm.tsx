import React from 'react'
import InfoInput from '../../../UI/InfoInput/InfoInput'
import Modal from '../../../UI/Modal/Modal'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { signUp } from '../../../store/actions/authActions'
import { AlertIcon } from '../../../assets/icons'
import { useTypedSelector } from '../../../hooks/useTypedSelector'

interface SignUpFormProps {
   handleCloseUp: () => void
}

const SignUpForm: React.FC<SignUpFormProps> = ({ handleCloseUp }) => {
   const dispatch = useDispatch()
   const { signUpError } = useTypedSelector(state => state.auth)

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
      <Modal
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
      </Modal>
   )
}

export default SignUpForm