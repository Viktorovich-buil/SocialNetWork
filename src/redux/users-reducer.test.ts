import usersReducer, {actions, InitialStateType} from "./users-reducer";


let state: InitialStateType;

beforeEach(() => {
    state = {
        users: [
             {
                id: 0, name: 'Vik', followed: false,
                 photos: {small: null, large: null}, status: 'Ok'
            },
            {
                id: 1, name: 'Vik1', followed: false,
                photos: {small: null, large: null}, status: 'Ok1'
            },
             {
                id: 2, name: 'Vik2', followed: true,
                photos: {small: null, large: null}, status: 'Ok2'
             },
             {
                 id: 3, name: 'Vik3', followed: true,
                 photos: {small: null, large: null}, status: 'Ok3'
            },
        ],
        pageSize: 5,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: [],
        filter: {
            term: '',
            friend: null as null | boolean
        }
    }
})


test('follow success', () => {

    const newState = usersReducer(state, actions.followSuccess(1))

    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy()

})

test('unfollow success', () => {

    const newState = usersReducer(state, actions.unfollowSuccess(2))

    expect(newState.users[2].followed).toBeFalsy()
    expect(newState.users[3].followed).toBeTruthy()

})
