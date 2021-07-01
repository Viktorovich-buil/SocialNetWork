import {GetItemsType, instance, APIResponseType} from "./api";




export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 5, term: string = '', friend: null | boolean = null) {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}&term=${term}`+ (friend === null ? '' : `&friend=${friend}`))
            .then(res => res.data)
              }
}

export const followAPI = {
    unfollowUser(userID: number) {
        return instance.delete(`follow/${userID}`).then(res => res.data) as Promise<APIResponseType>
    },
    followUser(userID: number) {
        return instance.post<APIResponseType>(`follow/${userID}`).then(res => res.data)
    }
}
