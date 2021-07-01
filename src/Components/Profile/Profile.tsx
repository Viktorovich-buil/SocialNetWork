import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./My posts/MyPostsContainer";
import {ProfileType} from "../../types/types";

type PropsType = {
    profile: ProfileType | null
    status: string
    updateUserStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}


const Profile: React.FC<PropsType> = (props) => {
    return (
        <div>
        <ProfileInfo isOwner={props.isOwner}
                     profile={props.profile}
                     status={props.status}
                     updateUserStatus={props.updateUserStatus}
                     savePhoto={props.savePhoto}
                     saveProfile={props.saveProfile}/>
        <MyPostsContainer/>
    </div>
    )
}


export default Profile;

