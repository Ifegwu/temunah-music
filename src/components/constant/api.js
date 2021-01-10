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

