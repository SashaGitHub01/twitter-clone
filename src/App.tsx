import React, { useEffect } from 'react';
import SignUp from './pages/SignUp/SignUp';
import { Routes, Route, Navigate } from 'react-router';
import { useTypedSelector } from './hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { authMe } from './store/actions/authActions';
import Home from './pages/Home/Home';
import { TwitterIcon } from './assets/icons';

function App() {
   const dispatch = useDispatch();
   const { user, isLoading, isAuth, signInError, signUpError } = useTypedSelector(state => state.auth)

   useEffect(() => {
      dispatch(authMe());
   }, []);

   return (
      <div className="wrapper">
         {
            isLoading
               ? <div className="overlay-load">
                  <TwitterIcon className='load-icon' />
               </div>
               : <Routes>
                  <Route path='/*' element={<Home isAuth={isAuth} />} />
                  <Route path='/' element={<SignUp
                     isAuth={isAuth}
                     signInError={signInError}
                     signUpError={signUpError}
                  />}
                  />
               </Routes>
         }
      </div>
   );
}

export default App;
