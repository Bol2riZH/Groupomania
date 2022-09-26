import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './layout/Header';
import Home from './pages/BackendTestUser/Home';
import Navigation from './components/Navigation';
import Signup from './pages/BackendTestUser/Signup';
import Login from './pages/BackendTestUser/Login';
import Logout from './pages/BackendTestUser/Logout';
import UpdateUser from './pages/BackendTestUser/UpdateUser';
import ListOfUsers from './pages/BackendTestUser/ListOfUsers';
import SearchUser from './pages/BackendTestUser/SearchUser';
import DeleteUser from './pages/BackendTestUser/DeleteUser';

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
        <Route path="/logout" element={<Logout />} />
        <Route path="/update-user" element={<UpdateUser />} />
        <Route path="/list-users" element={<ListOfUsers />} />
        <Route path="/search-user" element={<SearchUser />} />
        <Route path="/delete-user" element={<DeleteUser />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
