import React from 'react';
import {
    actions,
} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {withAuthRedirect} from "../../Hoc/withAuthRedirect";
import {compose} from "redux";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";


let mapStateToProps = (state: AppStateType) => {

    return {
        dialogsPage: state.messagesPage,
        newMessageBody: state.messagesPage.newMessageText
    }
}

let mapDispatchToProps = (dispatch: any) => {
    return {
        addMessage: (newMessageBody: string) => {
            dispatch(actions.addMessageActionCreator(newMessageBody));
        }
    }
}



export default compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect)
(Dialogs);





// let mapDispatchToProps = (dispatch) => {
//     return {
//         addMessage: (newMessageBody) => {
//             dispatch(actions.addMessageActionCreator(newMessageBody));
//         }
//     }
// }
