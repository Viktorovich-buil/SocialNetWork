import classes from "../Dialogs.module.css";
import {createField, Textarea} from "../../Common/FormsControls/FormControls";
import {required} from "../../../utils/validators/validators";
import React from "react";
import {InjectedFormProps, reduxForm, reset} from "redux-form";
import {NewMessageFormValuesType} from "../Dialogs";

type NewMessageFormValuesKeysType = Extract<keyof NewMessageFormValuesType, string>
type PropsType = {}

const afterSubmit = (result: any, dispatch: any) =>
    dispatch(reset('dialogAddMessageForm'));

const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormValuesType, PropsType> & PropsType> = (props) => {

    return <form onSubmit={props.handleSubmit}>
        <div className={classes.addmessage}>
            <div className={classes.inputMessage}>
                {createField<NewMessageFormValuesKeysType>("The sea is calling you!", "newMessageBody", [required], Textarea)}
            </div>
            <br/>
            <button className={classes.button}>Add Message</button>
        </div>
    </form>
}

//

export default reduxForm<NewMessageFormValuesType>({form: 'dialogAddMessageForm', onSubmitSuccess: afterSubmit})(AddMessageForm);

// export default reduxForm<NewMessageFormValuesType>({form: 'dialog-add-message-form'})(AddMessageForm);



// const afterSubmit = (result: any, dispatch: any) =>
//     dispatch(reset('dialogAddMessageForm'));
