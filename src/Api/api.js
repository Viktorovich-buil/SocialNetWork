import * as axios from "axios";


const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {'API-KEY': '0f16cc7c-366b-4498-b8d3-1797e57e936a'},
    withCredentials: true
});

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 4) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
    }
}

export const followAPI = {
    unfollowUser(userID) {
        return instance.delete(`follow/${userID}`)
    },
    followUser(userID) {
        return instance.post(`follow/${userID}`)
    }
}

export const authAPI = {
    authMe() {
        return instance.get(`auth/me`)
    },
    loginMe(email, password, rememberMe = false, captcha = 'null') {
        return instance.post(`auth/login`, {email, password, rememberMe, captcha})
    },
    logoutMe() {
        return instance.delete(`auth/login`)
    }
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`)
    }
}

export const profileAPI = {
    followedUser(userId) {
        return instance.get(`profile/` + userId)
    },
    getStatus(userId) {
        return instance.get(`profile/status/` + userId)

    },
    updateStatus(status) {
        return instance.put(`profile/status`, {status: status})
    },
    savePhoto(photoFile) {
        const formData = new FormData();
        formData.append('image', photoFile);
        return instance.put(`profile/photo`,
            formData,
            {headers: {'content-type': 'multipart/form-data'}})
    },
    saveProfile(profile) {
        return instance.put(`profile`, profile)
    }
};






