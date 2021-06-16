const ADD_MESSAGE = 'ADD_MESSAGE';

let initialState = {
    messages: [
        {side: '', message: 'Hi!!'},
        {side: 'me', message: 'React!'},
        {side: '', message: 'IT Kamasutra!!!'},
        {side: 'me', message: 'Yo!!!'},
    ],
    dialogs: [
        {
            id: 1,
            name: 'Vitaliy',
            avatar: 'https://i.gifer.com/origin/d6/d66620ccdb4aee4182879a2c07d393ef_w200.webp'
        },
        {id: 2, name: 'Mariia', avatar: 'https://avatarko.ru/img/avatar/18/sport_17935.jpg'},
        {id: 3, name: 'Pasha', avatar: 'https://avatarko.ru/img/avatar/8/kot_Spider-man_7318.jpg'},
        {id: 4, name: 'Kolya', avatar: 'https://avatarko.ru/img/avatar/1/sport_akvalangist.jpg'},
        {
            id: 5,
            name: 'Valera',
            avatar: 'https://i.gifer.com/origin/2d/2dcefc56ea7a27cdab4de91847572a8d_w200.webp'
        },
    ]
};

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case
        ADD_MESSAGE:
            let newMessage = {
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


export const addMessageActionCreator = (newMessageBody) => ({type: ADD_MESSAGE, newMessageBody})

export default dialogsReducer;

