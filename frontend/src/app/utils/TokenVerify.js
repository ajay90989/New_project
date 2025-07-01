import { jwtDecode } from "jwt-decode";


function getTokenFromCookies() {

    const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];

    console.log("Token from cookies:", token);

    return token || null;
}


export function getUserFromToken() {
    const token = getTokenFromCookies();
    if (!token) return null;

    try {
        const decoded = jwtDecode(token);
        return decoded;
    } catch (error) {

        return null;
    }
}

export function token() {
    getTokenFromCookies()
}