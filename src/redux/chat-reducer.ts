import {stopSubmit} from "redux-form";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {chatAPI, ChatMessageAPIType, StatusType} from "../Api/chat-api";
import {Dispatch} from "redux";
import {v4} from 'uuid';

type ChatMessageType = ChatMessageAPIType & {id: string}

let initialState = {
    messages: [] as ChatMessageType[],
        status: 'panding' as StatusType
   };

export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | ReturnType <typeof stopSubmit>>



const chatReducer = (state = initialState, action: ActionsTypes) : InitialStateType => {
    switch (action.type) {
        case 'CHAT_MESSAGES_RECIEVED':
                 return {
                ...state,
                     messages: [...state.messages, ...action.payload.messages.map(m => ({...m, id: v4()}))].filter((m, index, array) => index >= array.length-100)
            }
        case 'CHAT_STATUS_CHANGED':
            return {
                ...state,
                status: action.payload.status
            }
        default:
            return state
    }
}


export const actions = {
    messagesRecieved: (messages: ChatMessageAPIType[]) => ({
        type: 'CHAT_MESSAGES_RECIEVED', payload: {messages}
    } as const),
    statusChanged: (status: StatusType) => ({
        type: 'CHAT_STATUS_CHANGED', payload: {status}
    } as const),

 }


let _newMessageHandler: ((messages:ChatMessageAPIType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if(_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesRecieved(messages))
        }
    }
        return _newMessageHandler
}


let _statusChangedHandler: (( status:StatusType) => void) | null = null
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if(_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(actions.statusChanged(status))
        }
    }
        return _statusChangedHandler
}

//THUNK
export const startChatMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe('messages-recieved', newMessageHandlerCreator(dispatch))
    chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
}

export const stopChatMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.unsubscribe('messages-recieved',  newMessageHandlerCreator(dispatch))
    chatAPI.unsubscribe('status-changed',  statusChangedHandlerCreator(dispatch))
    chatAPI.stop()
    }

export const sendChatMessage = (message: string): ThunkType => async () => {
    chatAPI.sendMessage(message)
    }


export default chatReducer
