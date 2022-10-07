import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './style/global.scss';

import AppTest from './AppTest';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';

/*/////////////////////////////////////////////*/
/* TODO:
    Add admin auth
    Handle error from backend
    Handle general error
    Add modal
    Add confirm email to signup
    FEATURES:
        - Comment post
        - Top 5 posts
        - Search post or user
        - Admin can ban user
        - Dark mode
    DESIGN
/*/ ////////////////////////////////////////////*/

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Home />} />
      </Routes>

      {/*<AppTest />*/}
    </>
  );
};

export default App;
