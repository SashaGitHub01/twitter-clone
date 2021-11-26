import React from 'react';
import SignUp from './pages/SignUp/SignUp';
import { Routes, Route, Navigate } from 'react-router';
import Home from './pages/Home/Home';

function App() {
   return (
      <div className="wrapper">
         <Routes>
            <Route path='/*' element={<Home />} />
            <Route path='/' element={<SignUp />} />
         </Routes>
      </div>
   );
}

export default App;
