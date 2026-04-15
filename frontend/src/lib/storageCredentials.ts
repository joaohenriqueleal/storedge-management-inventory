const USERNAME_KEY = "username"
const TOKEN_KEY = "token"

export function saveUsername(username: string | undefined) {
    if (!username) return
    localStorage.setItem(USERNAME_KEY, username)
}

export function loadUsername() {
    return localStorage.getItem(USERNAME_KEY)
}

export function saveToken(token: string | undefined) {
    if (!token) return
    localStorage.setItem(TOKEN_KEY, token)
}

export function loadToken() {
    return localStorage.getItem(TOKEN_KEY)
}

export function deleteToken() {
    localStorage.removeItem(TOKEN_KEY)
}

export function deleteUsername() {
    localStorage.removeItem(USERNAME_KEY)
}

export function defineCredentials(token: string, username: string) {
    saveUsername(username)
    saveToken(token)
}

export function deleteCredentials() {
    deleteUsername()
    deleteToken()
}
