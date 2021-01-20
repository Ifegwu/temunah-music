import axios from "axios";
export const API_URL ='http://localhost:8000'
// import { readCookie } from '../../utils/client'

console.log(document.cookie.split(';'))

const config = {
    headers: {
        'Authorization': `Bearer ${document.cookie.split(';')}`,
        // "Access-Control-Allow-Origin" : true,
        // "Allow": "GET",
        "Content-type": "Application/json",
    }
};

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-type": "application/json"
    }
});



axios.get(`${API_URL}/api/password-reset`, config);

export default class ApiService{
    static passwordResetInfo(data={}){
        return api.post(`${API_URL}/api/password-reset`, data, { withCredentials: true })
    }
}

export const setCookie = (name, value, days) => {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
    
export const getCookie = name => {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
    
export const eraseCookie = name => {
    document.cookie = name + '=; Max-Age=-99999999;';
}