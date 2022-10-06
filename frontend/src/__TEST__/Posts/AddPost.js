import React, { useState } from 'react';

import axios from 'axios';

import Card from '../UI/Card';
import Button from '../UI/Button';

const AddPost = () => {
  const [title, setTitle] = useState('');
  const [post, setPost] = useState('');
  const [image, setImage] = useState('');

  const titleHandler = (e) => {
    setTitle(e.target.value);
  };

  const postHandler = (e) => {
    setPost(e.target.value);
  };

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const postData = async (id, data) => {
    const res = await axios.post('http://localhost:4000/api/posts', data, {
      headers: {
        Authorization: `Bearer ${id.token}`,
        'content-type': 'multipart/form-data',
      },
    });
    console.log(res.data);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('post', post);
    formData.append('imageUrl', image);

    const userId = JSON.parse(localStorage.getItem('auth'));
    userId && postData(userId, formData).catch(console.error);
  };

  return (
    <Card>
      <h1>ADD POST</h1>
      <form onSubmit={submitHandler}>
        <label htmlFor="title">Title: </label>
        <input id="title" type="text" onChange={titleHandler} />
        <label htmlFor="post">post: </label>
        <textarea id="post" onChange={postHandler} cols="30" rows="10" />
        <label htmlFor="image">image: </label>
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={imageHandler}
        />
        <Button type="submit">Add post</Button>
      </form>
    </Card>
  );
};

export default AddPost;
