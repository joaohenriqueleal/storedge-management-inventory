const USERNAME_KEY = "user.username"
const EMAIL_KEY = "user.email"
const TOKEN_KEY = "user.token"

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

export function saveEmail(email: string | undefined) {
    if (!email) return
    localStorage.setItem(EMAIL_KEY, email)
}

export function loadEmail() {
    return localStorage.getItem(EMAIL_KEY)
}

export function deleteEmail() {
    localStorage.removeItem(EMAIL_KEY)
}

export function deleteToken() {
    localStorage.removeItem(TOKEN_KEY)
}

export function deleteUsername() {
    localStorage.removeItem(USERNAME_KEY)
}

export function defineCredentials(token: string, username: string, email: string) {
    saveUsername(username)
    saveEmail(email)
    saveToken(token)
}

export function deleteCredentials() {
    deleteUsername()
    deleteEmail()
    deleteToken()
}
