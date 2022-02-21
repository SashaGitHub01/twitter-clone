import React, { useEffect } from 'react';
import SignUp from './pages2/SignUp';
import { Routes, Route } from 'react-router';
import { useTypedSelector } from './hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { authMe } from './store/actions/authActions';
import { TwitterIcon } from './assets/icons';
import Tweets from './pages2/Tweets';
import CurrentTweet from './pages2/CurrentTweet';
import Profile from './pages2/Profile';

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
                  <Route path='/' element={<SignUp
                     signInError={signInError}
                     signUpError={signUpError}
                     isAuth={isAuth}
                     isLoading={isLoading}
                  />} />
                  <Route path='/home' element={<Tweets />} />
                  <Route path='/:username/status/:id' element={<CurrentTweet />} />
                  <Route path='/:username/*' element={<Profile />} />
               </Routes>
         }
      </div>
   );
}

export default App;
