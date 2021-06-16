import React from "react";
import classes from './Dialogs.module.css'
import DialogItem from "./Dialogitem/DialogItem";
import Message from "./Message/Message";
import {Field, reduxForm, reset} from "redux-form";
import {Area} from "../Common/FormsControls/FormControls";
import {required} from "../../utils/validators/validators";


const Dialogs = (props) => {

    let dialogsElements =
        props.dialogsPage.dialogs.map(d => <DialogItem name={d.name} id={d.id} key={d.id} avatar={d.avatar}/>);

    let messagesElements =
        props.dialogsPage.messages.map(m => <Message message={m.message} key={m.id} side={m.side}/>);

    let addNewMessage = (value) => {
        props.addMessage(value.newMessageBody);
    };


    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={classes.messages}>
                <div className={classes.message}>
                    {messagesElements}
                </div>
                <AddMessageFormRedux onSubmit={addNewMessage}/>
            </div>
        </div>
    );
}

const Textarea = Area('textarea')

const afterSubmit = (result, dispatch) =>
    dispatch(reset('dialogAddMessageForm'));

const AddMessageForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div className={classes.addmessage} >
            <Field className={classes.inputMessage} component={Textarea} name={'newMessageBody'} placeholder='The sea is calling you!' validate={[required]}/>
            <br/>
            <button className={classes.button}>Add Message</button>
        </div>
    </form>
};

const AddMessageFormRedux = reduxForm({form: 'dialogAddMessageForm', onSubmitSuccess: afterSubmit})(AddMessageForm);

export default Dialogs;

