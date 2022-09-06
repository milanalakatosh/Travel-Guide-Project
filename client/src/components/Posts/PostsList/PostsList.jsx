/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import style from './PostsList.module.css';
import PostItem from '../PostItem/PostItem';

export default function PostsList() {
  // const user = useSelector((state) => state.user);
  const posts = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log('useEEFFF');
    try {
      axios.get('http://localhost:3001/posts').then((allPosts) => { // все лайки
        console.log('then', allPosts);
        dispatch({ type: 'SET_POSTS', payload: allPosts.data });
        console.log('1useEEFFF');
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <div className={style.posts_container}>
      {/* {posts.map((post) => <PostItem title={post.title} text={post.text} img={post.img} key={post.id} />)} */}
      { posts?.map((post) => <PostItem post={post} key={post.id} />)}
      {posts.length === 0 ? <div className={style.empty}>Записей нет</div> : null}
    </div>
  );
}
