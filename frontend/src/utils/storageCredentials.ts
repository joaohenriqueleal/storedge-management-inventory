import Globals from "@/shared/globals"


export function saveUsername(username: string | undefined) {
    if (!username) return
    localStorage.setItem(Globals.usernameItem, username)
}

export function loadUsername() {
    return localStorage.getItem(Globals.usernameItem)
}

export function saveToken(token: string | undefined) {
    if (!token) return
    localStorage.setItem(Globals.tokenItem, token)
}

export function loadToken() {
    return localStorage.getItem(Globals.tokenItem)
}

export function deleteToken() {
    localStorage.removeItem(Globals.tokenItem)
}

export function deleteUsername() {
    localStorage.removeItem(Globals.usernameItem)
}

export function defineCredentials(token: string, username: string) {
    saveUsername(username)
    saveToken(token)
}

export function deleteCredentials() {
    deleteUsername()
    deleteToken()
}
