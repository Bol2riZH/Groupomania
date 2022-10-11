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
        - Remove input on add post after post *
        - Add admin auth *
        - Handle error from backend *
        - Handle general error *
        - Add modals *
        - Add delete image on edit post *
        - Refactoring reducer *
        - Use useContext for auth *
        - Review AXIOS handler *
        - Add confirm email to signup
    FEATURES:
        - Search post or user
        - Top 5 posts
        - Admin can ban user
        - Dark mode
    BACKEND:
        - CRUD comment :
        model > reference post et user
        route > passe par :postId
        controller
        unilateral reference comment
        >>>> when delete post delete all comments
    DESIGN
 */
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
