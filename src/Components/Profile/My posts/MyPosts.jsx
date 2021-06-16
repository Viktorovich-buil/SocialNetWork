import React from "react";
import classes from './MyPosts.module.css';
import Post from "./Post/Post";
import {Field, reduxForm, reset} from "redux-form";
import {required} from "../../../utils/validators/validators";
import {Area} from "../../Common/FormsControls/FormControls";

const Textarea = Area('textarea')

const afterSubmit = (result, dispatch) =>
    dispatch(reset('profileAddPostForm'));

let AddNewPostForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field className={classes.textarea} component={Textarea} placeholder={'Enter new post'}
                   name={'newPostBody'} validate={[required]}/>
            <div>
                <button className={classes.button}> Add post</button>
            </div>
        </div>
    </form>
};

const AddNewPostFormRedux = reduxForm({form: 'profileAddPostForm', onSubmitSuccess: afterSubmit})(AddNewPostForm);


const MyPosts = React.memo(props => {

    let postsElements =
        [...props.posts]
            .reverse()
            .map(p => <Post post={p.post} key={p.id} likesCount={p.likesCount} />);

    let addNewPost = (value) => {
        props.addPost(value.newPostBody);
    }

    return <div className={classes.content}>
        <span className={classes.text}><b>My posts</b></span>
        <div className={classes.addpost}>
            <AddNewPostFormRedux onSubmit={addNewPost}/>
        </div>
        <div className={classes.posts}>
            {postsElements}
        </div>
    </div>
})

export default MyPosts;

