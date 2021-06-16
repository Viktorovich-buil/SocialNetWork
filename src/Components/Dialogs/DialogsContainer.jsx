import {
    addMessageActionCreator,
} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {withAuthRedirect} from "../../Hoc/withAuthRedirect";
import {compose} from "redux";
import {connect} from "react-redux";


let mapStateToProps = (state) => {
    return {
        dialogsPage: state.messagesPage,
        newMessageBody: state.messagesPage.newMessageText,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addMessage: (newMessageBody) => {
            dispatch(addMessageActionCreator(newMessageBody));
        }
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect)
(Dialogs);





