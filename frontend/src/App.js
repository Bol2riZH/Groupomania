import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './store/AuthContext';

import './style/main.scss';

import AppTest from './AppTest';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';

/*/////////////////////////////////////////////*/
/* TODO:
        - See how many like on post and comment.... !!!!
    BACKEND:
        - Optimization Post and Comment like
    DESIGN:
        - username in edit profile
        - User Profile (edit on same page ?)
        - Add footer
        - Add loader
    CLEAN LOG
 */
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
