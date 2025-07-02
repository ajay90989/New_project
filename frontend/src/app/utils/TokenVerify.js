import { jwtDecode } from "jwt-decode";


export function getTokenFromCookies() {

    const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];

    return token || null;
}


// export function getUserFromToken() {
//     const token = getTokenFromCookies();
//     if (!token) return null;

//     try {
//         const decoded = jwtDecode(token);
//         return decoded;
//     } catch (error) {

//         return null;
//     }
// }

