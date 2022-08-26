export function getUserId() {
    if (!window.localStorage.getItem("userInfo")) {
        return;
    } else {
        const infoUser = JSON.parse(window.localStorage.getItem("userInfo"));
        const uid = infoUser.userId;
        return uid;
    }
}

export function logout() {
    window.localStorage.removeItem("userInfo");
    window.location = "/";
}

export function userData() {
    if (!window.localStorage.getItem("userInfo")) {
        return;
    } else {
        const infoUser = JSON.parse(window.localStorage.getItem("userInfo"));
        return infoUser;
    }
}