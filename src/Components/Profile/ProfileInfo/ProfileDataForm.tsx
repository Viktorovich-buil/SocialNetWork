import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, GetStringKeys, Input, Textarea} from "../../Common/FormsControls/FormControls";
import styles from "../../Common/FormsControls/FormsControls.module.css";
import {ProfileType} from "../../../types/types";

type PropsType = {
    profile: ProfileType
}

type ProfileTypeKeys = GetStringKeys<ProfileType>

const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({handleSubmit, profile, error}) => {
    return <form className={styles.ProfileDataForm} onSubmit={handleSubmit}>
        {error && <div className={styles.formSummeryError}>
            {error}
        </div>}

        <div><b>Full name</b> {createField<ProfileTypeKeys>("Full name", "fullName", [], Input)} </div>

        <div><b>About me</b>
            {createField<ProfileTypeKeys>("About me", "aboutMe", [], Textarea)}
        </div>
        <div><b>Looking for a job?</b>
            {createField<ProfileTypeKeys>("", "lookingForAJob", [], Input, {type: "checkbox"})}

        </div>
        <div><b>My skills</b>
            {createField<ProfileTypeKeys>("My professional skills", "lookingForAJobDescription", [], Textarea)}
        </div>
        <div>
            <b>Contacts</b> {Object.keys(profile.contacts).map(key => {
            return <div key={key}>
                <span>{key}: {createField(key, "contacts." + key, [], Input)}</span>
            </div>
        })}
        </div>


        <div>
            <button className={styles.button}>Save</button>
        </div>
    </form>
}

// const ProfileDataFormReduxForm = reduxForm({
//     form: 'edit-profile'
// })(ProfileDataForm)
//
// export default ProfileDataFormReduxForm;


const ProfileDataFormReduxForm = reduxForm<ProfileType, PropsType>({form: 'edit-profile'})(ProfileDataForm)

export default ProfileDataFormReduxForm;
