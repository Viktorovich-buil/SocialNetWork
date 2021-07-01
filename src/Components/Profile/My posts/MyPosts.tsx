import React from "react";
import classes from './MyPosts.module.css';
import Post from "./Post/Post";
import {AddPostFormValuesType} from "./AddPostForm/AddPostForm";
import AddNewPostForm from "./AddPostForm/AddPostForm";
import {PostsType} from "../../../types/types";

export type MapPropsType = {
    posts: Array<PostsType>,
    addPost: (newPostBody: string) => void
}

export type DispatchPropsType = {
    addPost: (newPostBody: string) => void
}

const MyPosts: React.FC<MapPropsType & DispatchPropsType> = props => {

    let postsElements =
        [...props.posts]
            .reverse()
            .map(p => <Post post={p.post} key={p.id} likesCount={p.likesCount} />);

    let addNewPost = (value: AddPostFormValuesType) => {
        props.addPost(value.newPostBody);
    }

    return <div className={classes.content}>
        <span className={classes.text}><b>My posts</b></span>
        <div className={classes.addpost}>
            <AddNewPostForm onSubmit={addNewPost}/>
        </div>
        <div className={classes.posts}>
            {postsElements}
        </div>
    </div>
}

const MyPostsMemorized = React.memo(MyPosts)

export default MyPostsMemorized;

