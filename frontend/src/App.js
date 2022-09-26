import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './layout/Header';
import Home from './pages/BackendTest/Home';
import Navigation from './components/Navigation';
import Signup from './pages/BackendTest/Signup';
import Login from './pages/BackendTest/Login';
import UpdateUser from './pages/BackendTest/UpdateUser';
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
        <Route path="/login" element={<Login />} />
        <Route path="/update-user" element={<UpdateUser />} />
        <Route path="/list-users" element={<ListOfUsers />} />
        <Route path="/search-user" element={<SearchUser />} />
        <Route path="/delete-user" element={<DeleteUser />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
