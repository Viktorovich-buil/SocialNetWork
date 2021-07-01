import {follow, unfollow, actions} from "./users-reducer";
import {followAPI} from '../Api/users-api'
import {APIResponseType, ResultCodesEnum} from "../Api/api";
//fake api
jest.mock('../Api/users-api')
const userAPIMock = followAPI as jest.Mocked<typeof followAPI>;

const dispatchMock = jest.fn();
const getStateMock = jest.fn();

beforeEach(() => {
    dispatchMock.mockClear();
    getStateMock.mockClear();
    userAPIMock.followUser.mockClear();
    userAPIMock.unfollowUser.mockClear();
})


const result: APIResponseType = {
    resultCode: ResultCodesEnum.Success,
    messages: [],
    data: {}
}





test ('success follow thunk',async() => {
    userAPIMock.followUser.mockReturnValue(Promise.resolve(result))

    const thunk = follow(1)
    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingInProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingInProgress(false, 1))

})

test('success unfollow thunk', async () => {
    userAPIMock.unfollowUser.mockReturnValue(Promise.resolve(result))

    const thunk = unfollow(1)

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingInProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingInProgress(false, 1))
})
