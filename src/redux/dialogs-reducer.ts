import {InferActionsTypes} from "./redux-store";



type DialogsType = {
    id: number,
    name: string,
    avatar: string,
}

type MessagesType = {
    id: number,
    side: string,
    message: string,
}

let initialState = {
    messages: [
        {id: 1, side: '', message: 'Hi!!'},
        {id: 2, side: 'me', message: 'React!'},
        {id: 3, side: '', message: 'IT Kamasutra!!!'},
        {id: 4, side: 'me', message: 'Yo!!!'},
    ] as Array<MessagesType>,
    dialogs: [
        {
            id: 1,
            name: 'Vitaliy',
            avatar: 'https://avatarko.ru/img/avatar/32/prikol_oblaka_raduga_31132.jpg'
        },
        {id: 2, name: 'Mariia', avatar: 'https://avatarko.ru/img/avatar/18/sport_17935.jpg'},
        {id: 3, name: 'Pasha', avatar: 'https://avatarko.ru/img/avatar/8/kot_Spider-man_7318.jpg'},
        {id: 4, name: 'Kolya', avatar: 'https://avatarko.ru/img/avatar/8/zhivotnye_lisa_prikol_7435.jpg'},
        {
            id: 5,
            name: 'Valera',
            avatar: 'https://avatarko.ru/img/avatar/18/sport_17935.jpg'
        },
    ] as Array<DialogsType>,
    newMessageText: ' ',
};


const dialogsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case
        'ADD_MESSAGE':
            let newMessage = {
                id: state.messages.length + 1,
                side: 'classes.messageright',
                message: action.newMessageBody
            };
            return {
                ...state,
                newMessageText: ' ',
                messages: [...state.messages, newMessage]
            };
        default:
            return state;
    }
}

export const actions = {
    addMessageActionCreator: (newMessageBody: string)=> ({
        type: 'ADD_MESSAGE',
        newMessageBody
    }as const)
}


export default dialogsReducer;


export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>
