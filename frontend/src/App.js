import React from 'react';
import './style/global.scss';
import AppTest from './App.test';

import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<Home />} />
      </Routes>

      {/*<AppTest />*/}
    </>
  );
};

export default App;
