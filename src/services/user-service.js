import { API_URL } from '@/configs/axiosConfig.js'

import axios from 'axios'


export default class UserService {

    async login(data) {
        return await axios.post(API_URL + "login", data);
    }

    async listUsers() {
        return await axios.get(API_URL + "listUsers");
    }

    async createUser(data){
        return await axios.post(API_URL + "createUser",data)
    }

    async updateUser(user) {
        return await axios.put(API_URL + "updateUser",user);
    }

    async deleteUser(userId) {
        console.log(userId);
        return await axios.delete(API_URL + "deleteUser",{userId});
    }
}