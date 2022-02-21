import React from 'react'
import { AlertIcon } from '../../../assets/icons'
import InfoInput from '../../../UI/InfoInput/InfoInput'
import Modal from '../../../UI/Modal/Modal'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { signIn } from '../../../store/actions/authActions'
import { useTypedSelector } from '../../../hooks/useTypedSelector'

interface SignInFormProps {
   handleCloseIn: () => void
}

const SignInForm: React.FC<SignInFormProps> = ({ handleCloseIn }) => {
   const { signInError } = useTypedSelector(state => state.auth)
   const dispatch = useDispatch()

   // SIGN-IN SCHEMA
   const schemaIn = Yup.object().shape({
      username: Yup.string()
         .min(2, 'Логин должен содержать от 2 до 40 символов')
         .max(40, 'Логин должен содержать от 2 до 40 символов')
         .required('Введите логин или email'),

      password: Yup.string()
         .required('Введите пароль'),
   })

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

   return (
      <Modal
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
      </Modal>
   )
}

export default SignInForm