import React, {ChangeEvent, useState} from "react";
import classes from './ProfileInfo.module.css';
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileDataForm from "./ProfileDataForm";
import Preloader from "../../Common/Preloader/Preloader";
import topImage from '../../img/topImage.jpg'
import youtube from '../../img/youtube.png';
import vk from '../../img/vk.png';
import twitter from '../../img/twitter.png';
import instagram from '../../img/instagram.png';
import github from '../../img/github.svg';
import facebook from '../../img/facebook.png';
import web from '../../img/globe.svg';
import mainLink from '../../img/link.svg';
import edit from '../../img/edit.png';
import {ProfileType} from "../../../types/types";

type PropsType = {
    profile: ProfileType | null,
    status: string,
    updateUserStatus: (status: string) => void
    isOwner: boolean,
    savePhoto: (file: File) => void,
    saveProfile: (profile: ProfileType) => Promise<any>
}

const ProfileInfo : React.FC <PropsType> = ({
                         profile,
                         status,
                         updateUserStatus,
                         isOwner,
                         savePhoto,
                         saveProfile,
                     }) => {
    let [editMode, setEditMode] = useState(false);


    if (!profile) {
        return <Preloader/>
    }
    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData: ProfileType) => {
        saveProfile(formData).then(() => {
            setEditMode(false);
        });
    }
    return <div className={classes.content}>
        {isOwner && <input className={classes.file} type={'file'} onChange={onMainPhotoSelected}/>}
        <div className={classes.topImageblock}>
            <img className={classes.topImage} src={topImage}
                 alt='banner'/>
        </div>
        {editMode
            ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit}/>
            : <ProfileData profile={profile} isOwner={isOwner} status={status} updateUserStatus={updateUserStatus}
                           goToEditMode={() => {
                               setEditMode(true)
                           }}/>}
    </div>
}

type ProfileDataPropsType ={
    profile: ProfileType,
    isOwner:boolean,
    goToEditMode: () => void,
    status: string,
    updateUserStatus: (status: string) => void
}


const ProfileData : React.FC<ProfileDataPropsType> = ({profile, isOwner, goToEditMode, status, updateUserStatus}) => {
    return <div>
        <div className={classes.profiletext}>
            <div>
                {isOwner && <div className={classes.editlinkblock}>
                    <img className={classes.editlink} onClick={goToEditMode} src={edit} alt={'editlink'}/>
                </div>}
                <div className={classes.fullName}><b>{profile.fullName}</b>
                </div>
                <div className={classes.status}>
                    <ProfileStatusWithHooks status={status} updateUserStatus={updateUserStatus}/>
                </div>
            </div>
            <div className={classes.aboutMe}>
                <b>About me</b>
                <div>{profile.aboutMe}</div>
                <div className={classes.job}>
                    <b> Looking for a job:</b>
                    <span>
                        {profile.lookingForAJob
                            ? " Yes"
                            : " No"}
                    </span>
                </div>
                <div className={classes.job}>
                    <b>My skills: </b>
                    <span>
                    {profile.lookingForAJobDescription}
                </span>
                </div>
            </div>
            <div className={classes.aboutMe}>
                <b>Contacts</b>:
                <div className={classes.mainlinks_wrapper}>
                    <div className={classes.firstlinks_wrapper}>
                        <div className={classes.links_wrapper}>
                            <a className={classes.links}
                               href={profile.contacts.youtube ? profile.contacts.youtube : "https://youtube.com/"}>
                                <img className={classes.links} src={youtube} alt={'youtube_link'}/>
                            </a>
                        </div>
                        <div className={classes.links_wrapper}>
                            <a className={classes.links}
                               href={profile.contacts.vk ? profile.contacts.vk : "https://vk.com/"}>
                                <img className={classes.links} src={vk} alt={'vk_link'}/>
                            </a>
                        </div>
                        <div className={classes.links_wrapper}>
                            <a className={classes.links}
                               href={profile.contacts.twitter ? profile.contacts.twitter : "https://twitter.com/"}>
                                <img className={classes.links} src={twitter} alt={'twitter_link'}/>
                            </a>
                        </div>
                        <div className={classes.links_wrapper}>
                            <a className={classes.links}
                               href={profile.contacts.instagram ? profile.contacts.instagram : "https://instagram.com/"}>
                                <img className={classes.links} src={instagram} alt={'instagram_link'}/>
                            </a>
                        </div>
                    </div>
                    <div className={classes.secondlinks_wrapper}>
                        <div className={classes.links_wrapper}>
                            <a className={classes.links}
                               href={profile.contacts.github ? profile.contacts.github : "https://github.com/"}>
                                <img className={classes.links} src={github} alt={'github_link'}/>
                            </a>
                        </div>
                        <div className={classes.links_wrapper}>
                            <a className={classes.links}
                               href={profile.contacts.facebook ? profile.contacts.facebook : "https://facebook.com/"}>
                                <img className={classes.links} src={facebook} alt={'facebook_link'}/>
                            </a>
                        </div>
                        <div className={classes.links_wrapper}>
                            <a className={classes.links}
                               href={profile.contacts.website ? profile.contacts.website : "https://website.com/"}>
                                <img className={classes.links} src={web} alt={'web_link'}/>
                            </a>
                        </div>
                        <div className={classes.links_wrapper}>
                            <a className={classes.links}
                               href={profile.contacts.mainLink ? profile.contacts.mainLink : "https://mainLink.com/"}>
                                <img className={classes.links} src={mainLink} alt={'mainLink_link'}/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

}


export default ProfileInfo;
