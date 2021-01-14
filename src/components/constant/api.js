import axios from "axios";
export const API_URL ='http://localhost:8000'

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-type": "application/json"
    }
});

export default class ApiService{
    static saveStripeInfo(data={}){
        return api.post(`${API_URL}/api/save-stripe-info/`, data)
    }

    static deleteSubscription(data={}){
        return api.post(`${API_URL}/api/delete-subscription/`, data)
    }
}

// export const setCookie = (name, value, days) => {
    //     var expires = "";
    //     if (days) {
    //         var date = new Date();
    //         date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    //         expires = "; expires=" + date.toUTCString();
    //     }
    //     document.cookie = name + "=" + (value || "") + expires + "; path=/";
    // }
    
    // export const getCookie = name => {
    //     var nameEQ = name + "=";
    //     var ca = document.cookie.split(';');
    //     for (var i = 0; i < ca.length; i++) {
    //         var c = ca[i];
    //         while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    //         if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    //     }
    //     return null;
    // }
    
    // export const eraseCookie = name => {
    //     document.cookie = name + '=; Max-Age=-99999999;';
    // }