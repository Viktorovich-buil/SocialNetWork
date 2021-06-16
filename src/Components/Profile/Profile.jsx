import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./My posts/MyPostsContainer";



const Profile = (props) => {
    return <div>
        <ProfileInfo
            isOwner={props.isOwner}
            profile={props.profile}
            status={props.status}
            updateUserStatus={props.updateUserStatus}
            savePhoto={props.savePhoto}
            isPhotoSaving={props.isPhotoSaving}
            saveProfile={props.saveProfile}/>
        <MyPostsContainer
            profile={props.profile}
        />
    </div>
}


export default Profile;

