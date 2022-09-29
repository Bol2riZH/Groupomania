import React from 'react';
import './style/global.scss';
import AppTest from './App.test';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';

const App = () => {
  return (
    <>
      {/*<AppTest />*/}
      <Login />
    </>
  );
};

export default App;
