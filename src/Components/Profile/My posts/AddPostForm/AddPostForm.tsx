import React from "react";
import classes from "../MyPosts.module.css";
import {createField, Input} from "../../../Common/FormsControls/FormControls";
import {required} from "../../../../utils/validators/validators";
import {InjectedFormProps, reduxForm, reset} from "redux-form";

type PropsType = {

}
export type AddPostFormValuesType = {
    newPostBody: string
}

type AddPostFormValuesTypeKeys = Extract<keyof AddPostFormValuesType, string>

const afterSubmit = (result: any, dispatch: any) =>
    dispatch(reset('profileAddPostForm'));

const AddNewPostForm: React.FC<InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType> = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div className={classes.textarea}>
            {createField<AddPostFormValuesTypeKeys>("Enter new post", 'newPostBody', [required], Input)}

            {/*<Field className={classes.textarea} component={Textarea} placeholder={'Enter new post'}*/}
            {/*       name={'newPostBody'} validate={[required]}/>*/}
            <div>
                <button className={classes.button}> Add post</button>
            </div>
        </div>
    </form>
};

export default reduxForm <AddPostFormValuesType, PropsType>
({form: 'profileAddPostForm', onSubmitSuccess: afterSubmit})(AddNewPostForm);
