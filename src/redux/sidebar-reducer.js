
let initialState = {
    sidebar: [
        {title: 'Profile'},
        {title: 'Message'},
        {title: 'News'},
        {title: 'Music'},
        {title: 'Settings'},
        {title: 'Friends'}
    ]
};

const sidebarReducer = (state=initialState, action) => {
    return state;
}

export default sidebarReducer;
