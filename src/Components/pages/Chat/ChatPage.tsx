import React, {useEffect, useRef, useState} from "react";
import {ChatMessageAPIType} from "../../../Api/chat-api";
import {useDispatch, useSelector} from "react-redux";
import {sendChatMessage, startChatMessagesListening, stopChatMessagesListening} from "../../../redux/chat-reducer";
import {AppStateType} from "../../../redux/redux-store";
import classes from './Chat.module.css'


const ChatPage: React.FC = () => {

    return <div className={classes.chat}>
        <Chat/>
    </div>
};

const Chat: React.FC = () => {

    const dispatch = useDispatch()
    const status = useSelector((state: AppStateType) => state.chat.status)

    useEffect(() => {
        dispatch(startChatMessagesListening())
        return () => {
            dispatch(stopChatMessagesListening())
        }
    }, [])

    return <div>
        {status === 'error' && <div>Error. Refresh page</div>}
        <>
            <ChatMessages/>
            <AddMessageChatForm/>
        </>
    </div>
}

const ChatMessages: React.FC = () => {
    const messages = useSelector((state: AppStateType) => state.chat.messages)
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setIsAutoScroll] = useState(true)
    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget;
        if (Math.abs(( element.scrollHeight - element.scrollTop) - element.clientHeight) < 350)
        {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
        // console.log(Math.abs(( element.scrollHeight - element.scrollTop) - element.clientHeight))
    }


    useEffect(() => {
        if (isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }, [messages])

    return <div style={{height: '600px', overflowY: 'auto'}} onScroll={scrollHandler}>
        {messages.map((m) => <ChatMessage key={m.id} message={m}/>)}
        <div ref={messagesAnchorRef}/>
    </div>
}


const ChatMessage: React.FC<{ message: ChatMessageAPIType }> = React.memo (({message}) => {
    // console.log('>>>>>>>>>>')
    return <div className={classes.messages}>
        <img src={message.photo} alt={'avatar'} width={'70px'} height={'70px'}/>
        <div className={classes.username}>
            <p>{message.userName}</p>
            </div>
        <div className={classes.textmessage}>
            <p>{message.message}</p>
        </div>
    </div>
})


const AddMessageChatForm: React.FC = () => {
    const [message, setNewMessage] = useState('')
    const dispatch = useDispatch()
    const status = useSelector((state: AppStateType) => state.chat.status)

    const sendMessage = () => {
        if (!message) {
            return;
        }
        dispatch(sendChatMessage(message))
        setNewMessage('')
    }

    return <div className={classes.addmessage}>
        <div>
            <textarea  onChange={(e) => setNewMessage(e.currentTarget.value)} value={message}/>
        </div>
        <div>
            <button className={classes.button} disabled={status !== 'ready'} onClick={sendMessage}>Send</button>
        </div>
    </div>
}

export default ChatPage;
