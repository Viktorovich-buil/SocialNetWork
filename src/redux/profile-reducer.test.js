import profileReducer, {addPostActionCreator} from "./profile-reducer";
import React from "react";

let state = {
    posts: [
        {id: 0, post: 'Hi, how are you?', likesCount: 5},
        {id: 1, post: 'It`s my first post.', likesCount: 10},
    ],
    profile: null,
    status: ''
    // 'I learn React JS with Dimych!!!'
};

test ('length posts should be incremented', () => {
       let action = addPostActionCreator('My best job')

    let newState = profileReducer (state, action)

    expect(newState.posts.length).toBe(3);
  });

// test ('new post should be added', () => {
//        let action = addPostActionCreator('My best job')
//
//     let newState = profileReducer (state, action)
//
//        expect(newState.posts[2].post).toBe('My best job');
// });
//
//
// test ('after deleting length of posts should be decrement', () => {
//        let action = deletePost(1)
//
//     let newState = profileReducer (state, action)
//
//        expect(newState.posts.length).toBe(1);
// });
//
// test ('after deleting post length shouldnt be decrement if it is incorrect', () => {
//        let action = deletePost(1000)
//
//     let newState = profileReducer (state, action)
//
//        expect(newState.posts.length).toBe(1);
// });




