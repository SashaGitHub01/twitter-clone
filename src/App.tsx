import React from 'react';
import SignUp from './pages/SignUp/SignUp';
import { Routes, Route, Navigate } from 'react-router';
import Home from './pages/Home/Home';

function App() {
   return (
      <div className="wrapper">
         <Routes>
            <Route path='/login' element={<SignUp />} />
            <Route path='/home' element={<Home />} />
            <Route path='/' element={<Navigate to='/home' />} />
         </Routes>
      </div>
   );
}

export default App;
