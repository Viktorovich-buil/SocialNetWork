import {actions} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";


const mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.posts,
        newPostBody: state.profilePage.newPostText,
        profile: state.profilePage.profile,
    }
}

let mapDispatchToProps = (dispatch: any) => {
    return {
        addPost: (newPostBody: string) => {dispatch(actions.addPostActionCreator(newPostBody))},
    };
}


const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);


export default MyPostsContainer;

