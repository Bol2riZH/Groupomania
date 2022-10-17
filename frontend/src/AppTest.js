/*////////////////////////////////////////////////////////*/
/*/////////////  APPLICATION TEST FUNCTIONS /////////////*/
/*//////////////////////////////////////////////////////*/

import React from 'react';
import './style/scss/App.scss';

import { Routes, Route } from 'react-router-dom';

import Header from './__TEST__/Header';
import Home from './__TEST__/Users/Home';
import Navigation from './__TEST__/Navigation';

import Signup from './__TEST__/Users/Signup';
import Login from './__TEST__/Users/Login';
import Logout from './__TEST__/Users/Logout';
import UpdateUser from './__TEST__/Users/UpdateUser';
import ListOfUsers from './__TEST__/Users/ListOfUsers';
import SearchUser from './__TEST__/Users/SearchUser';
import DeleteUser from './__TEST__/Users/DeleteUser';

import AddPost from './__TEST__/Posts/AddPost';
import ListOfPosts from './__TEST__/Posts/ListOfPosts';

function AppTest() {
  return (
    <>
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

        <Route path="/add-post" element={<AddPost />} />
        <Route path="/list-posts" element={<ListOfPosts />} />
      </Routes>
    </>
  );
}
export default AppTest;
