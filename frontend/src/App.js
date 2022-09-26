import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './layout/Header';
import Home from './pages/BackendTest/Home';
import Navigation from './components/Navigation';
import Signup from './pages/BackendTest/Signup';
import ListOfUsers from './pages/BackendTest/ListOfUsers';
import SearchUser from './pages/BackendTest/SearchUser';
import DeleteUser from './pages/BackendTest/DeleteUser';

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
        <Route path="/search-user" element={<SearchUser />} />
        <Route path="/delete-user" element={<DeleteUser />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
