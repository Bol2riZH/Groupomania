import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './store/AuthContext';

import './style/global.scss';

import AppTest from './AppTest';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';

/*/////////////////////////////////////////////*/
/* TODO:
    FIRST:
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
/*/ ////////////////////////////////////////////*/

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <AuthContextProvider>
              <Home />
            </AuthContextProvider>
          }
        />
        <Route path="/profile" element={<Profile />} />
      </Routes>

      {/*<AppTest />*/}
    </>
  );
};

export default App;
