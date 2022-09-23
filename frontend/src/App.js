import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/BackendTest/Home';
import Signup from './pages/BackendTest/Signup';
import ListOfUsers from './pages/BackendTest/ListOfUsers';
import Header from './layout/Header';
import Navigation from './components/Navigation';

function App() {
  return (
    <BrowserRouter>
      <Header>
        <Navigation />
      </Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/list-of-user" element={<ListOfUsers />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
