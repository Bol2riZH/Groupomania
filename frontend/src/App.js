import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './store/AuthContext';

import './style/main.scss';

import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';

/*/////////////////////////////////////////////*/
/* TODO:
    MODAL keyframe
    CORRECT HORIZONTAL SCROLL BAR
    CLEAN LOG
    REFACTORING ???
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
    </>
  );
};

export default App;
