import React from "react";
import classes from './Dialogs.module.css'
import DialogItem from "./Dialogitem/DialogItem";
import Message from "./Message/Message";
import {InitialStateType} from "../../redux/dialogs-reducer";
import AddMessageForm from "./AddMessageForm/AddMessageForm";

export type OwnPropsTypes = {
    dialogsPage: InitialStateType,
    addMessage: (messageText: string) => void
}

export type NewMessageFormValuesType ={
    newMessageBody: string
}

const Dialogs: React.FC<OwnPropsTypes> = (props) => {

    let dialogsElements =
        props.dialogsPage.dialogs.map(d => <DialogItem name={d.name} id={d.id} key={d.id} avatar={d.avatar}/>);

    let messagesElements =
        props.dialogsPage.messages.map(m => <Message message={m.message} key={m.id} side={m.side}/>);

    let addNewMessage = (value: NewMessageFormValuesType) => {
        props.addMessage(value.newMessageBody);
    }

    return (

        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={classes.messages}>
                <div className={classes.message}>
                    {messagesElements}
                </div>
                <AddMessageForm onSubmit={addNewMessage}/>
            </div>
        </div>
    );
}

export default Dialogs;






// {/*<Field className={classes.inputMessage} component={Textarea} name={'newMessageBody'} placeholder='The sea is calling you!' validate={[required]}/>*/}
