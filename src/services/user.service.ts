import authAxios from "../config/axios/authAxios";
import {Login} from "../models/login.model";
import {Register} from "../models/register.model";

export class UserService {

    static async refreshUser (){
        const {data} = await authAxios.get('init')
        return data
    }

    static async login(values: Login){
        const {data} = await authAxios.post('auth/login', {...values})
        return data
    }

    static async register(values: Register){
        const {data} = await authAxios.post('auth/register', {...values})
        return data
    }

    static async setAutomaticOffers(itemId: number){
        const {data} = await authAxios.post('config', {item_id: itemId})
        return data
    }
    static async getAutomaticOffers(itemId: number){
        const {data} = await authAxios.post('config', {item_id: itemId})
        return data
    }
}


export default UserService