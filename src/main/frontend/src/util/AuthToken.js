export const createAuthToken = (username, password) => {
    return `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`
}
export const createAccessToken = (token) => {
    return `Bearer ${token}`
}