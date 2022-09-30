/*////////////////////////////////////////////////////////*/
/*/////////////  APPLICATION TEST FUNCTIONS /////////////*/
/*//////////////////////////////////////////////////////*/

import React from 'react';
import './style/global.scss';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HeaderTest from './__TEST__/Header.test';
import HomeTest from './__TEST__/Users/Home.test';
import NavigationTest from './__TEST__/Navigation.test';

import SignupTest from './__TEST__/Users/Signup.test';
import LoginTest from './__TEST__/Users/Login.test';
import LogoutTest from './__TEST__/Users/Logout.test';
import UpdateUserTest from './__TEST__/Users/UpdateUser.test';
import ListOfUsersTest from './__TEST__/Users/ListOfUsers.test';
import SearchUserTest from './__TEST__/Users/SearchUser.test';
import DeleteUserTest from './__TEST__/Users/DeleteUser.test';

import AddPostTest from './__TEST__/Posts/AddPost.test';
import ListOfPostsTest from './__TEST__/Posts/ListOfPosts.test';

function AppTest() {
  return (
    <>
      <HeaderTest>
        <NavigationTest />
      </HeaderTest>
      <Routes>
        <Route path="/" element={<HomeTest />} />
        <Route path="/signup" element={<SignupTest />} />
        <Route path="/login" element={<LoginTest />} />
        <Route path="/logout" element={<LogoutTest />} />
        <Route path="/update-user" element={<UpdateUserTest />} />
        <Route path="/list-users" element={<ListOfUsersTest />} />
        <Route path="/search-user" element={<SearchUserTest />} />
        <Route path="/delete-user" element={<DeleteUserTest />} />

        <Route path="/add-post" element={<AddPostTest />} />
        <Route path="/list-posts" element={<ListOfPostsTest />} />
      </Routes>
    </>
  );
}
export default AppTest;
