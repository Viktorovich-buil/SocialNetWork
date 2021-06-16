import React from "react";
import {reduxForm} from "redux-form";
import {Area, createField} from "../../Common/FormsControls/FormControls";
import styles from "../../Common/FormsControls/FormsControls.module.css";

const Input = Area('input')
const Textarea = Area('textarea')

const ProfileDataForm = ({handleSubmit, profile, error}) => {
    return <form className={styles.ProfileDataForm} onSubmit={handleSubmit}>
        {error && <div className={styles.formSummeryError}>
            {error}
        </div>}
        {/*<ul className={classes.profiletext}>*/}
        <div><b>Full name</b> {createField(Input, 'Full Name', 'fullName', 'text', [])} </div>
        {/*<div><b>Полное имя:</b> {createFieldProfile('Full Name', 'fullName', [], Input, [])} </div>*/}
        <div><b>About me</b>
            {createField(Textarea, 'About My', 'aboutMe', 'text', [])}
        </div>
        <div><b>Looking for a job?</b>
            {createField('Input', '', 'lookingForAJob', 'checkbox', [], 'Yes')}
            {/*{createField('Input', '', 'lookingForAJob', 'radio', [])}*/}
            {/*{createField('Input', '', 'lookingForAJob', 'radio', [])}*/}
        </div>
        <div><b>My skills</b>
            {createField(Textarea, 'My professional skills', 'lookingForAJobDescription', 'text', [])}
        </div>
        <div>
            <b>Contacts</b> {Object.keys(profile.contacts).map(key => {
            return <div key={key}>
                <span>{key}: {createField(Input, key, 'contacts.' + key, 'text', [])}</span>
            </div>
        })}
        </div>


        <div>
            <button className={styles.button}>Save</button>
        </div>
    </form>
}

const ProfileDataFormReduxForm = reduxForm({
    form: 'edit-profile'
})(ProfileDataForm)

export default ProfileDataFormReduxForm;

//
// let dfg = profile.contacts;
// console.log(dfg);
