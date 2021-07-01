import React from "react";
import classes from './Message.module.css'

type PropsType = {
    side: string
    message: string
}


const Message: React.FC<PropsType> = (props) => {
    let style = () => (props.side === 'me') ? classes.messageright : classes.messageleft;
    return <div>
        <div className={`${style()}`}>
            <div className={classes.message}>
                {props.message}
            </div>
        </div>
    </div>
}
export default Message;


