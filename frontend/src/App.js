import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './style/global.scss';

import AppTest from './AppTest';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';

/*/////////////////////////////////////////////*/
/* TODO:
    FIRST:
        - Add delete image on edit post *
        - Handle error from backend *
        - Handle general error *
        - Add modals *
    FEATURES:
        - Search post or user
        - Top 5 posts
        - Admin can ban user
        - Dark mode
    DESIGN
        - crypt role ?
        - Add password reveal ?
        - Add confirm email to signup ?
        - Use a use reducerHook ?
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
