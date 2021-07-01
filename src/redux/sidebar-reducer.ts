
type SidebarType = {
    title: string
}


let initialState = {
    sidebar: [
        {title: 'Profile'},
        {title: 'Message'},
        {title: 'News'},
        {title: 'Music'},
        {title: 'Settings'},
        {title: 'Users'}
    ] as Array<SidebarType>
};

export type InitialStateType = typeof initialState;


const sidebarReducer = (state=initialState, action :any) : InitialStateType  => {
    return state;
}

export default sidebarReducer;
