import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";

let store = {
    _state: {
        profilePage: {
            posts: [
                {id: 0, post: 'Hi, how are you?', likesCount: 5},
                {id: 1, post: 'It`s my first post.', likesCount: 10},
            ],
            newPostText: "The sea is calling you!!!",
        },

        messagesPage: {
            messages: [
                {side: 'classes.messageright', message: 'Hi!!'},
                {side: 'classes.messageleft', message: 'React!'},
                {side: 'classes.messageright', message: 'IT Kamasutra!!!'},
                {side: 'classes.messageleft', message: 'Yo!!!'},
            ],
            newMessageText: "The sea is calling you",

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
        },
        sidebar: [
            {title: 'Profile'},
            {title: 'Message'},
            {title: 'News'},
            {title: 'Music'},
            {title: 'Settings'},
            {title: 'Friends'}

        ]
    },
    _callSubsriber() {
    },
    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubsriber = observer;
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.messagesPage = dialogsReducer(this._state.messagesPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);
        this._callSubsriber(this._state)
    }
}

window.store = store;
export default store;


